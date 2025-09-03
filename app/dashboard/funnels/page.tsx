"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowUpDown,
  ChevronRight,
  Copy,
  Edit,
  Eye,
  FileText,
  Filter,
  Globe,
  LineChart,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Trash,
  UserPlus,
  Check,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  Lock,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { FunnelChartComponent } from "@/components/funnel-chart"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data
const funnels = [
  {
    id: "funnel-1",
    name: "Lead Generation Funnel",
    type: "Lead Generation",
    pages: 4,
    status: "Published",
    visitors: 1245,
    conversions: 187,
    conversionRate: "15.0%",
    lastUpdated: "Mar 15, 2025",
  },
  {
    id: "funnel-2",
    name: "Product Launch Funnel",
    type: "Sales",
    pages: 6,
    status: "Published",
    visitors: 2876,
    conversions: 432,
    conversionRate: "15.0%",
    lastUpdated: "Mar 12, 2025",
  },
  {
    id: "funnel-3",
    name: "Webinar Registration",
    type: "Webinar",
    pages: 3,
    status: "Draft",
    visitors: 0,
    conversions: 0,
    conversionRate: "0.0%",
    lastUpdated: "Mar 10, 2025",
  },
  {
    id: "funnel-4",
    name: "Free Trial Signup",
    type: "Lead Generation",
    pages: 2,
    status: "Published",
    visitors: 987,
    conversions: 124,
    conversionRate: "12.6%",
    lastUpdated: "Mar 8, 2025",
  },
  {
    id: "funnel-5",
    name: "E-book Download",
    type: "Lead Magnet",
    pages: 2,
    status: "Published",
    visitors: 1543,
    conversions: 342,
    conversionRate: "22.2%",
    lastUpdated: "Mar 5, 2025",
  },
]

const templates = [
  {
    id: "template-1",
    name: "Lead Generation",
    description: "Perfect for capturing leads with a multi-step form",
    pages: 3,
    category: "Lead Generation",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Lead+Generation",
    coverImage: "/placeholder.svg?height=300&width=600&text=Lead+Generation+Template",
  },
  {
    id: "template-2",
    name: "Product Launch",
    description: "Showcase your new product with this sales funnel",
    pages: 5,
    category: "Sales",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Product+Launch",
    coverImage: "/placeholder.svg?height=300&width=600&text=Product+Launch+Template",
  },
  {
    id: "template-3",
    name: "Webinar Registration",
    description: "Get signups for your upcoming webinar",
    pages: 3,
    category: "Webinar",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Webinar+Registration",
    coverImage: "/placeholder.svg?height=300&width=600&text=Webinar+Registration+Template",
  },
  {
    id: "template-4",
    name: "Free Trial Signup",
    description: "Convert visitors into free trial users",
    pages: 2,
    category: "Lead Generation",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Free+Trial+Signup",
    coverImage: "/placeholder.svg?height=300&width=600&text=Free+Trial+Signup+Template",
  },
  {
    id: "template-5",
    name: "E-book Download",
    description: "Offer a free e-book in exchange for contact information",
    pages: 2,
    category: "Lead Magnet",
    thumbnail: "/placeholder.svg?height=120&width=200&text=E-book+Download",
    coverImage: "/placeholder.svg?height=300&width=600&text=E-book+Download+Template",
  },
  {
    id: "template-6",
    name: "Consultation Booking",
    description: "Book consultations or appointments with potential clients",
    pages: 4,
    category: "Service",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Consultation+Booking",
    coverImage: "/placeholder.svg?height=300&width=600&text=Consultation+Booking+Template",
  },
]

// Domain data
const domains = [
  {
    id: "domain-1",
    name: "example.com",
    status: "Active",
    ssl: "Secure",
    connectedFunnel: "Lead Generation Funnel",
    addedOn: "Mar 15, 2025",
  },
  {
    id: "domain-2",
    name: "webinar.example.com",
    status: "Active",
    ssl: "Secure",
    connectedFunnel: "Webinar Registration",
    addedOn: "Mar 10, 2025",
  },
]

// Add this data for the funnel chart
const websiteFunnelData = [
  { name: "Visitors", value: 6651 },
  { name: "Product Views", value: 4320 },
  { name: "Add to Cart", value: 2100 },
  { name: "Checkout", value: 1350 },
  { name: "Purchase", value: 1085 },
]

