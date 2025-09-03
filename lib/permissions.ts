import type { AdminRole, Permission } from "@/types/admin"

// Define role-based permissions
const rolePermissions: Record<AdminRole, Permission[]> = {
  super_admin: [
    "manage_users",
    "manage_admins",
    "manage_agencies",
    "manage_billing",
    "manage_funnels",
    "view_analytics",
    "manage_settings",
    "view_logs",
    "manage_media",
  ],
  admin: [
    "manage_users",
    "manage_agencies",
    "manage_billing",
    "manage_funnels",
    "view_analytics",
    "manage_settings",
    "view_logs",
    "manage_media",
  ],
  moderator: ["manage_users", "manage_agencies", "manage_funnels", "view_analytics", "view_logs"],
  analyst: ["view_analytics", "view_logs"],
  support: ["manage_users", "view_logs"],
}

/**
 * Get all permissions assigned to a specific role
 */
export function getPermissionsForRole(role: AdminRole): Permission[] {
  return rolePermissions[role] || []
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
  return userPermissions.includes(requiredPermission)
}

/**
 * Get the display name for a role
 */
export function getRoleName(role: AdminRole): string {
  const roleNames: Record<AdminRole, string> = {
    super_admin: "Super Admin",
    admin: "Administrator",
    moderator: "Moderator",
    analyst: "Analyst",
    support: "Support Agent",
  }

  return roleNames[role] || role
}