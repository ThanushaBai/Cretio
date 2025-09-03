"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { logActivity } from "@/lib/activity-logger"
import { AdminUser } from "@/types/admin"

// Mock admin users for demo purposes
// In a real app, these would be stored in your database
const adminUsers: AdminUser[] = [
  {
    id: "admin1",
    username: "admin",
    email: "admin@cretio.com",
    password: "admin123", // This would be hashed in a real application
    createdAt: new Date(),
    lastLogin: null
  }
]

export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    // In a real app, you would query your database and verify the password hash
    const admin = adminUsers.find(
      (user) => user.email === email && user.password === password
    )

    if (!admin) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    // Update last login
    admin.lastLogin = new Date()

    // Set the token in cookies
    cookies().set("adminToken", `admin-token-${admin.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Store admin data in cookies for easy access
    cookies().set("adminUser", JSON.stringify(admin), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Log the activity
    await logActivity(
      admin.id,
      admin.email,
      "login",
      "admin",
      "Admin logged in"
    )

    return {
      success: true,
      message: "Login successful",
      user: admin,
    }
  } catch (error) {
    console.error("Admin login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
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
    const newAdmin: AdminUser = {
      id: `admin${adminUsers.length + 1}`,
      username,
      email,
      password, // This would be hashed in a real application
      createdAt: new Date(),
      lastLogin: null
    }

    // In a real app, you would save this to your database
    adminUsers.push(newAdmin)

    // Log the activity
    await logActivity(
      newAdmin.id,
      newAdmin.email,
      "create",
      "admin",
      "New admin account created"
    )

    return {
      success: true,
      message: "Admin account created successfully",
      user: newAdmin,
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
  const adminUserCookie = cookies().get("adminUser")
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
  cookies().delete("adminToken")
  cookies().delete("adminUser")
  
  // Log the activity
  await logActivity(
    adminId,
    adminEmail,
    "logout",
    "admin",
    "Admin logged out"
  )
  
  redirect("/admin/login")
}

export async function getAdminFromCookie() {
  const adminUserCookie = cookies().get("adminUser")
  if (!adminUserCookie) return null
  
  try {
    return JSON.parse(adminUserCookie.value)
  } catch (error) {
    return null
  }
}

export async function isAdminLoggedIn() {
  const adminToken = cookies().get("adminToken")
  return !!adminToken
}