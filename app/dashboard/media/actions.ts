"use client"

import { handleAction } from "@/lib/action-handlers"

// Media file actions
export const handleFileOperation = async (
  action: string,
  file: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "media", file, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Folder actions
export const handleFolderOperation = async (
  action: string,
  folder: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "folder", folder, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Helper function to map specific media actions to standard action types
const mapActionType = (action: string): string => {
  switch (action) {
    case "preview":
    case "view":
      return "view"
    case "rename":
      return "update"
    case "move":
      return "update"
    case "download":
      return "download"
    case "delete":
      return "delete"
    case "star":
    case "unstar":
      return "update"
    case "share":
      return "share"
    case "upload":
      return "create"
    case "createFolder":
      return "create"
    default:
      return action;
  }
};