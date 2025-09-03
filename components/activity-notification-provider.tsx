"use client"

import { useEffect } from "react"
import { NotificationContainer } from "./popup-notification"
import { showActivityNotification, showCustomNotification } from "@/lib/activity-notification-service"
import { Bell } from "lucide-react"

// This component will be used to provide the notification container
// and listen for activity events
export function ActivityNotificationProvider() {
  useEffect(() => {
    // Show a welcome notification when the component mounts
    showCustomNotification(
      "Welcome back!",
      "Your dashboard is ready. You have new activities to review.",
      "activity",
      Bell,
      "top-right",
      5000,
    )

    // Set up event listeners for activity events
    const handleActivityEvent = (event: CustomEvent) => {
      const { action, resource, details } = event.detail
      showActivityNotification(action, resource, details)
    }

    // Add event listener for custom activity events
    window.addEventListener("user-activity" as any, handleActivityEvent as EventListener)

    // Clean up event listener
    return () => {
      window.removeEventListener("user-activity" as any, handleActivityEvent as EventListener)
    }
  }, [])

  return <NotificationContainer />
}

// Helper function to trigger activity notifications from anywhere in the app
export function triggerActivityNotification(action: string, resource: string, details: string) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("user-activity", {
      detail: { action, resource, details },
    })
    window.dispatchEvent(event)
  }
}
