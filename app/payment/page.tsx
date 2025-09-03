'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function PaymentContent() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const status = searchParams.get('status');
  const orderId = searchParams.get('orderId');
  const message = searchParams.get('message');

  useEffect(() => {
    if (status === 'success') {
      toast({
        title: 'Payment Successful',
        description: `Your payment has been processed successfully. Order ID: ${orderId}`,
      });
    } else if (status === 'error') {
      toast({
        title: 'Payment Failed',
        description: message || 'There was an error processing your payment.',
        variant: 'destructive',
      });
    } else if (status === 'cancelled') {
      toast({
        title: 'Payment Cancelled',
        description: 'You have cancelled the payment process.',
        variant: 'destructive',
      });
    }
  }, [status, orderId, message, toast]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const items = [
        {
          name: 'Product 1',
          price: 29.99,
          quantity: 1
        }
      ];

      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const order = await response.json();

      if (order.id) {
        // Find the approval URL in the links array
        const approvalLink = order.links?.find((link: any) => link.rel === 'approve' || link.rel === 'approval_url');
        
        if (approvalLink && approvalLink.href) {
          // Redirect to PayPal for payment approval
          window.location.href = approvalLink.href;
        } else {
          // If we can't find the approval link by rel, try to find it by method and action
          const alternativeLink = order.links?.find((link: any) => 
            link.method === 'REDIRECT' && 
            (link.href?.includes('checkout.paypal.com') || link.href?.includes('www.paypal.com'))
          );
          
          if (alternativeLink && alternativeLink.href) {
            window.location.href = alternativeLink.href;
          } else {
            console.error('PayPal response:', order);
            throw new Error('Approval link not found in PayPal response');
          }
        }
      } else {
        console.error('PayPal error response:', order);
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create PayPal order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        {status ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                {status === 'cancelled' && <AlertCircle className="h-5 w-5 text-amber-500" />}
                Payment {status === 'success' ? 'Successful' : status === 'cancelled' ? 'Cancelled' : 'Failed'}
              </CardTitle>
              <CardDescription>
                {status === 'success' && 'Your payment has been processed successfully.'}
                {status === 'error' && (message || 'There was an error processing your payment.')}
                {status === 'cancelled' && 'You have cancelled the payment process.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === 'success' && (
                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                  <p><strong>Order ID:</strong> {orderId}</p>
                  <p className="mt-2">Thank you for your purchase! We'll process your order shortly.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => window.location.href = '/payment'} className="w-full">
                {status === 'success' ? 'Make Another Payment' : 'Try Again'}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Payment</CardTitle>
              <CardDescription>
                Pay securely using PayPal. You'll be redirected to PayPal to complete your payment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                <p><strong>Product:</strong> Product 1</p>
                <p><strong>Price:</strong> $29.99</p>
                <p><strong>Quantity:</strong> 1</p>
                <p className="mt-2 font-bold">Total: $29.99</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay with PayPal'
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function PaymentLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Loading Payment...</CardTitle>
            <CardDescription>Please wait while we prepare your payment</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}