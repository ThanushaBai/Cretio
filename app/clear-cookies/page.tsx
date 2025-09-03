"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ClearCookiesPage() {
  const [cleared, setCleared] = useState(false)

  const clearAllCookies = () => {
    // Get all cookies
    const cookies = document.cookie.split(";")
    
    // For each cookie, set its expiration date to a past date
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
    
    setCleared(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Cookie Cleaner</CardTitle>
          <CardDescription>Use this utility to clear all cookies for this site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            If you're having trouble with authentication or being redirected unexpectedly, clearing your cookies may help.
          </p>
          
          {cleared ? (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-center">
              <p className="font-medium text-green-800 dark:text-green-200">Cookies cleared successfully!</p>
            </div>
          ) : (
            <Button onClick={clearAllCookies} className="w-full">
              Clear All Cookies
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button variant="outline">Go to HomeHome</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}