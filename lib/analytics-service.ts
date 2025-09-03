import type { AnalyticsData, TimeSeriesData } from "@/types/admin"

// Generate mock data for analytics
function generateTimeSeriesData(
  days: number,
  min: number,
  max: number,
  trend: "up" | "down" | "stable" = "up",
): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    let value: number
    if (trend === "up") {
      value = min + ((max - min) * (days - i)) / days + Math.random() * 10 - 5
    } else if (trend === "down") {
      value = max - ((max - min) * (days - i)) / days + Math.random() * 10 - 5
    } else {
      value = (max + min) / 2 + Math.random() * (max - min) * 0.2 - (max - min) * 0.1
    }

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value),
    })
  }

  return data
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  // In a real app, you would query your database for actual analytics data

  // Mock user growth data (30 days)
  const userGrowth = generateTimeSeriesData(30, 120, 180, "up")

  // Mock revenue data (12 months)
  const revenueByMonth = generateTimeSeriesData(12, 15000, 45000, "up")

  // Mock activity by type
  const activityByType = [
    { name: "Login", value: 450 },
    { name: "View", value: 320 },
    { name: "Create", value: 180 },
    { name: "Update", value: 150 },
    { name: "Delete", value: 65 },
  ]

  // Mock activity by resource
  const activityByResource = [
    { name: "User", value: 280 },
    { name: "Agency", value: 200 },
    { name: "Funnel", value: 320 },
    { name: "Billing", value: 120 },
    { name: "Media", value: 180 },
  ]

  // Mock users by role
  const usersByRole = [
    { name: "Admin", value: 15 },
    { name: "Manager", value: 45 },
    { name: "User", value: 320 },
  ]

  return {
    userStats: {
      totalUsers: 380,
      activeUsers: 245,
      newUsersToday: 12,
      newUsersThisWeek: 45,
      newUsersThisMonth: 120,
    },
    systemStats: {
      totalAgencies: 42,
      totalFunnels: 128,
      totalRevenue: "$45,231.89",
      activeSubscriptions: 156,
    },
    activityStats: {
      loginCount: 450,
      signupCount: 120,
      pageViewCount: 1250,
      actionCount: 780,
    },
    userGrowth,
    activityByType,
    activityByResource,
    revenueByMonth,
    usersByRole,
  }
}