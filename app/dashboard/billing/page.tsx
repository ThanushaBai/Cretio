"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ArrowUpDown, CreditCard, Download, Search, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { generateInvoice } from "@/lib/generate-invoice"
import { notificationManager } from "@/components/popup-notification"
import { MultiPaymentQR } from "@/components/multi-payment-qr"
import { PayPalQRCode } from "@/components/qr-code"
// Payment dashboard removed as requested

const mockInvoices = [
	{
		id: "INV-2024-001",
		date: "2024-05-20",
		amount: 299.99,
		status: "paid",
		method: "PayPal",
	},
	{
		id: "INV-2024-002",
		date: "2024-05-15",
		amount: 599.99,
		status: "pending",
		method: "Credit Card",
	},
	{
		id: "INV-2024-003",
		date: "2024-05-10",
		amount: 199.99,
		status: "failed",
		method: "Google Pay",
	},
]

const mockSubscription = {
	plan: "Business Pro",
	status: "active",
	billingCycle: "monthly",
	nextBilling: "2024-06-20",
	amount: 299.99,
}

const plans = [
	{
		id: "starter",
		name: "Starter",
		price: 99.99,
		features: ["Basic Features", "5 Users", "10GB Storage", "Email Support"],
	},
	{
		id: "pro",
		name: "Professional",
		price: 299.99,
		features: ["All Starter Features", "25 Users", "50GB Storage", "Priority Support", "API Access"],
	},
	{
		id: "enterprise",
		name: "Enterprise",
		price: 599.99,
		features: [
			"All Pro Features",
			"Unlimited Users",
			"250GB Storage",
			"24/7 Support",
			"Custom Integration",
			"Advanced Analytics",
		],
	},
]

export default function BillingPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [showQRDialog, setShowQRDialog] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState(mockSubscription.plan)
	const [billingCycle, setBillingCycle] = useState(mockSubscription.billingCycle)
	const { toast } = useToast()

	const handleDownloadInvoice = async (invoiceId: string) => {
		try {
			// Create mock invoice data
			const invoiceData = {
				id: invoiceId,
				date: new Date().toISOString().split('T')[0],
				amount: "299.99",
				company: "Your Company Name",
				address: "123 Business Street, Suite 100, City, Country",
				items: [
					{
						description: "Monthly Subscription",
						amount: "299.99"
					}
				]
			}
			
			const invoice = await generateInvoice(invoiceData)
			toast({
				title: "Invoice Downloaded",
				description: `Invoice ${invoiceId} has been downloaded successfully.`,
			})
		} catch (error) {
			toast({
				title: "Download Failed",
				description: "There was an error downloading your invoice.",
				variant: "destructive",
			})
		}
	}

	const handlePlanChange = (planId: string) => {
		setSelectedPlan(planId)
		toast({
			title: "Plan Updated",
			description: "Your subscription plan has been updated successfully.",
		})
	}

	const handlePaymentComplete = (method: string) => {
		setShowQRDialog(false)
		toast({
			title: "Payment Initiated",
			description: `Your payment with ${method} has been initiated.`,
		})
		notificationManager.show({
			title: "Payment Processing",
			description: "We're processing your payment. You'll be notified once it's complete.",
			type: "info",
		})
	}

	const filteredInvoices = mockInvoices.filter(
		(invoice) =>
			invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
			invoice.method.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div className="space-y-8 p-8">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Billing & Payments</h2>
					<p className="text-muted-foreground">Manage your subscription and payment details</p>
				</div>
				<Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
					<DialogTrigger asChild>
						<Button>Make Payment</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Make a Payment</DialogTitle>
							<DialogDescription>Scan the QR code or click to open payment app</DialogDescription>
						</DialogHeader>
						<div className="flex items-center space-x-2">
							<MultiPaymentQR amount="299.99" description="Monthly Subscription" onComplete={handlePaymentComplete} />
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Analytics Dashboard removed as requested */}

			{/* Current Subscription */}
			<Card>
				<CardHeader>
					<CardTitle>Current Subscription</CardTitle>
					<CardDescription>Your current plan and billing details</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<Label>Plan</Label>
							<Select defaultValue={selectedPlan} onValueChange={handlePlanChange}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{plans.map((plan) => (
										<SelectItem key={plan.id} value={plan.id}>
											{plan.name} - ${plan.price}/month
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Billing Cycle</Label>
							<Select defaultValue={billingCycle} onValueChange={setBillingCycle}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="monthly">Monthly</SelectItem>
									<SelectItem value="annually">Annually (Save 20%)</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="rounded-lg border p-4">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="font-medium">Status</span>
								<Badge variant={mockSubscription.status === "active" ? "default" : "destructive"}>
									{mockSubscription.status.toUpperCase()}
								</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium">Next Billing Date</span>
								<span>{mockSubscription.nextBilling}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium">Amount</span>
								<span>${mockSubscription.amount}</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Invoices */}
			<Card>
				<CardHeader>
					<CardTitle>Billing History</CardTitle>
					<CardDescription>View and download your previous invoices</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Search className="h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search invoices..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="max-w-sm"
							/>
						</div>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Invoice ID</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Method</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredInvoices.map((invoice) => (
									<TableRow key={invoice.id}>
										<TableCell>{invoice.id}</TableCell>
										<TableCell>{invoice.date}</TableCell>
										<TableCell>${invoice.amount}</TableCell>
										<TableCell>
											<Badge
												variant={
													invoice.status === "paid"
														? "default"
														: invoice.status === "pending"
														? "secondary"
														: "destructive"
												}
											>
												{invoice.status.toUpperCase()}
											</Badge>
										</TableCell>
										<TableCell>{invoice.method}</TableCell>
										<TableCell className="text-right">
											<Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice(invoice.id)}>
												<Download className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}