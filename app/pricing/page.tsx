"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Choose the perfect plan for your business needs. No hidden fees.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Starter Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Starter</CardTitle>
            <CardDescription>Perfect for small agencies just getting started</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-5xl font-bold">$49</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Up to 3 team members</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>5 client sub-accounts</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>10 funnels</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>5GB media storage</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Basic CRM features</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="default">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Professional Plan - Using primary color (pink) instead of red */}
        <Card className="flex flex-col relative border-primary bg-primary text-primary-foreground">
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <Badge className="bg-primary/90 text-primary-foreground">Most Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Professional</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Ideal for growing agencies with multiple clients
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-5xl font-bold">$149</span>
              <span className="text-primary-foreground/80 ml-2">/month</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-foreground mr-2 flex-shrink-0" />
                <span>Up to 10 team members</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-foreground mr-2 flex-shrink-0" />
                <span>25 client sub-accounts</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-foreground mr-2 flex-shrink-0" />
                <span>Unlimited funnels</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-foreground mr-2 flex-shrink-0" />
                <span>50GB media storage</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-foreground mr-2 flex-shrink-0" />
                <span>Advanced CRM with email campaigns</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary-foreground mr-2 flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              variant="secondary"
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
            <CardDescription>For large agencies with advanced requirements</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-5xl font-bold">$399</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Unlimited team members</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Unlimited client sub-accounts</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Unlimited funnels</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>500GB media storage</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Full CRM suite with automation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>24/7 dedicated support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>White labeling</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="default">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}