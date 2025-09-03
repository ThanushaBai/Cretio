"use client"

import { toast } from "@/hooks/use-toast"
import { triggerActivityNotification } from "@/components/activity-notification-provider"

// Helper function to get item name based on item type
const getItemName = (itemType: string, item: any): string => {
  switch (itemType) {
    case "user":
      return item.name || item.username || item.email || "Unknown user"
    case "agency":
      return item.name || "Unknown agency"
    case "funnel":
      return item.name || "Unknown funnel"
    case "domain":
      return item.name || item.domain || "Unknown domain"
    case "media":
      return item.name || item.title || item.filename || "Unknown media"
    case "template":
      return item.name || "Unknown template"
    case "task":
      return item.title || "Unknown task"
    case "contact":
      return item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || item.email || "Unknown contact"
    default:
      return item.name || item.title || "Unknown item"
  }
}

// Helper function to get the activity type for notifications
const getActivityType = (action: string): string => {
  switch (action) {
    case "create":
    case "add":
      return "create"
    case "edit":
    case "update":
    case "change":
    case "reset":
      return "update"
    case "delete":
    case "remove":
      return "delete"
    case "view":
    case "preview":
    case "manage":
      return "view"
    default:
      return "update"
  }
}

// Helper function to get success message for toast
const getSuccessMessage = (action: string, itemType: string, item: any): string => {
  const itemName = getItemName(itemType, item)
  
  switch (action) {
    case "create":
    case "add":
      return `The ${itemType} "${itemName}" has been created successfully.`
    case "edit":
    case "update":
      return `The ${itemType} "${itemName}" has been updated successfully.`
    case "delete":
    case "remove":
      return `The ${itemType} "${itemName}" has been deleted successfully.`
    case "reset":
      return `Password for ${itemType} "${itemName}" has been reset successfully.`
    case "change":
      return `Changes to ${itemType} "${itemName}" have been saved successfully.`
    default:
      return `Action "${action}" on ${itemType} "${itemName}" completed successfully.`
  }
}

// Helper function to get notification message
const getNotificationMessage = (action: string, itemType: string, item: any): string => {
  const itemName = getItemName(itemType, item)
  
  switch (action) {
    case "create":
    case "add":
      return `Created new ${itemType}: ${itemName}`
    case "edit":
    case "update":
      return `Updated ${itemType}: ${itemName}`
    case "delete":
    case "remove":
      return `Deleted ${itemType}: ${itemName}`
    case "view":
    case "preview":
      return `Viewed ${itemType} details: ${itemName}`
    case "manage":
      return `Managing ${itemType}: ${itemName}`
    case "reset":
      return `Reset password for ${itemType}: ${itemName}`
    case "change":
      return `Changed settings for ${itemType}: ${itemName}`
    default:
      return `Performed ${action} on ${itemType}: ${itemName}`
  }
}

// Generic action handler for all dashboard features
export const handleAction = async (
  action: string,
  itemType: string,
  item: any,
  callback?: (result: any) => void
) => {
  try {
    // Log the action (for debugging)
    console.log(`${action} ${itemType}:`, item)

    // Show a loading toast for long operations
    const loadingToast = action !== "view" ? 
      toast({
        title: `Processing ${action}...`,
        description: `Please wait while we ${action} this ${itemType}.`,
      }) : null

    // Make actual API call to the server
    const response = await fetch(`/api/${itemType}s/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to ${action} ${itemType}`);
    }

    // Clear loading toast if it exists
    if (loadingToast) {
      toast({
        id: loadingToast.id,
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} successful`,
        description: getSuccessMessage(action, itemType, item),
        variant: "success",
      })
    }

    // Show notification based on action
    triggerActivityNotification(
      getActivityType(action), 
      itemType, 
      getNotificationMessage(action, itemType, item)
    )

    // Call the callback function if provided
    if (callback) {
      callback({ success: true, action, itemType, item })
    }

    return { success: true }
  } catch (error) {
    console.error(`Error in ${action} ${itemType}:`, error)
    
    // Show error toast
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} failed`,
      description: `There was an error while trying to ${action} this ${itemType}.`,
      variant: "destructive",
    })

    // Call the callback function if provided
    if (callback) {
      callback({ success: false, error, action, itemType, item })
    }

    return { success: false, error }
  }
}