export default function FunnelsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isNewFunnelDialogOpen, setIsNewFunnelDialogOpen] = useState(false)
  const [newFunnel, setNewFunnel] = useState({
    name: "",
    type: "Lead Generation",
    template: "template-1",
  })

  // Domain state
  const [isNewDomainDialogOpen, setIsNewDomainDialogOpen] = useState(false)
  const [newDomain, setNewDomain] = useState({
    domain: "",
    connectedFunnel: "",
  })
  const [domainList, setDomainList] = useState(domains)
  const [selectedDomain, setSelectedDomain] = useState<any>(null)
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = useState(false)
  const [isVerifyDomainOpen, setIsVerifyDomainOpen] = useState(false)
  const [isDeleteDomainOpen, setIsDeleteDomainOpen] = useState(false)

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false)

  // Funnel state
  const [selectedFunnel, setSelectedFunnel] = useState<any>(null)
  const [editedFunnel, setEditedFunnel] = useState<any>(null)
  const [isEditFunnelDialogOpen, setIsEditFunnelDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false)
  const [isDeleteFunnelDialogOpen, setIsDeleteFunnelDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredFunnels = funnels.filter((funnel) => {
    const matchesSearch = funnel.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || funnel.status === statusFilter
    const matchesType = typeFilter === "all" || funnel.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleNewFunnelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewFunnel((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewFunnelSubmit = () => {
    if (!newFunnel.name) return

    // Create a new funnel object
    const funnelData = {
      id: `funnel-${Date.now()}`,
      name: newFunnel.name,
      type: newFunnel.type,
      pages: 1,
      status: "Draft",
      visitors: 0,
      conversions: 0,
      conversionRate: "0.0%",
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    // Add the new funnel to the funnels array
    funnels.push(funnelData)

    // Update the UI by forcing a re-render
    setSearchTerm(searchTerm + " ")
    setSearchTerm(searchTerm)

    toast({
      title: "Funnel created successfully",
      description: `${newFunnel.name} has been created and is ready to edit`,
    })

    setIsNewFunnelDialogOpen(false)
    setNewFunnel({
      name: "",
      type: "Lead Generation",
      template: "template-1",
    })
  }

  const handleNewDomainSubmit = () => {
    if (!newDomain.domain) return

    // Create a new domain object
    const domainData = {
      id: `domain-${Date.now()}`,
      name: newDomain.domain,
      status: "Pending",
      ssl: "Pending",
      connectedFunnel: newDomain.connectedFunnel || "None",
      addedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    // Add the new domain to the domains array
    setDomainList([...domainList, domainData])

    toast({
      title: "Domain added successfully",
      description: `${newDomain.domain} has been added to your domains`,
    })

    setIsNewDomainDialogOpen(false)
    setNewDomain({
      domain: "",
      connectedFunnel: "",
    })
  }

  // Domain action handlers
  const handleDomainSettings = (domain: any) => {
    setSelectedDomain(domain)
    setIsDomainSettingsOpen(true)
  }

  const handleVerifyDomain = (domain: any) => {
    setSelectedDomain(domain)
    setIsVerifyDomainOpen(true)
  }

  const handleDeleteDomain = (domain: any) => {
    setSelectedDomain(domain)
    setIsDeleteDomainOpen(true)
  }

  const confirmDeleteDomain = () => {
    if (!selectedDomain) return

    // Remove the domain from the domains array
    setDomainList(domainList.filter((d) => d.id !== selectedDomain.id))

    toast({
      title: "Domain deleted",
      description: `${selectedDomain.name} has been deleted successfully.`,
    })

    setIsDeleteDomainOpen(false)
  }

  // Template action handlers
  const handleTemplatePreview = (template: any) => {
    setSelectedTemplate(template)
    setIsTemplatePreviewOpen(true)
  }

  // Funnel action handlers
  const handleEditFunnel = (funnel: any) => {
    setSelectedFunnel(funnel)
    setEditedFunnel({ ...funnel })
    setIsEditFunnelDialogOpen(true)
  }

  const handlePreviewFunnel = (funnel: any) => {
    setSelectedFunnel(funnel)
    setIsPreviewDialogOpen(true)
  }

  const handleFunnelAnalytics = (funnel: any) => {
    setSelectedFunnel(funnel)
    setIsAnalyticsDialogOpen(true)
  }

  const handleDuplicateFunnel = (funnel: any) => {
    // Create a deep copy of the funnel
    const duplicatedFunnel = {
      ...funnel,
      id: `funnel-${Date.now()}`,
      name: `${funnel.name} (Copy)`,
      visitors: 0,
      conversions: 0,
      conversionRate: "0.0%",
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    // Add the duplicated funnel to the funnels array
    funnels.push(duplicatedFunnel)

    // Force a re-render
    setSearchTerm(searchTerm + " ")
    setSearchTerm(searchTerm)

    toast({
      title: "Funnel duplicated",
      description: `${funnel.name} has been duplicated successfully.`,
    })
  }

  const handleDeleteFunnel = (funnel: any) => {
    setSelectedFunnel(funnel)
    setIsDeleteFunnelDialogOpen(true)
  }

  const handleEditedFunnelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedFunnel((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleEditFunnelSubmit = () => {
    if (!editedFunnel || !editedFunnel.name) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the funnel index
      const funnelIndex = funnels.findIndex((f) => f.id === editedFunnel.id)

      if (funnelIndex !== -1) {
        // Update the funnel
        funnels[funnelIndex] = {
          ...editedFunnel,
          lastUpdated: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }
      }

      // Force a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Funnel updated",
        description: `${editedFunnel.name} has been updated successfully.`,
      })

      setIsLoading(false)
      setIsEditFunnelDialogOpen(false)
      setEditedFunnel(null)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Funnel & Website Builder</h1>
        <p className="text-muted-foreground">
          Create and manage sales funnels, landing pages, and websites for your business.
        </p>
      </div>

      <Tabs defaultValue="funnels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="funnels">My Funnels</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Funnels Tab */}
        <TabsContent value="funnels" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search funnels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
                <Dialog open={isNewFunnelDialogOpen} onOpenChange={setIsNewFunnelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Funnel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Funnel</DialogTitle>
                      <DialogDescription>Create a new funnel from scratch or use a template.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Funnel Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newFunnel.name}
                          onChange={handleNewFunnelChange}
                          placeholder="My Awesome Funnel"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Funnel Type</Label>
                        <Select
                          name="type"
                          value={newFunnel.type}
                          onValueChange={(value) => setNewFunnel((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                            <SelectItem value="Lead Magnet">Lead Magnet</SelectItem>
                            <SelectItem value="Service">Service</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="template">Template</Label>
                        <Select
                          name="template"
                          value={newFunnel.template}
                          onValueChange={(value) => setNewFunnel((prev) => ({ ...prev, template: value }))}
                        >
                          <SelectTrigger id="template">
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="blank">Blank Funnel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setIsNewFunnelDialogOpen(false)}>
                        Cancel
                      </Button>
                      <div className="flex gap-2">
                        <Button onClick={handleNewFunnelSubmit}>Create Funnel</Button>
                        <Button asChild>
                          <Link href="/dashboard/funnels/builder">Use Builder</Link>
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <div className="flex items-center gap-1">
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visitors</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFunnels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No funnels found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFunnels.map((funnel) => (
                      <TableRow key={funnel.id}>
                        <TableCell className="font-medium">{funnel.name}</TableCell>
                        <TableCell>{funnel.type}</TableCell>
                        <TableCell>{funnel.pages}</TableCell>
                        <TableCell>
                          <Badge variant={funnel.status === "Published" ? "default" : "secondary"}>
                            {funnel.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{funnel.visitors.toLocaleString()}</TableCell>
                        <TableCell>{funnel.conversions.toLocaleString()}</TableCell>
                        <TableCell>{funnel.conversionRate}</TableCell>
                        <TableCell>{funnel.lastUpdated}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleEditFunnel(funnel)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePreviewFunnel(funnel)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleFunnelAnalytics(funnel)}>
                                <LineChart className="mr-2 h-4 w-4" />
                                Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateFunnel(funnel)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFunnel(funnel)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search templates..." className="w-full md:w-[300px]" />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <span className="text-xs text-muted-foreground">{template.pages} pages</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleTemplatePreview(template)}>
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Preview
                        </Button>
                        <Button size="sm">Use Template</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Domains Tab */}
        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Domains</CardTitle>
              <CardDescription>Manage your custom domains and subdomains.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Your Domains</h3>
                  <Button onClick={() => setIsNewDomainDialogOpen(true)}>
                    <Globe className="mr-2 h-4 w-4" />
                    Add Domain
                  </Button>
                  <Dialog open={isNewDomainDialogOpen} onOpenChange={setIsNewDomainDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Domain</DialogTitle>
                        <DialogDescription>Enter the details of your domain.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="domain">Domain Name</Label>
                          <Input
                            id="domain"
                            value={newDomain.domain}
                            onChange={(e) => setNewDomain((prev) => ({ ...prev, domain: e.target.value }))}
                            placeholder="example.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="connectedFunnel">Connected Funnel</Label>
                          <Select
                            value={newDomain.connectedFunnel}
                            onValueChange={(value) => setNewDomain((prev) => ({ ...prev, connectedFunnel: value }))}
                          >
                            <SelectTrigger id="connectedFunnel">
                              <SelectValue placeholder="Select funnel" />
                            </SelectTrigger>
                            <SelectContent>
                              {funnels.map((funnel) => (
                                <SelectItem key={funnel.id} value={funnel.name}>
                                  {funnel.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="None">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewDomainDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleNewDomainSubmit}>Add Domain</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Domain</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>SSL</TableHead>
                        <TableHead>Connected Funnel</TableHead>
                        <TableHead>Added On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {domainList.map((domain) => (
                        <TableRow key={domain.id}>
                          <TableCell className="font-medium">{domain.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant={domain.status === "Active" ? "default" : "secondary"}
                              className={domain.status === "Pending" ? "bg-yellow-500/10 text-yellow-500" : ""}
                            >
                              {domain.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                domain.ssl === "Secure"
                                  ? "bg-green-500/10 text-green-500"
                                  : domain.ssl === "Pending"
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : ""
                              }
                            >
                              {domain.ssl}
                            </Badge>
                          </TableCell>
                          <TableCell>{domain.connectedFunnel}</TableCell>
                          <TableCell>{domain.addedOn}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleDomainSettings(domain)}>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleVerifyDomain(domain)}>
                                  <Check className="mr-2 h-4 w-4" />
                                  Verify Domain
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Refresh SSL
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteDomain(domain)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funnel Analytics</CardTitle>
              <CardDescription>Track performance and conversion metrics for your funnels.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Performance Overview</h3>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FunnelChartComponent
                  title="Website Conversion Funnel"
                  description="Track visitor flow through your sales funnel"
                  data={websiteFunnelData}
                  dataKey="value"
                  nameKey="name"
                  colors={["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"]}
                />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                      <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6,651</div>
                      <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,085</div>
                      <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">16.3%</div>
                      <p className="text-xs text-muted-foreground">+1.8% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Value</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$89.42</div>
                      <p className="text-xs text-muted-foreground">+$4.65 from last month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Top Performing Funnels</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Funnel</TableHead>
                          <TableHead>Visitors</TableHead>
                          <TableHead>Conversions</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Lead Generation Funnel</TableCell>
                          <TableCell>1,245</TableCell>
                          <TableCell>187</TableCell>
                          <TableCell>15.0%</TableCell>
                          <TableCell>$16,830</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Product Launch Funnel</TableCell>
                          <TableCell>2,876</TableCell>
                          <TableCell>432</TableCell>
                          <TableCell>15.0%</TableCell>
                          <TableCell>$38,880</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">E-book Download</TableCell>
                          <TableCell>1,543</TableCell>
                          <TableCell>342</TableCell>
                          <TableCell>22.2%</TableCell>
                          <TableCell>$0</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Funnel Dialog */}
      <Dialog open={isEditFunnelDialogOpen} onOpenChange={setIsEditFunnelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Funnel</DialogTitle>
            <DialogDescription>Update your funnel settings and details.</DialogDescription>
          </DialogHeader>
          {selectedFunnel && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Funnel Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editedFunnel?.name || ""}
                    onChange={handleEditedFunnelChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Funnel Type</Label>
                  <Select
                    name="type"
                    value={editedFunnel?.type || ""}
                    onValueChange={(value) => setEditedFunnel((prev: any) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Webinar">Webinar</SelectItem>
                      <SelectItem value="Lead Magnet">Lead Magnet</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleEditFunnelSubmit} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Funnel Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Funnel Preview</DialogTitle>
            <DialogDescription>
              {selectedFunnel?.name} - {selectedFunnel?.pages} pages
            </DialogDescription>
          </DialogHeader>
          {selectedFunnel && (
            <div className="py-4">
              <div className="rounded-lg border">
                <div className="flex items-center border-b bg-muted/50 px-4 py-2">
                  <div className="flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                    <div className="flex h-6 w-72 items-center justify-center rounded-full bg-muted px-3 text-xs">
                      https://{selectedFunnel.name.toLowerCase().replace(/\s+/g, "-")}.example.com
                    </div>
                  </div>
                </div>
                <div className="h-[500px] w-full bg-background overflow-auto">
                  {/* Actual funnel content instead of placeholders */}
                  <div className="mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-primary"></div>
                        <span className="font-bold text-lg">BrandName</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <a href="#" className="text-sm font-medium hover:underline">
                          Features
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline">
                          Pricing
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline">
                          About
                        </a>
                        <Button size="sm">Sign Up</Button>
                      </div>
                    </div>

                    {/* Hero Section */}
                    <div className="py-16 px-4 text-center">
                      <h1 className="text-4xl font-bold mb-4">Transform Your Business with Our Solution</h1>
                      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        The all-in-one platform that helps you grow, manage, and scale your business efficiently.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button size="lg" className="px-8">
                          Get Started
                        </Button>
                        <Button size="lg" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    </div>

                    {/* Features Section */}
                    <div className="py-16 px-4">
                      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold mb-2">Cost Effective</h3>
                          <p className="text-muted-foreground">Save money and time with our affordable solutions.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                          <p className="text-muted-foreground">
                            Your data is always protected with our secure platform.
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                          <p className="text-muted-foreground">Our team is always available to help you succeed.</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="py-16 px-4 bg-muted/30 text-center">
                      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have transformed their business.
                      </p>
                      <Button size="lg" className="px-8">
                        Sign Up Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/funnels/builder" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Builder
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsPreviewDialogOpen(false)
                      handleEditFunnel(selectedFunnel)
                    }}
                  >
                    Edit Funnel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={isTemplatePreviewOpen} onOpenChange={setIsTemplatePreviewOpen}>
        <DialogContent className="sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.name} - {selectedTemplate?.pages} pages
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="py-4">
              <div className="rounded-lg border overflow-hidden">
                <img
                  src={selectedTemplate.coverImage || "/placeholder.svg"}
                  alt={selectedTemplate.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Template Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Optimized for {selectedTemplate.category} campaigns</li>
                  <li>Includes {selectedTemplate.pages} pre-designed pages</li>
                  <li>Mobile responsive design</li>
                  <li>Customizable elements and sections</li>
                  <li>Built-in form handling and validation</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setIsTemplatePreviewOpen(false)}>
                  Close
                </Button>
                <Button>Use This Template</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Funnel Analytics</DialogTitle>
            <DialogDescription>Performance metrics for {selectedFunnel?.name}</DialogDescription>
          </DialogHeader>
          {selectedFunnel && (
            <div className="py-4">
              <div className="mb-6 grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Visitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedFunnel.visitors.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedFunnel.conversions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+8.7% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedFunnel.conversionRate}</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$67.32</div>
                    <p className="text-xs text-muted-foreground">+4.5% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mb-6 rounded-lg border p-4">
                <h3 className="mb-4 text-sm font-medium">Visitor Flow</h3>
                <FunnelChartComponent
                  title=""
                  description=""
                  data={websiteFunnelData}
                  dataKey="value"
                  nameKey="name"
                  colors={["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"]}
                />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Funnel Dialog */}
      <Dialog open={isDeleteFunnelDialogOpen} onOpenChange={setIsDeleteFunnelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Funnel</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {selectedFunnel && (
            <div className="py-4">
              <p>
                Are you sure you want to delete <strong>{selectedFunnel.name}</strong>?
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This will permanently remove the funnel and all associated data.
              </p>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsDeleteFunnelDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Remove the funnel from the funnels array
                    const updatedFunnels = funnels.filter((f) => f.id !== selectedFunnel.id)

                    // Replace the funnels array with the updated one
                    funnels.splice(0, funnels.length, ...updatedFunnels)

                    // Force a re-render
                    setSearchTerm(searchTerm + " ")
                    setSearchTerm(searchTerm)

                    toast({
                      title: "Funnel deleted",
                      description: `${selectedFunnel.name} has been deleted successfully.`,
                    })

                    setIsDeleteFunnelDialogOpen(false)
                  }}
                >
                  Delete Funnel
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Domain Settings Dialog */}
      <Dialog open={isDomainSettingsOpen} onOpenChange={setIsDomainSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Domain Settings</DialogTitle>
            <DialogDescription>Configure settings for {selectedDomain?.name}</DialogDescription>
          </DialogHeader>
          {selectedDomain && (
            <div className="py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="connected-funnel">Connected Funnel</Label>
                  <Select defaultValue={selectedDomain.connectedFunnel}>
                    <SelectTrigger id="connected-funnel">
                      <SelectValue placeholder="Select funnel" />
                    </SelectTrigger>
                    <SelectContent>
                      {funnels.map((funnel) => (
                        <SelectItem key={funnel.id} value={funnel.name}>
                          {funnel.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="domain-privacy">Domain Privacy</Label>
                  <Select defaultValue="public">
                    <SelectTrigger id="domain-privacy">
                      <SelectValue placeholder="Select privacy setting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ssl-enabled">SSL Certificate</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Active
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-500" />
                      <span>SSL certificate is active and valid until Apr 15, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsDomainSettingsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Settings saved",
                      description: `Settings for ${selectedDomain.name} have been updated.`,
                    })
                    setIsDomainSettingsOpen(false)
                  }}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Verify Domain Dialog */}
      <Dialog open={isVerifyDomainOpen} onOpenChange={setIsVerifyDomainOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Domain</DialogTitle>
            <DialogDescription>Follow these steps to verify ownership of {selectedDomain?.name}</DialogDescription>
          </DialogHeader>
          {selectedDomain && (
            <div className="py-4">
              <div className="rounded-md border p-4 bg-muted/30 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Domain Verification Required</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  To use this domain with our service, you need to verify that you own it by adding a DNS record.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Step 1: Add a TXT Record</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add the following TXT record to your domain's DNS settings:
                  </p>
                  <div className="rounded-md bg-muted p-3 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span>TXT @ verify-domain={selectedDomain.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 gap-1"
                        onClick={() => {
                          navigator.clipboard.writeText(`verify-domain=${selectedDomain.id}`)
                          toast({
                            title: "Copied to clipboard",
                            description: "TXT record has been copied to your clipboard.",
                          })
                        }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-xs">Copy</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Step 2: Verify the Record</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    After adding the TXT record, click the button below to verify. DNS changes may take up to 24-48
                    hours to propagate.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Verification in progress",
                        description: "We're checking your DNS records. This may take a few moments.",
                      })

                      // Simulate verification process
                      setTimeout(() => {
                        // Update domain status
                        const updatedDomains = domainList.map((d) => {
                          if (d.id === selectedDomain.id) {
                            return { ...d, status: "Active", ssl: "Secure" }
                          }
                          return d
                        })

                        setDomainList(updatedDomains)

                        toast({
                          title: "Domain verified",
                          description: `${selectedDomain.name} has been successfully verified.`,
                        })

                        setIsVerifyDomainOpen(false)
                      }, 2000)
                    }}
                  >
                    Verify Domain
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Domain Dialog */}
      <AlertDialog open={isDeleteDomainOpen} onOpenChange={setIsDeleteDomainOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Domain</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the domain from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedDomain && (
            <div className="py-2">
              <p className="mb-2">
                Are you sure you want to delete <strong>{selectedDomain.name}</strong>?
              </p>
              <p className="text-sm text-muted-foreground">
                Any funnels connected to this domain will no longer be accessible through this domain.
              </p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteDomain}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
