import type { Product, SafetyPolicy, Campaign, AgentProtocolCatalog, AuditLog } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_keyboard_01',
    title: 'Nexus Apex Mechanical Keyboard',
    category: 'Hardware',
    basePrice: 3499,
    dynamicPrice: 3499,
    stock: 45,
    tags: ['ergonomic', 'wireless', 'rgb', 'mechanical', 'keyboard', 'developer'],
    description: 'Ultra-low latency mechanical keyboard engineered for high-velocity software engineers & AI operators.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    upsellSuggestion: {
      bundleId: 'bundle_desk_combo',
      bundleTitle: 'Pro Developer Workstation Kit (Keyboard + Ergonomic Wrist Rest + Desk Mat)',
      discountPct: 15,
      explanation: 'Adding Wrist Rest + Desk Mat increases merchant cart margin by 22% while saving buyer 15%.'
    },
    acpSchema: {
      sku: 'NXS-HW-KB-01',
      currency: 'INR',
      uapCompliant: true,
      x402HeaderSupported: true,
      agentCanNegotiate: true,
      maxNegotiableDiscountPct: 15
    }
  },
  {
    id: 'prod_mouse_02',
    title: 'Precision AI Ergonomic Trackball',
    category: 'Hardware',
    basePrice: 1899,
    dynamicPrice: 1899,
    stock: 28,
    tags: ['mouse', 'ergonomic', 'bluetooth', 'trackball', 'accessories'],
    description: 'Precision motion optical sensor with programmable AI macro keys.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    upsellSuggestion: {
      bundleId: 'bundle_wrist_pro',
      bundleTitle: 'Ergo Power Pair (+ Magnetic Wrist Dock)',
      discountPct: 12,
      explanation: 'Cross-sell suggestion based on buyer context match for workspace comfort.'
    },
    acpSchema: {
      sku: 'NXS-HW-MS-02',
      currency: 'INR',
      uapCompliant: true,
      x402HeaderSupported: true,
      agentCanNegotiate: true,
      maxNegotiableDiscountPct: 12
    }
  },
  {
    id: 'prod_agent_api_03',
    title: 'Agentic Intelligence API 100k Tokens',
    category: 'SaaS APIs',
    basePrice: 2499,
    dynamicPrice: 2499,
    stock: 9999,
    tags: ['api', 'llm', 'tokens', 'agentic', 'saas', 'credits'],
    description: 'Instant API credits for autonomous agent routing, function calling, and structured JSON parsing.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    upsellSuggestion: {
      bundleId: 'bundle_api_enterprise',
      bundleTitle: 'Agent API Mega Pack (500k Tokens + Priority SLA)',
      discountPct: 20,
      explanation: 'Bulk compute tier pricing unlocks higher lifetime value (LTV).'
    },
    acpSchema: {
      sku: 'NXS-SAAS-API-100K',
      currency: 'INR',
      uapCompliant: true,
      x402HeaderSupported: true,
      agentCanNegotiate: true,
      maxNegotiableDiscountPct: 20
    }
  },
  {
    id: 'prod_desk_mat_04',
    title: 'Microfiber Stealth Desk Mat (XL)',
    category: 'Productivity',
    basePrice: 899,
    dynamicPrice: 899,
    stock: 120,
    tags: ['desk mat', 'accessories', 'leather', 'workspace', 'setup'],
    description: 'Water-repellent anti-fray stitched microfiber workspace desk pad.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    acpSchema: {
      sku: 'NXS-ACC-MAT-04',
      currency: 'INR',
      uapCompliant: true,
      x402HeaderSupported: false,
      agentCanNegotiate: false,
      maxNegotiableDiscountPct: 5
    }
  },
  {
    id: 'prod_compute_node_05',
    title: 'Dedicated AI Agent Edge Node (1-Mo)',
    category: 'Agentic Compute',
    basePrice: 12500,
    dynamicPrice: 12500,
    stock: 10,
    tags: ['cloud', 'gpu', 'server', 'compute', 'edge', 'agent node'],
    description: 'Isolated high-memory hardware runtime for running background agent loops 24/7.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    upsellSuggestion: {
      bundleId: 'bundle_edge_quarterly',
      bundleTitle: '3-Month Reserved Node Instance',
      discountPct: 25,
      explanation: 'Exceeds standard agent limit; requires merchant safety authorization approval.'
    },
    acpSchema: {
      sku: 'NXS-COMP-NODE-05',
      currency: 'INR',
      uapCompliant: true,
      x402HeaderSupported: true,
      agentCanNegotiate: true,
      maxNegotiableDiscountPct: 25
    }
  }
];

