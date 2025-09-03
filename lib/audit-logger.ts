import type { AuditLog } from "@/types/admin"

// In a real application, this would connect to your database
const auditLogs: AuditLog[] = []

export async function logAudit(
  adminId: string,
  adminEmail: string,
  action: string,
  resource: string,
  resourceId: string,
  details: string,
  before: any = null,
  after: any = null,
  request?: Request,
): Promise<AuditLog> {
  const ipAddress = request?.headers.get("x-forwarded-for") || "127.0.0.1"
  const userAgent = request?.headers.get("user-agent") || "Unknown"

  const auditLog: AuditLog = {
    id: Math.random().toString(36).substring(2, 15),
    adminId,
    adminEmail,
    action,
    resource,
    resourceId,
    details,
    before: before ? JSON.stringify(before) : null,
    after: after ? JSON.stringify(after) : null,
    timestamp: new Date(),
    ipAddress,
    userAgent,
  }

  // In a real app, you would save this to your database
  auditLogs.push(auditLog)

  // For demo purposes, we'll also log to console
  console.log(`Audit log: ${action} on ${resource} by ${adminEmail}`)

  return auditLog
}

export async function getAuditLogs(limit = 100, adminId?: string): Promise<AuditLog[]> {
  // In a real app, you would query your database
  let result = [...auditLogs]

  if (adminId) {
    result = result.filter((log) => log.adminId === adminId)
  }

  return result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit)
}