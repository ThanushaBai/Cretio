"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ActivityTracker({ userId, userEmail }: { 
  userId?: string
  userEmail?: string 
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Skip tracking if user data is not available
    if (!userId || !userEmail) {
      console.log("Skipping activity tracking: User data not available")
      return
    }

    const trackPageView = async () => {
      try {
        const response = await fetch("/api/activity/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            userEmail,
            action: "view",
            resource: "page",
            details: `Viewed page: ${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
          }),
        })

        if (!response.ok) {
          console.error("Failed to track page view")
        }
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    }

    trackPageView()
  }, [pathname, searchParams, userId, userEmail])

  return null
}