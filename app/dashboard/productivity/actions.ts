"use client"

import { handleAction } from "@/lib/action-handlers"

// Task actions
export const handleTaskOperation = async (
  action: string,
  task: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "task", task, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Project actions
export const handleProjectOperation = async (
  action: string,
  project: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "project", project, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Note actions
export const handleNoteOperation = async (
  action: string,
  note: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "note", note, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Helper function to map specific productivity actions to standard action types
const mapActionType = (action: string): string => {
  switch (action) {
    case "view":
    case "details":
      return "view"
    case "edit":
    case "update":
      return "update"
    case "delete":
    case "remove":
      return "delete"
    case "add":
    case "create":
      return "create"
    case "complete":
    case "mark-complete":
      return "update"
    case "move":
    case "change-status":
      return "update"
    case "assign":
      return "update"
    default:
      return action
  }
}"use client"

import { handleAction } from "@/lib/action-handlers"

// Task actions
export const handleTaskOperation = async (
  action: string,
  task: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "task", task, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Project actions
export const handleProjectOperation = async (
  action: string,
  project: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "project", project, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Note actions
export const handleNoteOperation = async (
  action: string,
  note: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "note", note, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Helper function to map specific productivity actions to standard action types
const mapActionType = (action: string): string => {
  switch (action) {
    case "view":
    case "details":
      return "view"
    case "edit":
    case "update":
      return "update"
    case "delete":
    case "remove":
      return "delete"
    case "add":
    case "create":
      return "create"
    case "complete":
    case "mark-complete":
      return "update"
    case "move":
    case "change-status":
      return "update"
    case "assign":
      return "update"
    default:
      return action
  }
}