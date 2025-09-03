# Action Handlers for Dashboard Features

This document explains how to use the action handlers to make the action buttons functional in the dashboard features.

## Overview

The action handlers provide a standardized way to handle user actions across different features in the dashboard. They handle:

- Showing loading and success/error toasts
- Triggering activity notifications
- Providing a consistent interface for all actions
- Simulating API calls with a delay

## How to Use

### 1. Import the Action Handler

In your feature page, import the action handler:

```javascript
import { handleAction } from "@/lib/action-handlers"
```

Or use dynamic import to reduce initial load time:

```javascript
import("@/lib/action-handlers").then(({ handleAction }) => {
  // Use handleAction here
})
```

### 2. Call the Action Handler

When a user clicks an action button, call the action handler:

```javascript
handleAction(action, itemType, item, callback)
```

Parameters:
- `action`: The action being performed (e.g., "create", "edit", "delete")
- `itemType`: The type of item being acted upon (e.g., "user", "agency", "funnel")
- `item`: The item data object
- `callback`: Optional callback function that receives the result

Example:

```javascript
handleAction("edit", "user", user, (result) => {
  if (result.success) {
    // Update the UI or perform additional actions
  }
})
```

### 3. Feature-Specific Action Handlers

For more complex features, use the feature-specific action handlers:

- Users: Import from `@/lib/action-handlers`
- Agencies: Import from `@/lib/action-handlers`
- Funnels: Import from `@/lib/action-handlers`
- Media: Import from `@/app/dashboard/media/actions`
- CRM: Import from `@/app/dashboard/crm/actions`
- Productivity: Import from `@/app/dashboard/productivity/actions`

Example for Media:

```javascript
import { handleFileOperation } from "@/app/dashboard/media/actions"

handleFileOperation("preview", file, () => {
  setPreviewFile(file)
  setIsPreviewOpen(true)
})
```

## Action Types

Common action types include:

- `create`: Create a new item
- `edit`/`update`: Edit an existing item
- `delete`: Delete an item
- `view`: View item details
- `preview`: Preview an item (for media, funnels)
- `download`: Download an item (for media)
- `duplicate`: Duplicate an item (for funnels, templates)

## Customizing Notifications

The action handlers automatically generate appropriate notifications based on the action and item type. If you need custom notifications, you can provide them in the callback:

```javascript
handleAction("custom-action", "user", user, (result) => {
  if (result.success) {
    // Custom notification
    toast({
      title: "Custom action completed",
      description: "Your custom action was successful",
    })
  }
})
```

## Error Handling

The action handlers include built-in error handling. If an error occurs, they will:

1. Log the error to the console
2. Show an error toast
3. Call the callback with `success: false` and the error

You can add additional error handling in the callback:

```javascript
handleAction("edit", "user", user, (result) => {
  if (!result.success) {
    // Additional error handling
    console.error("Failed to edit user:", result.error)
  }
})
```# Action Handlers for Dashboard Features

This document explains how to use the action handlers to make the action buttons functional in the dashboard features.

## Overview

The action handlers provide a standardized way to handle user actions across different features in the dashboard. They handle:

- Showing loading and success/error toasts
- Triggering activity notifications
- Providing a consistent interface for all actions
- Simulating API calls with a delay

## How to Use

### 1. Import the Action Handler

In your feature page, import the action handler:

```javascript
import { handleAction } from "@/lib/action-handlers"
```

Or use dynamic import to reduce initial load time:

```javascript
import("@/lib/action-handlers").then(({ handleAction }) => {
  // Use handleAction here
})
```

### 2. Call the Action Handler

When a user clicks an action button, call the action handler:

```javascript
handleAction(action, itemType, item, callback)
```

Parameters:
- `action`: The action being performed (e.g., "create", "edit", "delete")
- `itemType`: The type of item being acted upon (e.g., "user", "agency", "funnel")
- `item`: The item data object
- `callback`: Optional callback function that receives the result

Example:

```javascript
handleAction("edit", "user", user, (result) => {
  if (result.success) {
    // Update the UI or perform additional actions
  }
})
```

### 3. Feature-Specific Action Handlers

For more complex features, use the feature-specific action handlers:

- Users: Import from `@/lib/action-handlers`
- Agencies: Import from `@/lib/action-handlers`
- Funnels: Import from `@/lib/action-handlers`
- Media: Import from `@/app/dashboard/media/actions`
- CRM: Import from `@/app/dashboard/crm/actions`
- Productivity: Import from `@/app/dashboard/productivity/actions`

Example for Media:

```javascript
import { handleFileOperation } from "@/app/dashboard/media/actions"

handleFileOperation("preview", file, () => {
  setPreviewFile(file)
  setIsPreviewOpen(true)
})
```

## Action Types

Common action types include:

- `create`: Create a new item
- `edit`/`update`: Edit an existing item
- `delete`: Delete an item
- `view`: View item details
- `preview`: Preview an item (for media, funnels)
- `download`: Download an item (for media)
- `duplicate`: Duplicate an item (for funnels, templates)

## Customizing Notifications

The action handlers automatically generate appropriate notifications based on the action and item type. If you need custom notifications, you can provide them in the callback:

```javascript
handleAction("custom-action", "user", user, (result) => {
  if (result.success) {
    // Custom notification
    toast({
      title: "Custom action completed",
      description: "Your custom action was successful",
    })
  }
})
```

## Error Handling

The action handlers include built-in error handling. If an error occurs, they will:

1. Log the error to the console
2. Show an error toast
3. Call the callback with `success: false` and the error

You can add additional error handling in the callback:

```javascript
handleAction("edit", "user", user, (result) => {
  if (!result.success) {
    // Additional error handling
    console.error("Failed to edit user:", result.error)
  }
})
```