"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  Building2,
  ChevronDown,
  CreditCard,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserPlus,
  Users,
  X,
  LayoutTemplate,
  CheckSquare,
  ShieldAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logout } from "@/app/actions/auth"
import { useToast } from "@/hooks/use-toast"
import { ActivityTracker } from "@/components/activity-tracker"
import { cn } from "@/lib/utils"
import { triggerActivityNotification } from "@/components/activity-notification-provider"

// Add a type for user data
type UserData = {
  id: string
  username: string
  email: string
  agencyName: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true)
        
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
          // We're in SSR, don't try to access localStorage yet
          return
        }
        
        const storedUserData = localStorage.getItem("userData")
        if (storedUserData) {
          try {
            setUserData(JSON.parse(storedUserData))
          } catch (error) {
            console.error("Failed to parse user data:", error)
            // If parsing fails, redirect to login
            router.push("/auth/login")
          }
        } else {
          console.log("No user data found in localStorage, redirecting to login")
          router.push("/auth/login")
        }
      } catch (error) {
        // This catches errors like localStorage not being available
        console.error("Error accessing localStorage:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [router])

  // Trigger notification when route changes
  useEffect(() => {
    const currentRoute = routes.find((route) => route.href === pathname)
    if (currentRoute) {
      triggerActivityNotification("view", "system", `Navigated to ${currentRoute.label} page`)
    }
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem("userData")
      router.push("/")
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      })
    }
  }

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "User Management",
      icon: Users,
      href: "/dashboard/users",
      active: pathname === "/dashboard/users",
    },
    {
      label: "Agencies",
      icon: Building2,
      href: "/dashboard/agencies",
      active: pathname === "/dashboard/agencies",
    },
    {
      label: "Funnels",
      icon: LayoutTemplate,
      href: "/dashboard/funnels",
      active: pathname === "/dashboard/funnels",
    },
    {
      label: "Media Library",
      icon: ImageIcon,
      href: "/dashboard/media",
      active: pathname === "/dashboard/media",
    },
    {
      label: "CRM",
      icon: UserPlus,
      href: "/dashboard/crm",
      active: pathname === "/dashboard/crm",
    },
    {
      label: "Productivity",
      icon: CheckSquare,
      href: "/dashboard/productivity",
      active: pathname === "/dashboard/productivity",
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-background">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b px-2 py-4">
                    <Link href="/" className="font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400 text-lg">
                        Cretio
                      </span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <nav className="flex-1 overflow-auto py-4">
                    <div className="space-y-1 px-2">
                      {routes.map((route) => (
                        <Link key={route.href} href={route.href} onClick={() => setIsSidebarOpen(false)}>
                          <Button variant={route.active ? "secondary" : "ghost"} className="w-full justify-start">
                            <route.icon className="mr-2 h-5 w-5" />
                            {route.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="font-bold md:text-lg md:text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400 text-xl md:text-2xl">
                Cretio
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Settings updated</p>
                      <p className="text-xs text-muted-foreground">Your account settings were updated successfully.</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">New user added</p>
                      <p className="text-xs text-muted-foreground">A new user was added to your organization.</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">File uploaded</p>
                      <p className="text-xs text-muted-foreground">
                        Your file was uploaded successfully to the media library.
                      </p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Billing updated</p>
                      <p className="text-xs text-muted-foreground">Your subscription was renewed successfully.</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" className="w-full">
                    View all notifications
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {userData?.username ? userData.username.substring(0, 2).toUpperCase() : "TH"}
                    </span>
                  </div>
                  <div className="hidden md:block text-sm font-medium">{userData?.username || "Thanusha"}</div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {userData ? (
                    <div className="flex flex-col space-y-1">
                      <p>{userData.username}</p>
                      <p className="text-xs text-muted-foreground">{userData.email}</p>
                      <p className="text-xs text-muted-foreground">{userData.agencyName}</p>
                    </div>
                  ) : (
                    "My Account"
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <div className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-card/50 backdrop-blur-sm md:block">
          <nav className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button variant={route.active ? "secondary" : "ghost"} className="w-full justify-start">
                  <route.icon className="mr-2 h-5 w-5" />
                  {route.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
      <ActivityTracker 
        userId={userData?.id} 
        userEmail={userData?.email} 
      />
    </div>
  )
}