export const INITIAL_SAFETY_POLICY: SafetyPolicy = {
  maxTransactionLimit: 5000, // max ₹5,000 per auto-transaction
  maxDailyBudget: 20000,     // max ₹20,000 daily AI spending cap
  currentDailySpent: 6400,   // already spent today
  maxDiscountAllowed: 25,    // max 25% AI discount cap
  requireHumanApprovalAbove: 8000,
  velocityLimitPerMin: 3,
  activeGuardrails: {
    enforceTxLimit: true,
    enforceDailyCap: true,
    enforceDiscountCap: true,
    autoCartRecoveryLink: true,
  }
};

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_01',
    title: 'Productivity Workstation Upsell',
    triggerType: 'Cross-Sell Bundle',
    targetSegment: 'Hardware Buyers looking for Ergonomic gear',
    discountPct: 15,
    revenueGenerated: 34800,
    conversions: 14,
    active: true,
    aiExplanation: 'Pairs Apex Mechanical Keyboard with Desk Mat to bump Average Order Value (AOV) by ₹1,200.'
  },
  {
    id: 'camp_02',
    title: 'Agent Token Volume Escalation',
    triggerType: 'Volume Pricing Tier',
    targetSegment: 'AI Buyer Agents purchasing >50k API tokens',
    discountPct: 20,
    revenueGenerated: 24900,
    conversions: 8,
    active: true,
    aiExplanation: 'Dynamic pricing rule automatically offers 20% discount on 100k API packs to maximize compute retention.'
  },
  {
    id: 'camp_03',
    title: 'Abandoned Cart Recovery (UAP Agent Link)',
    triggerType: 'Abandoned Cart Recovery',
    targetSegment: 'Unfinished AI Buyer Agent checkouts',
    discountPct: 10,
    revenueGenerated: 12400,
    conversions: 6,
    active: true,
    aiExplanation: 'Dispatches signed Razorpay test payment links directly to agent endpoints upon dropoff.'
  }
];

export const INITIAL_AGENT_PROTOCOL: AgentProtocolCatalog = {
  protocolVersion: 'ACP/v1.2 (Agentic Commerce Protocol)',
  uapVersion: 'NPCI Universal Agent Protocol v0.9',
  x402PaymentSpec: 'x402-Razorpay-Test-v1',
  merchantId: 'merch_nexus_rzp_9901',
  merchantName: 'Nexus Tech & Agentic Store',
  razorpayMode: 'Test Mode (Active)',
  supportedCurrencies: ['INR'],
  catalogEndpoint: 'https://nexus.store/.well-known/agentic-commerce.json',
  capabilities: [
    'catalog.discover',
    'catalog.query_vector',
    'pricing.negotiate_bundle',
    'payment.create_razorpay_order',
    'payment.x402_header_verify'
  ]
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_901',
    timestamp: '2026-08-27 13:42:10',
    actor: 'AI Buyer Agent',
    actionType: 'BUYER_INTENT_PARSED',
    details: 'Parsed buyer prompt: "Need mechanical keyboard for coding workstation under ₹4,000"',
    moneyAmount: 3499,
    policyResult: 'PASS',
    explainabilityText: 'Intent query contained keyword "keyboard". Product Apex Mechanical Keyboard selected (Base: ₹3,499).'
  },
  {
    id: 'log_902',
    timestamp: '2026-08-27 13:42:12',
    actor: 'Merchant Growth Engine',
    actionType: 'UPSELL_RECOMMENDED',
    details: 'Recommended dynamic cross-sell bundle: Pro Developer Workstation Kit (15% OFF)',
    moneyAmount: 3738,
    policyResult: 'PASS',
    explainabilityText: 'Merchant AI Growth engine identified complementary match (Desk Mat). Applied ₹660 discount within 25% policy boundary.'
  },
  {
    id: 'log_903',
    timestamp: '2026-08-27 13:42:15',
    actor: 'Safety Policy Gate',
    actionType: 'POLICY_GATE_EVALUATED',
    details: 'Evaluated order value ₹3,738 against Max Transaction Cap ₹5,000 & Daily Cap ₹20,000.',
    moneyAmount: 3738,
    policyResult: 'PASS',
    explainabilityText: 'Check Passed: ₹3,738 <= ₹5,000 transaction limit. Daily spent after order: ₹10,138 <= ₹20,000 ceiling.'
  },
  {
    id: 'log_904',
    timestamp: '2026-08-27 13:42:18',
    actor: 'Razorpay API Gateway',
    actionType: 'RAZORPAY_ORDER_CREATED',
    details: 'Razorpay Test Order created successfully. Order ID: order_Nxs9921a8x9',
    moneyAmount: 3738,
    policyResult: 'PASS',
    explainabilityText: 'Razorpay API endpoint /v1/orders responded with status "created", receipt "rcpt_nexus_904".',
    razorpayOrderData: {
      orderId: 'order_Nxs9921a8x9',
      paymentId: 'pay_NxsTest8812',
      currency: 'INR',
      status: 'paid',
      receipt: 'rcpt_nexus_904'
    }
  },
  {
    id: 'log_905',
    timestamp: '2026-08-27 13:45:00',
    actor: 'Safety Policy Gate',
    actionType: 'BOUNDED_LIMIT_BLOCKED',
    details: 'BLOCKED: External AI Buyer Agent requested purchase of Dedicated AI Compute Node at ₹12,500.',
    moneyAmount: 12500,
    policyResult: 'GATE_BLOCKED',
    explainabilityText: 'Safety Violation: Order amount ₹12,500 exceeds max single transaction cap of ₹5,000. Gate engaged to prevent unauthorized AI spending breach.'
  }
];
