// Production-ready payment service with Razorpay integration

export interface PaymentData {
  amount: number;
  currency: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

class PaymentService {
  private razorpayKey: string;
  private razorpaySecret: string;

  constructor() {
    this.razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
    this.razorpaySecret = process.env.RAZORPAY_KEY_SECRET || '';
  }

  async createOrder(paymentData: PaymentData): Promise<{ orderId: string; amount: number }> {
    try {
      // In production, call your backend API
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment order creation failed:', error);
      throw error;
    }
  }

  async initializeRazorpay(orderData: any): Promise<PaymentResult> {
    return new Promise((resolve) => {
      // Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: this.razorpayKey,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'SkinShine Healthcare',
          description: orderData.description,
          order_id: orderData.orderId,
          handler: (response: any) => {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
          },
          modal: {
            ondismiss: () => {
              resolve({
                success: false,
                error: 'Payment cancelled by user'
              });
            }
          },
          theme: {
            color: '#3b82f6'
          },
          prefill: {
            name: orderData.customerName,
            email: orderData.customerEmail,
            contact: orderData.customerPhone
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.head.appendChild(script);
    });
  }

  async verifyPayment(paymentData: {
    paymentId: string;
    orderId: string;
    signature: string;
  }): Promise<boolean> {
    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      return result.verified;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  // UPI payment methods
  generateUPILink(data: {
    vpa: string;
    amount: number;
    note: string;
    merchantCode: string;
    transactionRef: string;
  }): string {
    const params = new URLSearchParams({
      pa: data.vpa,
      pn: 'SkinShine Healthcare',
      am: data.amount.toString(),
      cu: 'INR',
      tn: data.note,
      mc: data.merchantCode,
      tr: data.transactionRef
    });

    return `upi://pay?${params.toString()}`;
  }
}

export const paymentService = new PaymentService();