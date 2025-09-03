"use client"

import { handleAction } from "@/lib/action-handlers"

// CRM contact actions
export const handleContactOperation = async (
  action: string,
  contact: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "contact", contact, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Deal actions
export const handleDealOperation = async (
  action: string,
  deal: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "deal", deal, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

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

// Helper function to map specific CRM actions to standard action types
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
    case "email":
    case "send-email":
      return "email"
    case "call":
      return "call"
    case "move":
    case "change-stage":
      return "update"
    default:
      return action
  }
}"use client"

import { handleAction } from "@/lib/action-handlers"

// CRM contact actions
export const handleContactOperation = async (
  action: string,
  contact: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "contact", contact, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

// Deal actions
export const handleDealOperation = async (
  action: string,
  deal: any,
  callback?: (result: any) => void,
  additionalData?: any
) => {
  // Map the action to a standardized format
  const actionType = mapActionType(action)
  
  // Call the generic action handler
  return handleAction(actionType, "deal", deal, (result) => {
    if (callback) {
      callback({
        ...result,
        additionalData
      })
    }
  })
}

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

// Helper function to map specific CRM actions to standard action types
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
    case "email":
    case "send-email":
      return "email"
    case "call":
      return "call"
    case "move":
    case "change-stage":
      return "update"
    default:
      return action
  }
}