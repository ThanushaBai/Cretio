export interface AdminUser {
  id: string
  username: string
  email: string
  password: string // This would be hashed in a real application
  role: AdminRole
  permissions: Permission[]
  createdAt: Date
  lastLogin: Date | null
}

export type AdminRole = "super_admin" | "admin" | "moderator" | "analyst" | "support"

export type Permission =
  | "manage_users"
  | "manage_admins"
  | "manage_agencies"
  | "manage_billing"
  | "manage_funnels"
  | "view_analytics"
  | "manage_settings"
  | "view_logs"
  | "manage_media"

export type ActivityType =
  | "create"
  | "update"
  | "delete"
  | "view"
  | "login"
  | "logout"
  | "payment"
  | "export"
  | "import"
  | "download"
  | "upload"
  | "share"
  | "archive"
  | "restore"
  | "approve"
  | "reject"
  | "configure"

export type ResourceType =
  | "user"
  | "agency"
  | "subaccount"
  | "funnel"
  | "payment"
  | "invoice"
  | "report"
  | "media"
  | "settings"
  | "system"

export interface UserActivity {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  resourceId?: string | null
  details: string
  timestamp: Date
  ipAddress: string
  userAgent?: string
}

export interface AuditLog {
  id: string
  adminId: string
  adminEmail: string
  action: string
  resource: string
  resourceId: string
  details: string
  before: string | null
  after: string | null
  timestamp: Date
  ipAddress: string
  userAgent: string
}

export type AnalyticsData = {
  userStats: {
    totalUsers: number
    activeUsers: number
    newUsersToday: number
  }
  systemStats: {
    totalAgencies: number
    totalFunnels: number
    totalRevenue: string
  }
}

export type NotificationType = "info" | "success" | "warning" | "error"

export type AdminNotification = {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: Date
  link?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "suspended"
  createdAt: Date
  lastLogin: Date | null
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  newUsersThisWeek: number
  newUsersThisMonth: number
}

export interface SystemStats {
  totalAgencies: number
  totalFunnels: number
  totalRevenue: string
  activeSubscriptions: number
}

export interface ActivityStats {
  loginCount: number
  signupCount: number
  pageViewCount: number
  actionCount: number
}

export interface TimeSeriesData {
  date: string
  value: number
}

export interface AnalyticsData {
  userStats: UserStats
  systemStats: SystemStats
  activityStats: ActivityStats
  userGrowth: TimeSeriesData[]
  activityByType: { name: string; value: number }[]
  activityByResource: { name: string; value: number }[]
  revenueByMonth: TimeSeriesData[]
  usersByRole: { name: string; value: number }[]
}