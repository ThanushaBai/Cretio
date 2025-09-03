import { ActivityType, ResourceType, UserActivity } from "@/types/admin"

// Mock activities for demo purposes
// In a real app, these would be stored in your database
const activities: UserActivity[] = [
  {
    id: "1",
    userId: "admin-1",
    userEmail: "admin@cretio.com",
    action: "login" as ActivityType,
    resource: "admin" as ResourceType,
    details: "Admin logged in",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0"
  },
  {
    id: "2",
    userId: "admin-1",
    userEmail: "admin@cretio.com",
    action: "view" as ActivityType,
    resource: "admin" as ResourceType,
    details: "Admin viewed dashboard",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0"
  },
  {
    id: "3",
    userId: "user-1",
    userEmail: "user@example.com",
    action: "create" as ActivityType,
    resource: "funnel" as ResourceType,
    details: "User created a new funnel",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0"
  },
  {
    id: "4",
    userId: "user-2",
    userEmail: "another@example.com",
    action: "update" as ActivityType,
    resource: "user" as ResourceType,
    details: "User updated their profile",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    ipAddress: "192.168.1.3",
    userAgent: "Mozilla/5.0"
  },
  {
    id: "5",
    userId: "admin-1",
    userEmail: "admin@cretio.com",
    action: "view" as ActivityType,
    resource: "user" as ResourceType,
    details: "Admin viewed user list",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0"
  }
]

export async function logActivity(
  userId: string,
  userEmail: string,
  action: ActivityType,
  resource: ResourceType,
  details: string,
  request?: Request
): Promise<UserActivity> {
  const ipAddress = request?.headers.get('x-forwarded-for') || '127.0.0.1'
  const userAgent = request?.headers.get('user-agent') || 'Unknown'
  
  const activity: UserActivity = {
    id: Math.random().toString(36).substring(2, 15),
    userId,
    userEmail,
    action,
    resource,
    details,
    timestamp: new Date(),
    ipAddress,
    userAgent
  }
  
  // In a real app, you would save this to your database
  activities.push(activity)
  
  // For demo purposes, we'll also log to console
  console.log(`Activity logged: ${action} on ${resource} by ${userEmail}`)
  
  return activity
}

export async function getActivities(limit = 100, userId?: string): Promise<UserActivity[]> {
  // In a real app, you would query your database
  let result = [...activities]
  
  if (userId) {
    result = result.filter(activity => activity.userId === userId)
  }
  
  return result
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit)
}

export async function clearActivities(): Promise<void> {
  // In a real app, you would clear your database table
  activities.length = 0
}