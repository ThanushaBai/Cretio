import type { ActivityType, ResourceType, UserActivity } from "@/types/admin"
import { showActivityNotification } from "./activity-notification-service"

// In a real application, this would connect to your database
const activities: UserActivity[] = []

export async function logActivity(
  userId: string,
  userEmail: string,
  action: ActivityType,
  resource: ResourceType,
  details: string,
  request?: Request,
  showNotification = true,
): Promise<UserActivity> {
  const ipAddress = request?.headers.get("x-forwarded-for") || "127.0.0.1"
  const userAgent = request?.headers.get("user-agent") || "Unknown"

  const activity: UserActivity = {
    id: Math.random().toString(36).substring(2, 15),
    userId,
    userEmail,
    action,
    resource,
    details,
    timestamp: new Date(),
    ipAddress,
    userAgent,
  }

  // In a real app, you would save this to your database
  activities.push(activity)

  // For demo purposes, we'll also log to console
  console.log(`Activity logged: ${action} on ${resource} by ${userEmail}`)

  // Show notification if enabled
  if (showNotification && typeof window !== "undefined") {
    showActivityNotification(action, resource, details)
  }

  return activity
}

export async function getActivities(limit = 100, userId?: string): Promise<UserActivity[]> {
  // In a real app, you would query your database
  let result = [...activities]

  if (userId) {
    result = result.filter((activity) => activity.userId === userId)
  }

  return result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit)
}

export async function clearActivities(): Promise<void> {
  // In a real app, you would clear your database table
  activities.length = 0
}
