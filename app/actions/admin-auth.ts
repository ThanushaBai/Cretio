"use server"

import { cookies } from "next/headers"
import { logActivity } from "@/lib/activity-logger"

// In a real app, this would be stored in a database
const adminUsers = [
  {
    id: "admin-1",
    username: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    createdAt: new Date(),
    lastLogin: null,
  },
  {
    id: "demo-admin",
    username: "Demo Admin",
    email: "demo@example.com",
    password: "demo123", // In a real app, this would be hashed
    createdAt: new Date(),
    lastLogin: null,
  },
]

export async function adminLogin(userData: any) {
  try {
    // In a real app, you would validate credentials against your database
    // For demo purposes, we'll just set the cookie with the provided user data

    // Store admin data in cookies for easy access
    cookies().set("admin_user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Log the activity
    await logActivity(userData.id, userData.email, "login", "admin", "Admin logged in")

    return true
  } catch (error) {
    console.error("Admin login error:", error)
    return false
  }
}

export async function adminSignup(formData: FormData) {
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    // Check if admin already exists
    if (adminUsers.some((user) => user.email === email)) {
      return {
        success: false,
        message: "Admin with this email already exists",
      }
    }

    // Create new admin
    const newAdmin = {
      id: `admin-${adminUsers.length + 1}`,
      username,
      email,
      password, // This would be hashed in a real application
      createdAt: new Date(),
      lastLogin: null,
    }

    // In a real app, you would save this to your database
    adminUsers.push(newAdmin)

    // Log the activity
    await logActivity(newAdmin.id, newAdmin.email, "create", "admin", "New admin account created")

    return {
      success: true,
      message: "Admin account created successfully",
      user: {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
      },
    }
  } catch (error) {
    console.error("Admin signup error:", error)
    return {
      success: false,
      message: "An error occurred during signup",
    }
  }
}

export async function adminLogout() {
  // Get admin info before clearing cookies
  const adminUserCookie = cookies().get("admin_user")
  let adminId = "unknown"
  let adminEmail = "unknown"

  if (adminUserCookie) {
    try {
      const adminUser = JSON.parse(adminUserCookie.value)
      adminId = adminUser.id
      adminEmail = adminUser.email
    } catch (e) {
      console.error("Error parsing admin user cookie:", e)
    }
  }

  // Clear cookies
  cookies().delete("admin_user")

  // Log the activity
  await logActivity(adminId, adminEmail, "logout", "admin", "Admin logged out")
}

export async function getAdminFromCookie() {
  const adminUserCookie = cookies().get("admin_user")
  if (!adminUserCookie) return null

  try {
    return JSON.parse(adminUserCookie.value)
  } catch (error) {
    return null
  }
}

export async function isAdminLoggedIn() {
  const adminUserCookie = cookies().get("admin_user")
  return !!adminUserCookie
}
