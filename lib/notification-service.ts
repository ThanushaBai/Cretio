import type { AdminNotification, NotificationType } from "@/types/admin"

// In a real application, this would connect to your database
const notifications: AdminNotification[] = [
  {
    id: "1",
    title: "New User Registration",
    message: "A new user has registered to the platform.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: "2",
    title: "System Alert",
    message: "Database backup completed successfully.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "3",
    title: "Security Alert",
    message: "Multiple failed login attempts detected.",
    type: "warning",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    link: "/admin/security",
  },
  {
    id: "4",
    title: "Payment Processing Error",
    message: "Payment gateway is experiencing issues. Some transactions may fail.",
    type: "error",
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    link: "/admin/billing",
  },
  {
    id: "5",
    title: "New Feature Deployed",
    message: "The new analytics dashboard has been deployed to production.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "6",
    title: "Maintenance Scheduled",
    message: "System maintenance scheduled for tomorrow at 2:00 AM UTC.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
]

export async function getNotifications(limit = 10, includeRead = false): Promise<AdminNotification[]> {
  // In a real app, you would query your database
  let result = [...notifications]

  if (!includeRead) {
    result = result.filter((notification) => !notification.isRead)
  }

  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit)
}

export async function markNotificationAsRead(id: string): Promise<void> {
  // In a real app, you would update your database
  const notification = notifications.find((n) => n.id === id)
  if (notification) {
    notification.isRead = true
  }
}

export async function markAllNotificationsAsRead(): Promise<void> {
  // In a real app, you would update your database
  notifications.forEach((notification) => {
    notification.isRead = true
  })
}

export async function addNotification(
  title: string,
  message: string,
  type: NotificationType,
  link?: string,
): Promise<AdminNotification> {
  const notification: AdminNotification = {
    id: Math.random().toString(36).substring(2, 15),
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date(),
    link,
  }

  // In a real app, you would save this to your database
  notifications.push(notification)

  return notification
}

export async function deleteNotification(id: string): Promise<boolean> {
  // In a real app, you would delete from your database
  const index = notifications.findIndex((n) => n.id === id)
  if (index !== -1) {
    notifications.splice(index, 1)
    return true
  }
  return false
}

export async function clearAllNotifications(): Promise<void> {
  // In a real app, you would clear your database table
  notifications.length = 0
}
