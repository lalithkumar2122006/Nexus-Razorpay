declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  created_at: number;
}

export interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const DEFAULT_RAZORPAY_TEST_KEY = 'rzp_test_NEXUS_DEMO_2026';

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = (
  amountInINR: number,
  receiptPrefix: string = 'rcpt_nxs'
): RazorpayOrderResponse => {
  const randomSuffix = Math.random().toString(36).substring(2, 11).toUpperCase();
  const orderId = `order_${randomSuffix}`;
  const amountInPaisa = Math.round(amountInINR * 100);

  return {
    id: orderId,
    entity: 'order',
    amount: amountInPaisa,
    amount_paid: 0,
    amount_due: amountInPaisa,
    currency: 'INR',
    receipt: `${receiptPrefix}_${Date.now()}`,
    status: 'created',
    attempts: 0,
    created_at: Math.floor(Date.now() / 1000)
  };
};

export const initiateRazorpayPayment = async ({
  order,
  amountInINR,
  description,
  customerName = 'AI Buyer Agent / Merchant User',
  customerEmail = 'agent@nexus-commerce.ai',
  customerPhone = '9999999999',
  customApiKey,
  onSuccess,
  onFailure,
  onDismiss
}: {
  order: RazorpayOrderResponse;
  amountInINR: number;
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customApiKey?: string;
  onSuccess: (result: RazorpayPaymentResult) => void;
  onFailure: (error: { code: string; description: string; source: string; step: string; reason: string }) => void;
  onDismiss?: () => void;
}) => {
  const isLoaded = await loadRazorpayScript();
  const apiKey = customApiKey?.trim() || DEFAULT_RAZORPAY_TEST_KEY;

  if (isLoaded && window.Razorpay) {
    try {
      const options = {
        key: apiKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Nexus Agentic Commerce Store',
        description: description,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        order_id: order.id,
        handler: function (response: any) {
          onSuccess({
            razorpay_payment_id: response.razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 11)}`,
            razorpay_order_id: response.razorpay_order_id || order.id,
            razorpay_signature: response.razorpay_signature || `sig_${Math.random().toString(36).substring(2, 20)}`
          });
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone
        },
        notes: {
          agent_protocol: 'UAP/ACP v1.2',
          amount_inr: amountInINR,
          explainable_bounded_gate: 'VERIFIED_PASS'
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function () {
            if (onDismiss) onDismiss();
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response: any) {
        onFailure({
          code: response.error?.code || 'BAD_REQUEST_ERROR',
          description: response.error?.description || 'Payment process failed in test mode.',
          source: response.error?.source || 'customer',
          step: response.error?.step || 'payment_authorization',
          reason: response.error?.reason || 'payment_failed'
        });
      });
      rzpInstance.open();
      return true;
    } catch (err) {
      console.warn('Razorpay SDK threw error, fallback to simulation mode', err);
    }
  }

  // Fallback direct simulator trigger if SDK unavailable
  return false;
};
