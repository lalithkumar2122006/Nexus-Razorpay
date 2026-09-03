import type { Product, SafetyPolicy, AuditLog, ActorType, PolicyResult } from '../types';

export interface AIReasoningStep {
  step: string;
  type: 'INTENT' | 'CATALOG_MATCH' | 'UPSELL_EVALUATION' | 'SAFETY_GATE' | 'RAZORPAY_PAYLOAD';
  content: string;
  timestamp: string;
}

export interface IntentEvaluationResult {
  matchedProducts: Product[];
  recommendedBundle?: {
    title: string;
    items: Product[];
    originalPrice: number;
    discountedPrice: number;
    discountPct: number;
    aiRationale: string;
  };
  reasoningSteps: AIReasoningStep[];
}

export const evaluateAgentIntent = (
  userPrompt: string,
  catalog: Product[],
  policy: SafetyPolicy
): IntentEvaluationResult => {
  const now = new Date().toLocaleTimeString();
  const lower = userPrompt.toLowerCase();
  const steps: AIReasoningStep[] = [];

  steps.push({
    step: '1. Intent & Vector Parsing',
    type: 'INTENT',
    content: `Analyzed prompt query "${userPrompt}". Extracted parameters: category query, price sensitivity, and bundle eligibility.`,
    timestamp: now
  });

  // Filter matched products based on keyword tags
  let matched = catalog.filter(p => 
    p.tags.some(tag => lower.includes(tag)) ||
    lower.includes(p.title.toLowerCase()) ||
    lower.includes(p.category.toLowerCase())
  );

  if (matched.length === 0) {
    // Default to top 2 products
    matched = catalog.slice(0, 2);
  }

  steps.push({
    step: '2. Agentic Catalog Match (UAP/ACP Schema)',
    type: 'CATALOG_MATCH',
    content: `Discovered ${matched.length} catalog items matching buyer vector embeddings. Top candidate: ${matched[0].title} (Base: ₹${matched[0].basePrice}).`,
    timestamp: now
  });

  // Check if top candidate has upsell candidate
  const mainProduct = matched[0];
  let recommendedBundle;

  if (mainProduct.upsellSuggestion) {
    const companion = catalog.find(p => p.id === 'prod_desk_mat_04') || catalog[1];
    const origTotal = mainProduct.basePrice + companion.basePrice;
    const discPct = mainProduct.upsellSuggestion.discountPct;
    const discTotal = Math.round(origTotal * (1 - discPct / 100));

    recommendedBundle = {
      title: mainProduct.upsellSuggestion.bundleTitle,
      items: [mainProduct, companion],
      originalPrice: origTotal,
      discountedPrice: discTotal,
      discountPct: discPct,
      aiRationale: mainProduct.upsellSuggestion.explanation
    };

    steps.push({
      step: '3. Autonomous Merchant Upsell Engine',
      type: 'UPSELL_EVALUATION',
      content: `Merchant AI Growth Rule triggered: Proposed bundle "${recommendedBundle.title}" at 15% discount (₹${discTotal} vs ₹${origTotal}). AI Rationale: ${recommendedBundle.aiRationale}`,
      timestamp: now
    });
  }

  // Safety Policy Pre-flight Check
  const estimatedAmount = recommendedBundle ? recommendedBundle.discountedPrice : mainProduct.basePrice;
  const isWithinTxLimit = estimatedAmount <= policy.maxTransactionLimit;
  const isWithinDaily = (policy.currentDailySpent + estimatedAmount) <= policy.maxDailyBudget;

  steps.push({
    step: '4. Bounded Money Safety Gate Inspection',
    type: 'SAFETY_GATE',
    content: `Policy Evaluation: Amount ₹${estimatedAmount} | Max Single Tx Cap: ₹${policy.maxTransactionLimit} [${isWithinTxLimit ? 'PASS' : 'FAIL'}] | Daily Spent: ₹${policy.currentDailySpent}/₹${policy.maxDailyBudget} [${isWithinDaily ? 'PASS' : 'FAIL'}]. Result: ${isWithinTxLimit && isWithinDaily ? 'Gated Safe Pass' : 'Gate Violation Alert'}.`,
    timestamp: now
  });

  return {
    matchedProducts: matched,
    recommendedBundle,
    reasoningSteps: steps
  };
};

export const checkSafetyPolicyGates = (
  amount: number,
  policy: SafetyPolicy
): {
  passed: boolean;
  result: PolicyResult;
  reason: string;
  explainability: string;
} => {
  if (policy.activeGuardrails.enforceTxLimit && amount > policy.maxTransactionLimit) {
    return {
      passed: false,
      result: 'GATE_BLOCKED',
      reason: `Transaction amount ₹${amount.toLocaleString()} exceeds merchant safety cap of ₹${policy.maxTransactionLimit.toLocaleString()}.`,
      explainability: `BOUNDED LIMIT ENGAGED: To protect merchant & buyer wallets, automated agent spending is capped at ₹${policy.maxTransactionLimit.toLocaleString()} per transaction.`
    };
  }

  if (policy.activeGuardrails.enforceDailyCap && (policy.currentDailySpent + amount) > policy.maxDailyBudget) {
    return {
      passed: false,
      result: 'GATE_BLOCKED',
      reason: `Daily budget cap of ₹${policy.maxDailyBudget.toLocaleString()} would be exceeded (Current Spent: ₹${policy.currentDailySpent.toLocaleString()}, Attempted: ₹${amount.toLocaleString()}).`,
      explainability: `DAILY BUDGET EXCEEDED: Merchant set a daily maximum AI spending ceiling of ₹${policy.maxDailyBudget.toLocaleString()}.`
    };
  }

  if (amount > policy.requireHumanApprovalAbove) {
    return {
      passed: true,
      result: 'WARN_HUMAN_APPROVAL',
      reason: `Order value ₹${amount.toLocaleString()} exceeds human authorization threshold of ₹${policy.requireHumanApprovalAbove.toLocaleString()}.`,
      explainability: `HUMAN-IN-THE-LOOP REQUIRED: High-value order requires merchant signature approval.`
    };
  }

  return {
    passed: true,
    result: 'PASS',
    reason: 'Transaction is fully explainable, bounded, and gated.',
    explainability: `Check Passed: Amount ₹${amount.toLocaleString()} <= Single Tx Limit (₹${policy.maxTransactionLimit.toLocaleString()}) and Daily Cap (₹${policy.maxDailyBudget.toLocaleString()}).`
  };
};

export const createAuditEntry = ({
  actor,
  actionType,
  details,
  moneyAmount,
  policyResult,
  explainabilityText,
  razorpayOrderData,
  rawPayload
}: {
  actor: ActorType;
  actionType: AuditLog['actionType'];
  details: string;
  moneyAmount: number;
  policyResult: PolicyResult;
  explainabilityText: string;
  razorpayOrderData?: AuditLog['razorpayOrderData'];
  rawPayload?: Record<string, any>;
}): AuditLog => {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  return {
    id: `log_${Math.random().toString(36).substring(2, 9)}`,
    timestamp,
    actor,
    actionType,
    details,
    moneyAmount,
    policyResult,
    explainabilityText,
    razorpayOrderData,
    rawPayload
  };
};
