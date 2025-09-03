"use client"

import { useState } from "react"
import { ArrowLeft, Check, ShoppingCart } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PaymentForm } from "@/components/payment-form"

// Mock product data
const products = [
  {
    id: "basic-plan",
    name: "Basic Plan",
    description: "Perfect for small businesses and startups",
    price: 49.99,
    features: [
      "Up to 5 users",
      "10 GB storage",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "pro-plan",
    name: "Pro Plan",
    description: "Ideal for growing businesses",
    price: 99.99,
    features: [
      "Up to 20 users",
      "50 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    id: "enterprise-plan",
    name: "Enterprise Plan",
    description: "For large organizations with complex needs",
    price: 199.99,
    features: [
      "Unlimited users",
      "500 GB storage",
      "Premium analytics",
      "24/7 dedicated support",
      "Custom branding",
      "API access",
      "Advanced security",
    ],
  },
]

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(products[1]) // Default to Pro plan
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase to get started</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {paymentSuccess ? (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center">Payment Successful!</CardTitle>
              <CardDescription className="text-center">
                Thank you for your purchase. Your subscription is now active.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Plan</span>
                  <span>{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Amount</span>
                  <span>${selectedPlan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status</span>
                  <span className="text-green-600">Paid</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your order details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-primary/10 p-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedPlan.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                      </div>
                    </div>
                    <p className="font-medium">${selectedPlan.price.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Plan Features:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <p>Total</p>
                    <p>${selectedPlan.price.toFixed(2)}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="w-full">
                    <p className="mb-2 text-sm font-medium">Select a plan:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {products.map((product) => (
                        <Button
                          key={product.id}
                          variant={selectedPlan.id === product.id ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedPlan(product)}
                        >
                          {product.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <PaymentForm
                amount={selectedPlan.price}
                currency="usd"
                onSuccess={handlePaymentSuccess}
                metadata={{
                  planId: selectedPlan.id,
                  planName: selectedPlan.name,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}