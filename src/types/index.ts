export interface Product {
  id: string;
  title: string;
  category: 'Hardware' | 'SaaS APIs' | 'Agentic Compute' | 'Productivity';
  basePrice: number; // in INR ₹
  dynamicPrice: number; // calculated by AI Upsell Engine
  stock: number;
  tags: string[];
  description: string;
  image: string;
  upsellSuggestion?: {
    bundleId: string;
    bundleTitle: string;
    discountPct: number;
    explanation: string;
  };
  acpSchema: {
    sku: string;
    currency: string;
    uapCompliant: boolean;
    x402HeaderSupported: boolean;
    agentCanNegotiate: boolean;
    maxNegotiableDiscountPct: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  appliedDiscountPct: number;
  finalUnitPrice: number;
  explainableReason: string;
}

export type ActorType = 'AI Buyer Agent' | 'Merchant Growth Engine' | 'Safety Policy Gate' | 'Razorpay API Gateway';

export type PolicyResult = 'PASS' | 'GATE_BLOCKED' | 'WARN_HUMAN_APPROVAL';

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: ActorType;
  actionType: 
    | 'BUYER_INTENT_PARSED'
    | 'UPSELL_RECOMMENDED'
    | 'DYNAMIC_PRICE_CALCULATED'
    | 'POLICY_GATE_EVALUATED'
    | 'RAZORPAY_ORDER_CREATED'
    | 'RAZORPAY_PAYMENT_SUCCESS'
    | 'BOUNDED_LIMIT_BLOCKED'
    | 'RAZORPAY_PAYMENT_FAILED'
    | 'RECOVERY_LINK_GENERATED';
  details: string;
  moneyAmount: number;
  policyResult: PolicyResult;
  explainabilityText: string;
  razorpayOrderData?: {
    orderId: string;
    paymentId?: string;
    signature?: string;
    currency: string;
    status: string;
    receipt: string;
  };
  rawPayload?: Record<string, any>;
}

export interface SafetyPolicy {
  maxTransactionLimit: number; // e.g. 5000 INR
  maxDailyBudget: number; // e.g. 20000 INR
  currentDailySpent: number; // e.g. 8400 INR
  maxDiscountAllowed: number; // e.g. 25%
  requireHumanApprovalAbove: number; // e.g. 8000 INR
  velocityLimitPerMin: number; // e.g. 3 transactions/min
  activeGuardrails: {
    enforceTxLimit: boolean;
    enforceDailyCap: boolean;
    enforceDiscountCap: boolean;
    autoCartRecoveryLink: boolean;
  };
}

export interface Campaign {
  id: string;
  title: string;
  triggerType: 'Cross-Sell Bundle' | 'Abandoned Cart Recovery' | 'VIP AI Buyer Discount' | 'Volume Pricing Tier';
  targetSegment: string;
  discountPct: number;
  revenueGenerated: number;
  conversions: number;
  active: boolean;
  aiExplanation: string;
}

export interface AgentProtocolCatalog {
  protocolVersion: string; // 'ACP/v1.2 (Agentic Commerce Protocol)'
  uapVersion: string; // 'NPCI UAP v0.9'
  x402PaymentSpec: string; // 'HTTP 402 Payment Required headers'
  merchantId: string;
  merchantName: string;
  razorpayMode: 'Test Mode (Active)' | 'Live';
  supportedCurrencies: string[];
  catalogEndpoint: string;
  capabilities: string[];
}
