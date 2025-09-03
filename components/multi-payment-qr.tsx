"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type PaymentMethod = "paypal" | "googlepay" | "phonepe" | "paytm" | "amazonpay" | "bhim"

type MultiPaymentQRProps = {
  amount: string
  description?: string
  onComplete?: (method: PaymentMethod) => void
}

export function MultiPaymentQR({ amount, description, onComplete }: MultiPaymentQRProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [QRCodeSVG, setQRCodeSVG] = useState<any>(null)
  const [showCustomAmount, setShowCustomAmount] = useState(false)
  const [customAmount, setCustomAmount] = useState(amount || "")
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>("paypal")

  // Dynamically import QRCode to avoid SSR issues
  useEffect(() => {
    import("react-qr-code").then((module) => {
      setQRCodeSVG(module.default)
    })
  }, [])

  const handleCopy = (text: string, method: PaymentMethod) => {
    navigator.clipboard.writeText(text)
    setCopied(method)
    setTimeout(() => setCopied(null), 2000)
  }

  const getPayPalUrl = () => {
    const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "defaultpaypalid"
    const baseUrl = `https://www.paypal.com/qrcodes/managed/08a3a100-22e7-4523-87eb-b1eb07d7a37b?utm_source=consumer_app`
    const currentAmount = showCustomAmount && customAmount ? customAmount : amount
    return currentAmount ? `${baseUrl}&amount=${currentAmount}` : baseUrl
  }

  const getGooglePayData = () => {
    const currentAmount = showCustomAmount && customAmount ? customAmount : amount
    return {
      merchantName: "Your Business Name",
      amount: currentAmount,
      currency: "USD",
      paymentGateway: "googlepay",
    }
  }

  const getPhonePeUrl = () => {
    const currentAmount = showCustomAmount && customAmount ? customAmount : amount
    const merchantVPA = "yourbusiness@ybl" // Replace with your actual VPA
    const transactionId = `TXN${Date.now()}`
    return `upi://pay?pa=${merchantVPA}&pn=YourBusinessName&am=${currentAmount}&tr=${transactionId}&tn=Subscription Payment&cu=INR`
  }

  const getPaytmUrl = () => {
    const currentAmount = showCustomAmount && customAmount ? customAmount : amount
    const merchantVPA = "yourbusiness@paytm"
    const transactionId = `TXN${Date.now()}`
    return `upi://pay?pa=${merchantVPA}&pn=YourBusinessName&am=${currentAmount}&tr=${transactionId}&tn=Subscription Payment&cu=INR`
  }

  const getAmazonPayUrl = () => {
    const currentAmount = showCustomAmount && customAmount ? customAmount : amount
    const merchantVPA = "yourbusiness@apl"
    const transactionId = `TXN${Date.now()}`
    return `upi://pay?pa=${merchantVPA}&pn=YourBusinessName&am=${currentAmount}&tr=${transactionId}&tn=Subscription Payment&cu=INR`
  }

  const getBhimUrl = () => {
    const currentAmount = showCustomAmount && customAmount ? customAmount : amount
    const merchantVPA = "yourbusiness@upi"
    const transactionId = `TXN${Date.now()}`
    return `upi://pay?pa=${merchantVPA}&pn=YourBusinessName&am=${currentAmount}&tr=${transactionId}&tn=Subscription Payment&cu=INR`
  }

  const getQRData = () => {
    switch (activeMethod) {
      case "paypal":
        return getPayPalUrl()
      case "googlepay":
        return `https://pay.google.com/gp/p/ui/pay?c=${btoa(JSON.stringify(getGooglePayData()))}`
      case "phonepe":
        return getPhonePeUrl()
      case "paytm":
        return getPaytmUrl()
      case "amazonpay":
        return getAmazonPayUrl()
      case "bhim":
        return getBhimUrl()
      default:
        return getPayPalUrl()
    }
  }

  const handleOpenPayment = () => {
    const url = getQRData()
    window.open(url, "_blank")
    onComplete?.(activeMethod)
  }

  const getMethodInfo = (method: PaymentMethod) => {
    switch (method) {
      case "paypal":
        return {
          title: "PayPal Payment",
          description: "Scan with PayPal app or camera",
          buttonText: "Open PayPal",
          color: "bg-blue-500",
        }
      case "googlepay":
        return {
          title: "Google Pay",
          description: "Scan with Google Pay app",
          buttonText: "Open Google Pay",
          color: "bg-green-500",
        }
      case "phonepe":
        return {
          title: "PhonePe Payment",
          description: "Scan with PhonePe or any UPI app",
          buttonText: "Open PhonePe",
          color: "bg-purple-500",
        }
      case "paytm":
        return {
          title: "Paytm Payment",
          description: "Scan with Paytm app",
          buttonText: "Open Paytm",
          color: "bg-blue-600",
        }
      case "amazonpay":
        return {
          title: "Amazon Pay",
          description: "Scan with Amazon app",
          buttonText: "Open Amazon Pay",
          color: "bg-orange-500",
        }
      case "bhim":
        return {
          title: "BHIM UPI",
          description: "Scan with BHIM or any UPI app",
          buttonText: "Open BHIM",
          color: "bg-red-500",
        }
    }
  }

  const methodInfo = getMethodInfo(activeMethod)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{methodInfo.title}</CardTitle>
            <CardDescription>{methodInfo.description}</CardDescription>
          </div>
          <Badge className={methodInfo.color}>{activeMethod.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <Tabs
          value={activeMethod}
          onValueChange={(value) => setActiveMethod(value as PaymentMethod)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="googlepay">Google Pay</TabsTrigger>
            <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
            <TabsTrigger value="paytm">Paytm</TabsTrigger>
            <TabsTrigger value="amazonpay">Amazon Pay</TabsTrigger>
            <TabsTrigger value="bhim">BHIM UPI</TabsTrigger>
          </TabsList>

          <TabsContent value={activeMethod} className="space-y-4 mt-4">
            {QRCodeSVG && (
              <div className="bg-white p-3 rounded-lg border">
                <QRCodeSVG value={getQRData()} size={200} level="H" className="mx-auto" />
              </div>
            )}

            {description && <p className="text-center text-sm text-muted-foreground">{description}</p>}

            <div className="flex items-center space-x-2 w-full">
              <Input value={getQRData()} readOnly className="text-xs font-mono" />
              <Button variant="outline" size="sm" onClick={() => handleCopy(getQRData(), activeMethod)}>
                {copied === activeMethod ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div className="w-full space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="custom-amount"
                  checked={showCustomAmount}
                  onChange={() => setShowCustomAmount(!showCustomAmount)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mr-2"
                />
                <Label htmlFor="custom-amount" className="text-sm">
                  Use custom amount
                </Label>
              </div>

              {showCustomAmount && (
                <div className="flex items-center space-x-2">
                  <Label htmlFor="amount" className="sr-only">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">{activeMethod === "phonepe" ? "INR" : "USD"}</span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleOpenPayment}>
          {methodInfo.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}