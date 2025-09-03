import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ActivityNotificationProvider } from "@/components/activity-notification-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "B2B SaaS Platform",
  description: "A comprehensive B2B SaaS platform for agencies and businesses",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-0"></div>
            <div className="relative z-10">{children}</div>
          </div>
          <Toaster />
          <ActivityNotificationProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
