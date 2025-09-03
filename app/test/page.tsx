'use client'

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function TestPage() {
  const { toast } = useToast()
  
  const showToast = () => {
    toast({
      title: "Test Toast",
      description: "This is a test notification",
      variant: "default"
    })
  }

  const testPayPalOrder = async () => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name: "Test Product",
              price: 29.99,
              quantity: 1
            }
          ]
        }),
      });

      const data = await response.json();
      console.log('PayPal Order Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8">
      <Button onClick={showToast}>Test Toast Notification</Button>
      <button 
        onClick={testPayPalOrder}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test PayPal Order
      </button>
    </div>
  )
}