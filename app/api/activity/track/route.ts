import { NextResponse } from "next/server"

// Define a simple activity logging function
async function logActivity(action: string, resource: string, details: string, userEmail: string) {
  // In a real app, this would save to a database
  const activity = {
    id: Math.random().toString(36).substring(2, 15),
    action,
    resource,
    details,
    userEmail,
    timestamp: new Date(),
  }
  
  console.log("Activity logged:", activity)
  return activity
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, resource, details, userEmail } = body

    if (!action || !resource || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const activity = await logActivity(action, resource, details, userEmail)

    return NextResponse.json({ activity })
  } catch (error) {
    console.error("Activity tracking error:", error)
    return NextResponse.json(
      { error: "Failed to track activity" },
      { status: 500 }
    )
  }
}
