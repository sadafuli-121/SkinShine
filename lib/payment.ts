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

export interface UPIPayment {
  vpa: string; // Virtual Payment Address
  amount: number;
  note: string;
  merchantCode: string;
  transactionRef: string;
}

// Simulated payment gateway service
class PaymentService {
  private generateOrderId(): string {
    return 'order_' + Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private generatePaymentId(): string {
    return 'pay_' + Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private generateSignature(): string {
    return 'sig_' + Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async createOrder(paymentData: PaymentData): Promise<{ orderId: string; amount: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const orderId = this.generateOrderId();
    
    // In real implementation, this would call Razorpay API
    return {
      orderId,
      amount: paymentData.amount * 100 // Convert to paise
    };
  }

  async processPayment(orderData: {
    orderId: string;
    amount: number;
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
    paymentDetails?: any;
  }): Promise<PaymentResult> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      return {
        success: true,
        paymentId: this.generatePaymentId(),
        orderId: orderData.orderId,
        signature: this.generateSignature()
      };
    } else {
      return {
        success: false,
        error: 'Payment failed. Please try again or use a different payment method.'
      };
    }
  }

  async generateUPILink(upiData: UPIPayment): Promise<string> {
    // Generate UPI payment link
    const params = new URLSearchParams({
      pa: upiData.vpa,
      pn: 'SkinShine Healthcare',
      am: upiData.amount.toString(),
      cu: 'INR',
      tn: upiData.note,
      mc: upiData.merchantCode,
      tr: upiData.transactionRef
    });

    return `upi://pay?${params.toString()}`;
  }

  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    // Simulate payment verification
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, verify with Razorpay
    return paymentId && orderId && signature ? true : false;
  }

  async refundPayment(paymentId: string, amount?: number): Promise<PaymentResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      paymentId: 'rfnd_' + Date.now().toString()
    };
  }

  // UPI payment methods popular in India
  getUPIApps(): Array<{ name: string; package: string; icon: string }> {
    return [
      { name: 'Google Pay', package: 'com.google.android.apps.nbu.paisa.user', icon: '💳' },
      { name: 'PhonePe', package: 'com.phonepe.app', icon: '📱' },
      { name: 'Paytm', package: 'net.one97.paytm', icon: '💰' },
      { name: 'BHIM', package: 'in.org.npci.upiapp', icon: '🏦' },
      { name: 'Amazon Pay', package: 'in.amazon.mShop.android.shopping', icon: '🛒' }
    ];
  }
}

export const paymentService = new PaymentService();