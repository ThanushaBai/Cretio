import {
  Check,
  AlertCircle,
  Info,
  User,
  FileText,
  Building,
  CreditCard,
  BarChart,
  Folder,
  Settings,
  Trash,
  Edit,
  Plus,
  Eye,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ActivityType, ResourceType } from "@/types/admin"
import { notificationManager } from "@/components/popup-notification"

// Define activity notification types
type ActivityNotificationConfig = {
  title: string
  description: string
  variant: "default" | "success" | "warning" | "destructive" | "info" | "activity"
  icon: LucideIcon
  duration?: number
}

// Map activity types to notification configs
const activityNotificationMap: Record<ActivityType, Partial<ActivityNotificationConfig>> = {
  create: {
    title: "Created",
    variant: "success",
    icon: Plus,
  },
  update: {
    title: "Updated",
    variant: "info",
    icon: Edit,
  },
  delete: {
    title: "Deleted",
    variant: "destructive",
    icon: Trash,
  },
  view: {
    title: "Viewed",
    variant: "default",
    icon: Eye,
  },
  login: {
    title: "Logged In",
    variant: "info",
    icon: User,
  },
  logout: {
    title: "Logged Out",
    variant: "default",
    icon: User,
  },
  payment: {
    title: "Payment",
    variant: "success",
    icon: CreditCard,
  },
  export: {
    title: "Exported",
    variant: "info",
    icon: FileText,
  },
  import: {
    title: "Imported",
    variant: "info",
    icon: FileText,
  },
  download: {
    title: "Downloaded",
    variant: "info",
    icon: FileText,
  },
  upload: {
    title: "Uploaded",
    variant: "info",
    icon: FileText,
  },
  share: {
    title: "Shared",
    variant: "info",
    icon: FileText,
  },
  archive: {
    title: "Archived",
    variant: "warning",
    icon: Folder,
  },
  restore: {
    title: "Restored",
    variant: "success",
    icon: Folder,
  },
  approve: {
    title: "Approved",
    variant: "success",
    icon: Check,
  },
  reject: {
    title: "Rejected",
    variant: "destructive",
    icon: AlertCircle,
  },
  configure: {
    title: "Configured",
    variant: "info",
    icon: Settings,
  },
}

// Map resource types to readable names and icons
const resourceTypeMap: Record<ResourceType, { name: string; icon: LucideIcon }> = {
  user: { name: "User", icon: User },
  agency: { name: "Agency", icon: Building },
  subaccount: { name: "Subaccount", icon: Building },
  funnel: { name: "Funnel", icon: BarChart },
  payment: { name: "Payment", icon: CreditCard },
  invoice: { name: "Invoice", icon: FileText },
  report: { name: "Report", icon: FileText },
  media: { name: "Media", icon: FileText },
  settings: { name: "Settings", icon: Settings },
  system: { name: "System", icon: Settings },
}

// Function to show activity notification
export function showActivityNotification(
  action: ActivityType,
  resource: ResourceType,
  details: string,
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center" = "top-right",
) {
  const activityConfig = activityNotificationMap[action] || {}
  const resourceConfig = resourceTypeMap[resource] || { name: resource, icon: Info }

  const title = `${activityConfig.title || action} ${resourceConfig.name}`
  const Icon = activityConfig.icon || Info

  return notificationManager.show({
    title,
    description: details,
    variant: activityConfig.variant || "default",
    icon: <Icon className="h-5 w-5" />,
    position,
    duration: activityConfig.duration || 5000,
  })
}

// Function to show a custom notification
export function showCustomNotification(
  title: string,
  description: string,
  variant: "default" | "success" | "warning" | "destructive" | "info" | "activity" = "default",
  icon?: LucideIcon,
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center" = "top-right",
  duration = 5000,
) {
  const Icon = icon || Info

  return notificationManager.show({
    title,
    description,
    variant,
    icon: <Icon className="h-5 w-5" />,
    position,
    duration,
  })
}
