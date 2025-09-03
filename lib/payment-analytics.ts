export interface PaymentAnalytics {
  totalRevenue: number
  monthlyRevenue: number
  paymentMethodBreakdown: {
    paypal: number
    creditCard: number
    googlePay: number
    phonePe: number
  }
  subscriptionMetrics: {
    active: number
    cancelled: number
    suspended: number
    churnRate: number
  }
  revenueGrowth: number
  averageRevenuePerUser: number
}

export interface PaymentEvent {
  id: string
  type: "subscription_created" | "payment_completed" | "payment_failed" | "subscription_cancelled"
  method: "paypal" | "credit_card" | "google_pay" | "phone_pe"
  amount: number
  currency: string
  userId: string
  subscriptionId?: string
  timestamp: Date
  status: "success" | "failed" | "pending"
  metadata?: Record<string, any>
}

class PaymentAnalyticsService {
  private static instance: PaymentAnalyticsService
  private events: PaymentEvent[] = []

  static getInstance(): PaymentAnalyticsService {
    if (!PaymentAnalyticsService.instance) {
      PaymentAnalyticsService.instance = new PaymentAnalyticsService()
    }
    return PaymentAnalyticsService.instance
  }

  // Track payment events
  trackEvent(event: Omit<PaymentEvent, "id" | "timestamp">) {
    const paymentEvent: PaymentEvent = {
      ...event,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    this.events.push(paymentEvent)

    // In a real app, you'd save this to your database
    console.log("Payment event tracked:", paymentEvent)

    return paymentEvent
  }

  // Get payment analytics
  getAnalytics(startDate?: Date, endDate?: Date): PaymentAnalytics {
    const now = new Date()
    const start = startDate || new Date(now.getFullYear(), now.getMonth() - 12, 1)
    const end = endDate || now

    const filteredEvents = this.events.filter((event) => event.timestamp >= start && event.timestamp <= end)

    const successfulPayments = filteredEvents.filter(
      (event) => event.type === "payment_completed" && event.status === "success",
    )

    const totalRevenue = successfulPayments.reduce((sum, event) => sum + event.amount, 0)

    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthlyRevenue = successfulPayments
      .filter((event) => event.timestamp >= currentMonth)
      .reduce((sum, event) => sum + event.amount, 0)

    const paymentMethodBreakdown = {
      paypal: successfulPayments.filter((e) => e.method === "paypal").length,
      creditCard: successfulPayments.filter((e) => e.method === "credit_card").length,
      googlePay: successfulPayments.filter((e) => e.method === "google_pay").length,
      phonePe: successfulPayments.filter((e) => e.method === "phone_pe").length,
    }

    const subscriptions = {
      active: filteredEvents.filter((e) => e.type === "subscription_created").length,
      cancelled: filteredEvents.filter((e) => e.type === "subscription_cancelled").length,
      suspended: 0, // Would come from webhook data
    }

    const churnRate = subscriptions.active > 0 ? (subscriptions.cancelled / subscriptions.active) * 100 : 0

    const uniqueUsers = new Set(successfulPayments.map((e) => e.userId)).size
    const averageRevenuePerUser = uniqueUsers > 0 ? totalRevenue / uniqueUsers : 0

    // Calculate revenue growth (simplified)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
    const lastMonthRevenue = successfulPayments
      .filter((event) => event.timestamp >= lastMonth && event.timestamp <= lastMonthEnd)
      .reduce((sum, event) => sum + event.amount, 0)

    const revenueGrowth = lastMonthRevenue > 0 ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0

    return {
      totalRevenue,
      monthlyRevenue,
      paymentMethodBreakdown,
      subscriptionMetrics: {
        ...subscriptions,
        churnRate,
      },
      revenueGrowth,
      averageRevenuePerUser,
    }
  }

  // Get payment method usage statistics
  getPaymentMethodStats() {
    const methodStats = this.events.reduce(
      (stats, event) => {
        if (event.type === "payment_completed" && event.status === "success") {
          stats[event.method] = (stats[event.method] || 0) + 1
        }
        return stats
      },
      {} as Record<string, number>,
    )

    const total = Object.values(methodStats).reduce((sum, count) => sum + count, 0)

    return Object.entries(methodStats).map(([method, count]) => ({
      method,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
  }

  // Get revenue trends
  getRevenueTrends(months = 12) {
    const trends = []
    const now = new Date()

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)

      const monthRevenue = this.events
        .filter(
          (event) =>
            event.type === "payment_completed" &&
            event.status === "success" &&
            event.timestamp >= monthStart &&
            event.timestamp <= monthEnd,
        )
        .reduce((sum, event) => sum + event.amount, 0)

      trends.push({
        month: monthStart.toLocaleDateString("en-US", { year: "numeric", month: "short" }),
        revenue: monthRevenue,
        date: monthStart,
      })
    }

    return trends
  }
}

export const paymentAnalytics = PaymentAnalyticsService.getInstance()
