"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const notificationVariants = cva("fixed z-50 flex items-center gap-3 rounded-lg p-4 shadow-lg border", {
  variants: {
    position: {
      "top-right": "top-4 right-4",
      "top-left": "top-4 left-4",
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    },
    variant: {
      default: "bg-background text-foreground border-border",
      success: "bg-green-50 text-green-900 border-green-200",
      warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
      destructive: "bg-red-50 text-red-900 border-red-200",
      info: "bg-blue-50 text-blue-900 border-blue-200",
      activity: "bg-gradient-to-r from-pink-50 to-purple-50 text-pink-900 border-pink-200",
    },
  },
  defaultVariants: {
    position: "top-right",
    variant: "default",
  },
})

export interface NotificationProps extends VariantProps<typeof notificationVariants> {
  title: string
  description?: string
  icon?: React.ReactNode
  duration?: number
  onClose?: () => void
}

export function PopupNotification({
  title,
  description,
  icon,
  position,
  variant,
  duration = 5000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(notificationVariants({ position, variant }))}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          role="alert"
        >
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              if (onClose) onClose()
            }}
            className="flex-shrink-0 rounded-full p-1 hover:bg-muted/20"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Notification manager to handle multiple notifications
type NotificationItem = NotificationProps & { id: string }

let listeners: ((notifications: NotificationItem[]) => void)[] = []
let notifications: NotificationItem[] = []

function emitChange() {
  listeners.forEach((listener) => listener(notifications))
}

export const notificationManager = {
  subscribe(listener: (notifications: NotificationItem[]) => void) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  show(notification: Omit<NotificationProps, "onClose">) {
    const id = Math.random().toString(36).substring(2, 9)
    notifications = [
      ...notifications,
      {
        ...notification,
        id,
        onClose: () => {
          notifications = notifications.filter((n) => n.id !== id)
          emitChange()
        },
      },
    ]
    emitChange()
    return id
  },
  dismiss(id: string) {
    notifications = notifications.filter((n) => n.id !== id)
    emitChange()
  },
  dismissAll() {
    notifications = []
    emitChange()
  },
}

export function NotificationContainer() {
  const [items, setItems] = useState<NotificationItem[]>([])

  useEffect(() => {
    return notificationManager.subscribe((notifications) => {
      setItems(notifications)
    })
  }, [])

  return (
    <>
      {items.map((notification) => (
        <PopupNotification key={notification.id} {...notification} />
      ))}
    </>
  )
}
