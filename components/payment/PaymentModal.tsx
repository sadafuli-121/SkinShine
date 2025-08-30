'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { paymentService, PaymentData } from '@/lib/payment';
import { toast } from 'sonner';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Wallet,
  Shield,
  CheckCircle,
  Loader2,
  IndianRupee,
  QrCode,
  Copy
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: PaymentData;
  onSuccess: (paymentResult: any) => void;
}

export function PaymentModal({ isOpen, onClose, paymentData, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'upi' as const,
      name: 'UPI',
      description: 'Pay using any UPI app',
      icon: Smartphone,
      popular: true
    },
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
      popular: false
    },
    {
      id: 'netbanking' as const,
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: Building,
      popular: false
    },
    {
      id: 'wallet' as const,
      name: 'Digital Wallet',
      description: 'Paytm, Amazon Pay, etc.',
      icon: Wallet,
      popular: false
    }
  ];

  const upiApps = paymentService.getUPIApps();

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep('processing');

    try {
      // Create order
      const order = await paymentService.createOrder(paymentData);
      
      // Process payment
      const result = await paymentService.processPayment({
        orderId: order.orderId,
        amount: order.amount,
        paymentMethod,
        paymentDetails: paymentMethod === 'upi' ? { upiId } : cardDetails
      });

      if (result.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess(result);
          onClose();
        }, 2000);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
      setStep('method');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateUPILink = async () => {
    const upiLink = await paymentService.generateUPILink({
      vpa: 'skinshine@paytm',
      amount: paymentData.amount,
      note: paymentData.description,
      merchantCode: 'SKINSHINE',
      transactionRef: `TXN${Date.now()}`
    });
    
    // Open UPI app
    window.open(upiLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Secure payment for your consultation
          </DialogDescription>
        </DialogHeader>

        {step === 'method' && (
          <div className="space-y-6">
            {/* Amount Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <div className="flex items-center space-x-1 text-2xl font-bold">
                    <IndianRupee className="w-6 h-6" />
                    <span>{paymentData.amount}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{paymentData.description}</p>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div>
              <Label className="text-base font-medium mb-4 block">Choose Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                {method.name}
                              </Label>
                              {method.popular && (
                                <Badge variant="secondary" className="text-xs">Popular</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={() => setStep('details')} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-6">
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Pay with UPI</h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {upiApps.map((app) => (
                    <Button
                      key={app.package}
                      variant="outline"
                      onClick={generateUPILink}
                      className="h-auto p-3 flex flex-col items-center space-y-1"
                    >
                      <span className="text-2xl">{app.icon}</span>
                      <span className="text-xs">{app.name}</span>
                    </Button>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>Or enter your UPI ID manually</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@paytm"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    placeholder="Name on card"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep('method')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === 'upi' && !upiId) || (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                Pay ₹{paymentData.amount}
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your payment securely...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Your appointment has been confirmed. You'll receive a confirmation email shortly.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}