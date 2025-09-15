import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, orderId, signature } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const verified = expectedSignature === signature;

    if (verified) {
      // Update appointment payment status in database
      // await appointmentService.updatePaymentStatus(orderId, 'completed', paymentId);
    }

    return NextResponse.json({ verified });
  } catch (error: any) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}