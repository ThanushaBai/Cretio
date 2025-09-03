"use client"

import { useState, useEffect } from "react"
import { Bell, Globe, Shield, User, Wallet, CreditCard, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { notificationManager } from "@/components/popup-notification"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Create a context to manage global settings
export type DensityType = "comfortable" | "compact"
export type ThemeType = "light" | "dark" | "system"
export type ColorBlindnessType = "none" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia"

// Mock data for plans
const availablePlans = [
  {
    id: "plan_basic",
    name: "Basic",
    price: "$99.00",
    cycle: "Monthly",
    features: ["5 agencies", "10 sub-accounts", "5 team members", "Basic templates"],
  },
  {
    id: "plan_pro",
    name: "Professional",
    price: "$249.00",
    cycle: "Monthly",
    features: ["15 agencies", "25 sub-accounts", "15 team members", "Premium templates", "Priority support"],
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: "$499.00",
    cycle: "Monthly",
    features: [
      "Unlimited agencies",
      "50 sub-accounts",
      "25 team members",
      "All templates",
      "Priority support",
      "Custom domain",
    ],
    current: true,
  },
]

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<ThemeType>("system")
  const [density, setDensity] = useState<DensityType>("comfortable")
  const [animations, setAnimations] = useState(true)
  const [colorBlindness, setColorBlindness] = useState<ColorBlindnessType>("none")
  const [isChangePlanDialogOpen, setIsChangePlanDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("plan_enterprise")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [isConfirmingPlanChange, setIsConfirmingPlanChange] = useState(false)

  // Apply density to the document when it changes
  useEffect(() => {
    const root = document.documentElement
    if (density === "compact") {
      root.classList.add("density-compact")
    } else {
      root.classList.remove("density-compact")
    }

    // Save preference to localStorage
    localStorage.setItem("density", density)

    // Show notification
    notificationManager.show({
      title: "Density Changed",
      description: `UI density set to ${density}`,
      variant: "info",
      position: "top-center",
      duration: 3000,
    })
  }, [density])

  // Apply theme when it changes
  useEffect(() => {
    const root = document.documentElement
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const activeTheme = theme === "system" ? systemTheme : theme

    if (activeTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Save preference to localStorage
    localStorage.setItem("theme", theme)

    // Show notification
    notificationManager.show({
      title: "Theme Changed",
      description: `Theme set to ${theme}`,
      variant: "info",
      position: "top-center",
      duration: 3000,
    })
  }, [theme])

  // Apply color blindness mode
  useEffect(() => {
    const root = document.documentElement

    // Remove any existing color blindness classes
    root.classList.remove("color-protanopia", "color-deuteranopia", "color-tritanopia", "color-achromatopsia")

    // Add the selected color blindness class
    if (colorBlindness !== "none") {
      root.classList.add(`color-${colorBlindness}`)
    }

    // Save preference to localStorage
    localStorage.setItem("colorBlindness", colorBlindness)

    if (colorBlindness !== "none") {
      // Show notification
      notificationManager.show({
        title: "Color Mode Changed",
        description: `Color blindness mode set to ${colorBlindness}`,
        variant: "info",
        position: "top-center",
        duration: 3000,
      })
    }
  }, [colorBlindness])

  // Load saved preferences on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType
    const savedDensity = localStorage.getItem("density") as DensityType
    const savedAnimations = localStorage.getItem("animations")
    const savedColorBlindness = localStorage.getItem("colorBlindness") as ColorBlindnessType

    if (savedTheme) setTheme(savedTheme)
    if (savedDensity) setDensity(savedDensity)
    if (savedAnimations !== null) setAnimations(savedAnimations === "true")
    if (savedColorBlindness) setColorBlindness(savedColorBlindness)

    // Add CSS for color blindness modes
    const style = document.createElement("style")
    style.textContent = `
      .color-protanopia {
        filter: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="protanopia"><feColorMatrix in="SourceGraphic" type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0"/></filter></svg>#protanopia');
      }
      .color-deuteranopia {
        filter: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="deuteranopia"><feColorMatrix in="SourceGraphic" type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0"/></filter></svg>#deuteranopia');
      }
      .color-tritanopia {
        filter: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="tritanopia"><feColorMatrix in="SourceGraphic" type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0"/></filter></svg>#tritanopia');
      }
      .color-achromatopsia {
        filter: grayscale(100%);
      }
    `
    document.head.appendChild(style)
  }, [])

  // Toggle animations
  useEffect(() => {
    const root = document.documentElement
    if (!animations) {
      root.classList.add("reduce-animations")
    } else {
      root.classList.remove("reduce-animations")
    }

    // Save preference to localStorage
    localStorage.setItem("animations", animations.toString())

    // Show notification
    notificationManager.show({
      title: "Animations " + (animations ? "Enabled" : "Disabled"),
      description: animations ? "UI animations are now enabled" : "UI animations are now disabled",
      variant: "info",
      position: "top-center",
      duration: 3000,
    })
  }, [animations])

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })

      notificationManager.show({
        title: "Settings Saved",
        description: "Your settings have been saved successfully.",
        variant: "success",
        position: "top-center",
        duration: 5000,
      })
    }, 1000)
  }

  const handleChangePlan = () => {
    // Get the selected plan details
    const newPlan = availablePlans.find((plan) => plan.id === selectedPlan)
    if (!newPlan) return

    setIsConfirmingPlanChange(true)

    // Simulate API call
    setTimeout(() => {
      setIsConfirmingPlanChange(false)

      toast({
        title: "Plan updated successfully",
        description: `Your subscription has been updated to the ${newPlan.name} plan.`,
      })

      notificationManager.show({
        title: "Plan Changed",
        description: `Your subscription has been updated to the ${newPlan.name} plan.`,
        variant: "success",
        position: "top-center",
        duration: 5000,
      })

      setIsChangePlanDialogOpen(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
          <TabsTrigger value="general">
            <User className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Globe className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <Wallet className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your basic account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Acme Inc" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    defaultValue="Marketing professional with 10+ years of experience in digital marketing and brand management."
                  />
                </div>
              </div>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the platform looks and feels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value as ThemeType)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Density</Label>
                  <RadioGroup
                    value={density}
                    onValueChange={(value) => setDensity(value as DensityType)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="comfortable" />
                      <Label htmlFor="comfortable">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="compact" />
                      <Label htmlFor="compact">Compact</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Color Blindness Mode</Label>
                  <RadioGroup
                    value={colorBlindness}
                    onValueChange={(value) => setColorBlindness(value as ColorBlindnessType)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="protanopia" id="protanopia" />
                      <Label htmlFor="protanopia">Protanopia (Red-Blind)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deuteranopia" id="deuteranopia" />
                      <Label htmlFor="deuteranopia">Deuteranopia (Green-Blind)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tritanopia" id="tritanopia" />
                      <Label htmlFor="tritanopia">Tritanopia (Blue-Blind)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="achromatopsia" id="achromatopsia" />
                      <Label htmlFor="achromatopsia">Achromatopsia (Monochromacy)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable animations throughout the interface</p>
                  </div>
                  <Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
                </div>
              </div>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly digest of platform activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your billing information and subscription.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Current Plan: Enterprise</h3>
                      <p className="text-sm text-muted-foreground">$499/month, billed monthly</p>
                    </div>
                    <Dialog open={isChangePlanDialogOpen} onOpenChange={setIsChangePlanDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                          Change Plan
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Change Subscription Plan</DialogTitle>
                          <DialogDescription>
                            Choose a plan that best fits your needs. You can upgrade or downgrade at any time.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex justify-end mb-4">
                            <RadioGroup
                              defaultValue="monthly"
                              value={billingCycle}
                              onValueChange={setBillingCycle}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly-billing" />
                                <Label htmlFor="monthly-billing">Monthly</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yearly" id="yearly-billing" />
                                <Label htmlFor="yearly-billing">Yearly (Save 20%)</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="grid gap-4 md:grid-cols-3">
                            {availablePlans.map((plan) => (
                              <Card
                                key={plan.id}
                                className={`cursor-pointer transition-all ${
                                  selectedPlan === plan.id ? "border-primary ring-2 ring-primary/20" : ""
                                }`}
                                onClick={() => setSelectedPlan(plan.id)}
                              >
                                <CardHeader>
                                  <CardTitle className="flex justify-between">
                                    {plan.name}
                                    {plan.current && <Badge>Current</Badge>}
                                  </CardTitle>
                                  <CardDescription>
                                    <span className="text-2xl font-bold">{plan.price}</span>
                                    <span className="text-sm"> / {plan.cycle.toLowerCase()}</span>
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                      <li key={index} className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                                <CardFooter>
                                  <Button
                                    variant={selectedPlan === plan.id ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setSelectedPlan(plan.id)}
                                  >
                                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsChangePlanDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleChangePlan} disabled={isConfirmingPlanChange}>
                            {isConfirmingPlanChange ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                                Processing...
                              </>
                            ) : (
                              "Confirm Change"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-16 rounded bg-muted flex items-center justify-center">
                          <span className="text-sm font-medium">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Billing Address</Label>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>123 Business Ave, Suite 100</p>
                        <p>Bengaluru, Karnataka 560097</p>
                        <p>India</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
