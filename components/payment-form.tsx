"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormProps {
  amount: number
  currency?: string
  onSuccess?: (paymentIntent: any) => void
  onError?: (error: any) => void
  metadata?: Record<string, any>
  redirectUrl?: string
}

export function PaymentForm({
  amount,
  currency = "usd",
  onSuccess,
  onError,
  metadata = {},
  redirectUrl,
}: PaymentFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })
  const [paypalDetails, setPaypalDetails] = useState({
    paypalEmail: "",
  })

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaypalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaypalDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")
    
    // Format with spaces every 4 digits
    let formatted = ""
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.slice(i, i + 4) + " "
    }
    
    return formatted.trim()
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")
    
    // Format as MM/YY
    if (digits.length > 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2, 4)
    }
    
    return digits
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardDetails((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setCardDetails((prev) => ({
      ...prev,
      expiryDate: formattedValue,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Prepare payment data based on selected method
      const paymentData = {
        amount,
        currency,
        paymentMethod,
        metadata,
      }

      if (paymentMethod === "card") {
        Object.assign(paymentData, { cardDetails })
      } else {
        Object.assign(paymentData, { paypalDetails })
      }

      // Call the payment API
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Payment processing failed")
      }

      if (data.success) {
        toast({
          title: "Payment Successful",
          description: `Your payment of ${formatCurrency(amount, currency)} has been processed successfully.`,
          variant: "default",
        })

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(data.paymentIntent)
        }

        // Redirect if URL provided
        if (redirectUrl) {
          router.push(redirectUrl)
        }
      } else {
        toast({
          title: "Payment Failed",
          description: "Your payment could not be processed. Please try again.",
          variant: "destructive",
        })

        if (onError) {
          onError(new Error("Payment failed"))
        }
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })

      if (onError) {
        onError(error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(value)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Complete your payment of {formatCurrency(amount, currency)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as "card" | "paypal")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="pl-10"
                    value={cardDetails.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19} // 16 digits + 3 spaces
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChange={handleCardInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleExpiryDateChange}
                    maxLength={5} // MM/YY format
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    maxLength={4}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay ${formatCurrency(amount, currency)}`}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="paypal">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="paypalEmail">PayPal Email</Label>
                <Input
                  id="paypalEmail"
                  name="paypalEmail"
                  type="email"
                  placeholder="your-email@example.com"
                  value={paypalDetails.paypalEmail}
                  onChange={handlePaypalInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay with PayPal`}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4" />
          <span>Your payment information is secure</span>
        </div>
        <div className="text-xs text-muted-foreground">
          By completing this payment, you agree to our terms and conditions.
        </div>
      </CardFooter>
    </Card>
  )
}