"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Search, Building2, BuildingIcon } from "lucide-react"
import type { ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { triggerActivityNotification } from "@/components/activity-notification-provider"

interface Agency {
  id: string
  name: string
  email: string
  plan: string
  status: 'active' | 'inactive' | 'suspended'
  createdAt: Date
  lastLogin: Date | null
}

// Initial agency data
const initialAgencies: Agency[] = [
  {
    id: "1",
    name: "Digital Marketing Co",
    email: "contact@digitalmarketing.com",
    plan: "Pro",
    status: "active",
    createdAt: new Date(2023, 0, 15),
    lastLogin: new Date(2023, 3, 10),
  },
  {
    id: "2",
    name: "Web Design Agency",
    email: "info@webdesign.com",
    plan: "Basic",
    status: "active",
    createdAt: new Date(2023, 1, 20),
    lastLogin: new Date(2023, 3, 12),
  },
  {
    id: "3",
    name: "Creative Solutions",
    email: "hello@creative.com",
    plan: "Enterprise",
    status: "inactive",
    createdAt: new Date(2023, 2, 5),
    lastLogin: null,
  },
]

interface NewAgency {
  name: string
  email: string
  plan: string
  status: 'active' | 'inactive' | 'suspended'
}

export default function AgenciesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddAgencyDialogOpen, setIsAddAgencyDialogOpen] = useState(false)
  const [newAgency, setNewAgency] = useState<NewAgency>({
    name: "",
    email: "",
    plan: "Basic",
    status: "active",
  })
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies) // <-- use state for agencies
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>(initialAgencies)

  // Filter agencies based on search query
  useEffect(() => {
    const filtered = agencies.filter((agency) =>
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.plan.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredAgencies(filtered)
  }, [searchQuery, agencies]) // <-- depend on agencies too

  // Handle adding a new agency
  const handleAddAgency = () => {
    const newAgencyObj: Agency = {
      ...newAgency,
      id: (agencies.length + 1).toString(),
      createdAt: new Date(),
      lastLogin: null,
    }
    setAgencies([newAgencyObj, ...agencies]) // <-- add to state
    triggerActivityNotification("create", "agency", `Created new agency: ${newAgency.name} (${newAgency.email})`)
    setNewAgency({
      name: "",
      email: "",
      plan: "Basic",
      status: "active",
    })
    setIsAddAgencyDialogOpen(false)
  }

  // Handle agency actions
  const handleAgencyAction = (action: string, agency: Agency) => {
    import("@/lib/action-handlers").then(({ handleAction }) => {
      handleAction(action, "agency", agency).then((result) => {
        if (result.success) {
          if (action === "delete") {
            setAgencies(agencies.filter(a => a.id !== agency.id)) // <-- remove from state
          } else if (action === "edit" || action === "plan") {
            setAgencies(agencies.map(a => a.id === agency.id ? { ...a, ...result.item } : a)) // <-- update in state
          }
        }
      })
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Agency Management</h1>
        <p className="text-muted-foreground">Manage your platform agencies and their subscriptions.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agencies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddAgencyDialogOpen} onOpenChange={setIsAddAgencyDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Add Agency</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agency</DialogTitle>
              <DialogDescription>Add a new agency to your platform.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Agency Name</Label>
                <Input
                  id="name"
                  placeholder="Digital Marketing Co"
                  value={newAgency.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewAgency({ ...newAgency, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@agency.com"
                  value={newAgency.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewAgency({ ...newAgency, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={newAgency.plan} onValueChange={(value) => setNewAgency({ ...newAgency, plan: value })}>
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newAgency.status} 
                    onValueChange={(value: 'active' | 'inactive' | 'suspended') => setNewAgency({ ...newAgency, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAgencyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAgency}>Add Agency</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <BuildingIcon className="h-5 w-5 text-muted-foreground" />
            <span>Agencies</span>
          </CardTitle>
          <CardDescription>Manage your platform agencies and their subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgencies.map((agency) => (
                <TableRow key={agency.id}>
                  <TableCell className="font-medium">{agency.name}</TableCell>
                  <TableCell>{agency.email}</TableCell>
                  <TableCell>{agency.plan}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agency.status === "active" ? "success" : agency.status === "inactive" ? "outline" : "destructive"
                      }
                    >
                      {agency.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{agency.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{agency.lastLogin ? agency.lastLogin.toLocaleDateString() : "Never"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleAgencyAction("view", agency)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAgencyAction("edit", agency)}>Edit Agency</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAgencyAction("plan", agency)}>Change Plan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleAgencyAction("delete", agency)}>
                          Delete Agency
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
