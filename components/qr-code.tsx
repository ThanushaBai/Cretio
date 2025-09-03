"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type QRCodeProps = {
  value: string
  size?: number
  paymentAmount?: string
  description?: string
  onComplete?: () => void
}

export function PayPalQRCode({ value, size = 200, paymentAmount, description, onComplete }: QRCodeProps) {
  const [copied, setCopied] = useState(false)
  const [QRCodeSVG, setQRCodeSVG] = useState<any>(null)
  const [showCustomAmount, setShowCustomAmount] = useState(false)
  const [customAmount, setCustomAmount] = useState(paymentAmount || "")

  // Dynamically import QRCode to avoid SSR issues
  useEffect(() => {
    import("react-qr-code").then((module) => {
      setQRCodeSVG(module.default)
    })
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate PayPal URL with optional amount
  const getPayPalUrl = () => {
    const baseUrl = `https://www.paypal.com/qrcodes/p2p/${value}`
    const amount =
      showCustomAmount && customAmount ? `?amount=${customAmount}` : paymentAmount ? `?amount=${paymentAmount}` : ""
    return baseUrl + amount
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>PayPal QR Payment</CardTitle>
        <CardDescription>Scan with your mobile device to pay via PayPal</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {QRCodeSVG && (
          <div className="bg-white p-3 rounded-lg">
            <QRCodeSVG value={getPayPalUrl()} size={size} level="H" className="mx-auto" />
          </div>
        )}

        {description && <p className="text-center text-sm text-muted-foreground">{description}</p>}

        <div className="flex items-center space-x-2 w-full">
          <Input value={value} readOnly className="text-xs font-mono" />
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
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
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            window.open(getPayPalUrl(), "_blank")
            onComplete?.()
          }}
        >
          Open in PayPal App
        </Button>
      </CardFooter>
    </Card>
  )
}