"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowUpDown,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  Trash,
  UserPlus,
  Edit,
  Users,
  CheckCheck,
  X,
} from "lucide-react"

// Add these imports to the existing imports section, after the existing imports
import { BarChart4, Copy, ExternalLink, FileText, Send } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { sendEmail, sendNotificationEmail } from "@/components/email-service"

// Mock data for leads
const leads = [
  {
    id: "lead-1",
    name: "Thanusha",
    email: "thanusha@example.com",
    phone: "+1 (555) 123-4567",
    source: "Contact Form",
    status: "New",
    assignedTo: "Alice Williams",
    assignedToEmail: "alice@example.com",
    createdAt: "Mar 15, 2025",
    lastActivity: "Mar 15, 2025",
    company: "Acme Inc.",
    position: "Marketing Director",
    address: "123 Main St, San Francisco, CA",
    notes: "Initial contact through website form. Interested in enterprise plan.",
    tags: ["enterprise", "marketing", "high-priority"],
    budget: "$15,000",
    timeline: "Q2 2025",
  },
  {
    id: "lead-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    source: "Landing Page",
    status: "Contacted",
    assignedTo: "Bob Johnson",
    assignedToEmail: "bob@example.com",
    createdAt: "Mar 14, 2025",
    lastActivity: "Mar 15, 2025",
    company: "Johnson & Co",
    position: "CEO",
    address: "456 Oak Ave, New York, NY",
    notes: "Follow-up call scheduled for next week. Showed interest in premium features.",
    tags: ["startup", "decision-maker"],
    budget: "$5,000",
    timeline: "Q1 2025",
  },
  {
    id: "lead-3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    source: "Referral",
    status: "Qualified",
    assignedTo: "Charlie Brown",
    assignedToEmail: "charlie@example.com",
    createdAt: "Mar 12, 2025",
    lastActivity: "Mar 14, 2025",
    company: "Brown Enterprises",
    position: "CTO",
    address: "789 Pine St, Chicago, IL",
    notes: "Referred by existing customer. Technical demo completed successfully.",
    tags: ["technical", "referral"],
    budget: "$10,000",
    timeline: "Q3 2025",
  },
  {
    id: "lead-4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    source: "Webinar",
    status: "Proposal",
    assignedTo: "Alice Williams",
    assignedToEmail: "alice@example.com",
    createdAt: "Mar 10, 2025",
    lastActivity: "Mar 13, 2025",
    company: "Davis Design",
    position: "Creative Director",
    address: "101 Elm St, Los Angeles, CA",
    notes: "Attended our webinar on design tools. Proposal sent for review.",
    tags: ["design", "proposal-sent"],
    budget: "$7,500",
    timeline: "Q2 2025",
  },
  {
    id: "lead-5",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    source: "Trade Show",
    status: "Negotiation",
    assignedTo: "Bob Johnson",
    assignedToEmail: "bob@example.com",
    createdAt: "Mar 8, 2025",
    lastActivity: "Mar 12, 2025",
    company: "Wilson Tech",
    position: "Procurement Manager",
    address: "202 Maple Dr, Seattle, WA",
    notes: "Met at TechExpo. In final negotiations about contract terms.",
    tags: ["enterprise", "negotiation"],
    budget: "$25,000",
    timeline: "Q1 2025",
  },
  {
    id: "lead-6",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "+1 (555) 678-9012",
    source: "Social Media",
    status: "Won",
    assignedTo: "Charlie Brown",
    assignedToEmail: "charlie@example.com",
    createdAt: "Mar 5, 2025",
    lastActivity: "Mar 10, 2025",
    company: "Taylor Solutions",
    position: "Operations Manager",
    address: "303 Cedar Ln, Austin, TX",
    notes: "Found us through LinkedIn. Contract signed and implementation in progress.",
    tags: ["operations", "closed-won"],
    budget: "$12,000",
    timeline: "Immediate",
  },
  {
    id: "lead-7",
    name: "Robert Anderson",
    email: "robert@example.com",
    phone: "+1 (555) 789-0123",
    source: "Email Campaign",
    status: "Lost",
    assignedTo: "Alice Williams",
    assignedToEmail: "alice@example.com",
    createdAt: "Mar 3, 2025",
    lastActivity: "Mar 8, 2025",
    company: "Anderson Group",
    position: "Finance Director",
    address: "404 Birch Rd, Denver, CO",
    notes: "Decided to go with a competitor due to budget constraints.",
    tags: ["finance", "closed-lost"],
    budget: "$8,000",
    timeline: "Q4 2025",
  },
]

// Mock data for activities
const activities = [
  {
    id: "activity-1",
    type: "Email",
    lead: "Thanusha",
    description: "Sent welcome email",
    user: "Alice Williams",
    date: "Mar 15, 2025",
    time: "10:30 AM",
  },
  {
    id: "activity-2",
    type: "Call",
    lead: "Sarah Johnson",
    description: "Discussed product features",
    user: "Bob Johnson",
    date: "Mar 15, 2025",
    time: "11:45 AM",
  },
  {
    id: "activity-3",
    type: "Meeting",
    lead: "Michael Brown",
    description: "Product demo",
    user: "Charlie Brown",
    date: "Mar 14, 2025",
    time: "2:00 PM",
  },
  {
    id: "activity-4",
    type: "Note",
    lead: "Emily Davis",
    description: "Sent proposal document",
    user: "Alice Williams",
    date: "Mar 13, 2025",
    time: "4:15 PM",
  },
  {
    id: "activity-5",
    type: "Email",
    lead: "David Wilson",
    description: "Follow-up on proposal",
    user: "Bob Johnson",
    date: "Mar 12, 2025",
    time: "9:30 AM",
  },
]

// Mock data for team members
const teamMembers = [
  {
    id: "user-1",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Sales Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-2",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Account Executive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Sales Representative",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-4",
    name: "Diana Miller",
    email: "diana@example.com",
    role: "Business Development",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-5",
    name: "Edward Smith",
    email: "edward@example.com",
    role: "Sales Representative",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Add this mock data after the existing mock data arrays (after "teamMembers" array)
// Mock data for email campaigns
const emailCampaigns = [
  {
    id: "campaign-1",
    name: "March Newsletter",
    status: "Sent",
    subject: "March Updates and New Features",
    sent: 1245,
    opens: 405,
    openRate: 32.5,
    clicks: 159,
    clickRate: 12.8,
    unsubscribes: 3,
    bounces: 12,
    date: "Mar 10, 2025",
    content:
      "<!DOCTYPE html><html><body><h1>March Newsletter</h1><p>Check out our latest features...</p></body></html>",
    sentTo: ["Qualified Leads", "Current Customers"],
    createdBy: "Alice Williams",
  },
  {
    id: "campaign-2",
    name: "Product Update",
    status: "Sent",
    subject: "Exciting New Product Features",
    sent: 2187,
    opens: 619,
    openRate: 28.3,
    clicks: 332,
    clickRate: 15.2,
    unsubscribes: 5,
    bounces: 18,
    date: "Mar 5, 2025",
    content:
      "<!DOCTYPE html><html><body><h1>Product Updates</h1><p>We've added several exciting new features...</p></body></html>",
    sentTo: ["All Subscribers"],
    createdBy: "Bob Johnson",
  },
  {
    id: "campaign-3",
    name: "Spring Promotion",
    status: "Draft",
    subject: "Spring Savings - Limited Time Offer",
    sent: 0,
    opens: 0,
    openRate: 0,
    clicks: 0,
    clickRate: 0,
    unsubscribes: 0,
    bounces: 0,
    date: "",
    content:
      "<!DOCTYPE html><html><body><h1>Spring Promotions</h1><p>Take advantage of our limited time offer...</p></body></html>",
    sentTo: ["Qualified Leads"],
    createdBy: "Charlie Brown",
  },
  {
    id: "campaign-4",
    name: "Webinar Invitation",
    status: "Scheduled",
    subject: "Join Our Exclusive Webinar",
    sent: 0,
    opens: 0,
    openRate: 0,
    clicks: 0,
    clickRate: 0,
    unsubscribes: 0,
    bounces: 0,
    date: "Mar 25, 2025",
    scheduledTime: "10:00 AM",
    content:
      "<!DOCTYPE html><html><body><h1>Webinar Invitation</h1><p>Join us for an exclusive webinar...</p></body></html>",
    sentTo: ["Marketing Prospects", "Partners"],
    createdBy: "Diana Miller",
  },
]

const statusColors: Record<string, string> = {
  New: "bg-blue-500",
  Contacted: "bg-purple-500",
  Qualified: "bg-amber-500",
  Proposal: "bg-orange-500",
  Negotiation: "bg-pink-500",
  Won: "bg-green-500",
  Lost: "bg-red-500",
}

// Add this data for the funnel chart
const leadFunnelData = [
  { name: "Leads", value: 1245 },
  { name: "Qualified", value: 880 },
  { name: "Meetings", value: 640 },
  { name: "Proposals", value: 320 },
  { name: "Closed", value: 190 },
]

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [isNewLeadDialogOpen, setIsNewLeadDialogOpen] = useState(false)
  const [isNewActivityDialogOpen, setIsNewActivityDialogOpen] = useState(false)
  const [isViewDetailDialogOpen, setIsViewDetailDialogOpen] = useState(false)
  const [isEditLeadDialogOpen, setIsEditLeadDialogOpen] = useState(false)
  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] = useState(false)
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false)
  const [isSendEmailDialogOpen, setIsSendEmailDialogOpen] = useState(false)
  const [isLogCallDialogOpen, setIsLogCallDialogOpen] = useState(false)
  const [isScheduleMeetingDialogOpen, setIsScheduleMeetingDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Contact Form",
  })
  const [newActivity, setNewActivity] = useState({
    type: "Email",
    lead: "",
    description: "",
  })
  const [editedLead, setEditedLead] = useState<any>(null)
  const [newStatus, setNewStatus] = useState("")
  const [selectedTeamMember, setSelectedTeamMember] = useState("")
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
    cc: [] as string[],
    attachments: [] as File[],
  })
  const [callData, setCallData] = useState({
    duration: "",
    notes: "",
    outcome: "Interested",
    followUp: false,
    followUpDate: "",
  })
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "30",
    location: "Virtual",
    notes: "",
    attendees: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add states for activity actions
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isViewActivityDialogOpen, setIsViewActivityDialogOpen] = useState(false)
  const [isEditActivityDialogOpen, setIsEditActivityDialogOpen] = useState(false)
  const [isDeleteActivityDialogOpen, setIsDeleteActivityDialogOpen] = useState(false)
  const [editedActivity, setEditedActivity] = useState<any>(null)

  // Add these states after the existing state declarations, around line 310
  // Add states for email campaign actions
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false)
  const [isViewCampaignDialogOpen, setIsViewCampaignDialogOpen] = useState(false)
  const [isEditCampaignDialogOpen, setIsEditCampaignDialogOpen] = useState(false)
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false)
  const [isDuplicateCampaignDialogOpen, setIsDuplicateCampaignDialogOpen] = useState(false)
  const [isDeleteCampaignDialogOpen, setIsDeleteCampaignDialogOpen] = useState(false)
  const [isSendCampaignDialogOpen, setIsSendCampaignDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [campaignSearchTerm, setCampaignSearchTerm] = useState("")
  const [campaignStatusFilter, setCampaignStatusFilter] = useState("all")
  const [campaignFilteredList, setCampaignFilteredList] = useState(emailCampaigns)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    subject: "",
    content: "",
    sentTo: [] as string[],
  })
  const [editedCampaign, setEditedCampaign] = useState<any>(null)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  const { toast } = useToast()

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  // Handle opening the view details dialog
  const handleViewDetails = (lead: any) => {
    setSelectedLead(lead)
    setIsViewDetailDialogOpen(true)
  }

  // Handle opening the edit lead dialog
  const handleEditLead = (lead: any) => {
    setSelectedLead(lead)
    setEditedLead({ ...lead })
    setIsEditLeadDialogOpen(true)
  }

  // Handle opening the change status dialog
  const handleChangeStatus = (lead: any) => {
    setSelectedLead(lead)
    setNewStatus(lead.status)
    setIsChangeStatusDialogOpen(true)
  }

  // Handle opening the reassign dialog
  const handleReassign = (lead: any) => {
    setSelectedLead(lead)
    setSelectedTeamMember(lead.assignedTo)
    setIsReassignDialogOpen(true)
  }

  // Handle opening the send email dialog
  const handleSendEmail = (lead: any) => {
    setSelectedLead(lead)
    setEmailData({
      subject: `Follow-up regarding ${lead.company}`,
      message: `Dear ${lead.name},\n\nThank you for your interest in our services. I wanted to follow up on our previous conversation about...\n\nBest regards,\nYour Name`,
      cc: [],
      attachments: [],
    })
    setIsSendEmailDialogOpen(true)
  }

  // Handle opening the log call dialog
  const handleLogCall = (lead: any) => {
    setSelectedLead(lead)
    setCallData({
      duration: "15",
      notes: "",
      outcome: "Interested",
      followUp: false,
      followUpDate: "",
    })
    setIsLogCallDialogOpen(true)
  }

  // Handle opening the schedule meeting dialog
  const handleScheduleMeeting = (lead: any) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)

    setSelectedLead(lead)
    setMeetingData({
      title: `Meeting with ${lead.name} from ${lead.company}`,
      date: tomorrow.toISOString().split("T")[0],
      time: "10:00",
      duration: "30",
      location: "Virtual",
      notes: "",
      attendees: [lead.email],
    })
    setIsScheduleMeetingDialogOpen(true)
  }

  // Handle opening the view activity details dialog
  const handleViewActivityDetails = (activity: any) => {
    setSelectedActivity(activity)
    setIsViewActivityDialogOpen(true)
  }

  // Handle opening the edit activity dialog
  const handleEditActivity = (activity: any) => {
    setSelectedActivity(activity)
    setEditedActivity({ ...activity })
    setIsEditActivityDialogOpen(true)
  }

  // Handle opening the delete activity dialog
  const handleDeleteActivity = (activity: any) => {
    setSelectedActivity(activity)
    setIsDeleteActivityDialogOpen(true)
  }

  // Add a new function to handle changes in the edited activity
  const handleEditedActivityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEditedActivity((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleNewLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewLead((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditedLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedLead((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleNewLeadSubmit = () => {
    if (!newLead.name || !newLead.email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Create a new lead object
      const leadData = {
        id: `lead-${Date.now()}`,
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone || "",
        source: newLead.source,
        status: "New",
        assignedTo: "Unassigned",
        assignedToEmail: "",
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        lastActivity: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        company: "",
        position: "",
        address: "",
        notes: "",
        tags: [],
        budget: "",
        timeline: "",
      }

      // Add the new lead to the leads array
      leads.push(leadData)

      // Update the UI by forcing a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Lead added successfully",
        description: `${newLead.name} has been added to your leads`,
      })

      setIsLoading(false)
      setIsNewLeadDialogOpen(false)
      setNewLead({
        name: "",
        email: "",
        phone: "",
        source: "Contact Form",
      })
    }, 1000)
  }

  const handleEditLeadSubmit = () => {
    if (!editedLead || !editedLead.name || !editedLead.email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the lead index
      const leadIndex = leads.findIndex((lead) => lead.id === editedLead.id)

      if (leadIndex !== -1) {
        // Update the lead
        leads[leadIndex] = { ...editedLead }
      }

      // Update the UI by forcing a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Lead updated successfully",
        description: `${editedLead.name}'s information has been updated`,
      })

      setIsLoading(false)
      setIsEditLeadDialogOpen(false)
      setEditedLead(null)
    }, 1000)
  }

  const handleChangeStatusSubmit = () => {
    if (!selectedLead || !newStatus) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the lead index
      const leadIndex = leads.findIndex((lead) => lead.id === selectedLead.id)

      if (leadIndex !== -1) {
        // Update the lead status
        leads[leadIndex].status = newStatus

        // Add activity for status change
        activities.unshift({
          id: `activity-${Date.now()}`,
          type: "Status Change",
          lead: selectedLead.name,
          description: `Status changed from ${selectedLead.status} to ${newStatus}`,
          user: "Current User",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
        })
      }

      // Update the UI by forcing a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Status updated successfully",
        description: `${selectedLead.name}'s status changed to ${newStatus}`,
      })

      setIsLoading(false)
      setIsChangeStatusDialogOpen(false)
      setNewStatus("")
    }, 1000)
  }

  const handleReassignSubmit = () => {
    if (!selectedLead || !selectedTeamMember) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the lead index
      const leadIndex = leads.findIndex((lead) => lead.id === selectedLead.id)

      if (leadIndex !== -1) {
        const selectedMember = teamMembers.find((member) => member.name === selectedTeamMember)

        if (selectedMember) {
          // Update the lead assigned to
          leads[leadIndex].assignedTo = selectedMember.name
          leads[leadIndex].assignedToEmail = selectedMember.email

          // Add activity for reassignment
          activities.unshift({
            id: `activity-${Date.now()}`,
            type: "Reassignment",
            lead: selectedLead.name,
            description: `Reassigned from ${selectedLead.assignedTo} to ${selectedMember.name}`,
            user: "Current User",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
          })
        }
      }

      // Update the UI by forcing a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Lead reassigned successfully",
        description: `${selectedLead.name} has been reassigned to ${selectedTeamMember}`,
      })

      setIsLoading(false)
      setIsReassignDialogOpen(false)
      setSelectedTeamMember("")
    }, 1000)
  }

  const handleSendEmailSubmit = async () => {
    if (!selectedLead || !emailData.subject || !emailData.message) return

    setIsLoading(true)

    try {
      // Send the email
      const result = await sendEmail({
        to: selectedLead.email,
        subject: emailData.subject,
        body: emailData.message,
        cc: emailData.cc,
      })

      if (result.success) {
        // Add activity for email
        activities.unshift({
          id: `activity-${Date.now()}`,
          type: "Email",
          lead: selectedLead.name,
          description: `Sent email: ${emailData.subject}`,
          user: "Current User",
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
        })

        // Update the UI by forcing a re-render
        setSearchTerm(searchTerm + " ")
        setSearchTerm(searchTerm)

        // Send notification to the user
        await sendNotificationEmail(
          selectedLead.email,
          `New message from Cretio CRM: ${emailData.subject}`,
          `You have received a new message regarding your account. Please check your inbox for an email with the subject: "${emailData.subject}".`,
        )

        toast({
          title: "Email sent successfully",
          description: `Email has been sent to ${selectedLead.name}`,
        })
      } else {
        toast({
          title: "Failed to send email",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error sending email",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsSendEmailDialogOpen(false)
      setEmailData({
        subject: "",
        message: "",
        cc: [],
        attachments: [],
      })
    }
  }

  const handleLogCallSubmit = () => {
    if (!selectedLead || !callData.notes) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add activity for call
      activities.unshift({
        id: `activity-${Date.now()}`,
        type: "Call",
        lead: selectedLead.name,
        description: `${callData.duration} min call - Outcome: ${callData.outcome}${callData.followUp ? " - Follow-up scheduled" : ""}`,
        user: "Current User",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      })

      // Update the lead's last activity
      const leadIndex = leads.findIndex((lead) => lead.id === selectedLead.id)
      if (leadIndex !== -1) {
        leads[leadIndex].lastActivity = new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      }

      // Update the UI by forcing a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Call logged successfully",
        description: `Call with ${selectedLead.name} has been logged`,
      })

      setIsLoading(false)
      setIsLogCallDialogOpen(false)
      setCallData({
        duration: "15",
        notes: "",
        outcome: "Interested",
        followUp: false,
        followUpDate: "",
      })
    }, 1000)
  }

  const handleScheduleMeetingSubmit = async () => {
    if (!selectedLead || !meetingData.title || !meetingData.date || !meetingData.time) return

    setIsLoading(true)

    try {
      // Add activity for meeting
      activities.unshift({
        id: `activity-${Date.now()}`,
        type: "Meeting",
        lead: selectedLead.name,
        description: `Scheduled: ${meetingData.title} on ${meetingData.date} at ${meetingData.time}`,
        user: "Current User",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      })

      // Update the lead's last activity
      const leadIndex = leads.findIndex((lead) => lead.id === selectedLead.id)
      if (leadIndex !== -1) {
        leads[leadIndex].lastActivity = new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      }

      // Send notification to the lead about the meeting
      await sendNotificationEmail(
        selectedLead.email,
        `Meeting Invitation: ${meetingData.title}`,
        `You have been invited to a meeting: "${meetingData.title}" on ${meetingData.date} at ${meetingData.time}. ${meetingData.notes ? `\n\nNotes: ${meetingData.notes}` : ""}`,
      )

      // Update the UI by forcing a re-render
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Meeting scheduled successfully",
        description: `Meeting with ${selectedLead.name} has been scheduled for ${meetingData.date} at ${meetingData.time}`,
      })

      setIsLoading(false)
      setIsScheduleMeetingDialogOpen(false)
      setMeetingData({
        title: "",
        date: "",
        time: "",
        duration: "30",
        location: "Virtual",
        notes: "",
        attendees: [],
      })
    } catch (error) {
      console.error("Error scheduling meeting:", error)
      toast({
        title: "Error scheduling meeting",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleNewActivityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setNewActivity((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewActivitySubmit = () => {
    if (!newActivity.lead || !newActivity.description) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Create a new activity object
      const activityData = {
        id: `activity-${Date.now()}`,
        type: newActivity.type,
        lead: newActivity.lead,
        description: newActivity.description,
        user: "Current User",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      }

      // Add the new activity to the activities array
      activities.unshift(activityData)

      // Update the UI
      setSearchTerm(searchTerm + " ")
      setSearchTerm(searchTerm)

      toast({
        title: "Activity logged successfully",
        description: `Activity for ${newActivity.lead} has been recorded`,
      })

      setIsLoading(false)
      setIsNewActivityDialogOpen(false)
      setNewActivity({
        type: "Email",
        lead: "",
        description: "",
      })
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEmailData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files || [])],
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setEmailData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const toggleCcEmail = (email: string) => {
    setEmailData((prev) => {
      if (prev.cc.includes(email)) {
        return { ...prev, cc: prev.cc.filter((e) => e !== email) }
      } else {
        return { ...prev, cc: [...prev.cc, email] }
      }
    })
  }

  const toggleAttendee = (email: string) => {
    setMeetingData((prev) => {
      if (prev.attendees.includes(email)) {
        return { ...prev, attendees: prev.attendees.filter((e) => e !== email) }
      } else {
        return { ...prev, attendees: [...prev.attendees, email] }
      }
    })
  }

  // Add these functions before the return statement, around line 806
  // Campaign action handlers
  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setIsViewCampaignDialogOpen(true)
  }

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setEditedCampaign({ ...campaign })
    setIsEditCampaignDialogOpen(true)
  }

  const handleAnalyticsCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setIsAnalyticsDialogOpen(true)
  }

  const handleDuplicateCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setNewCampaign({
      name: `Copy of ${campaign.name}`,
      subject: campaign.subject,
      content: campaign.content,
      sentTo: [...campaign.sentTo],
    })
    setIsDuplicateCampaignDialogOpen(true)
  }

  const handleDeleteCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setIsDeleteCampaignDialogOpen(true)
  }

  const handleSendCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)
    setScheduledDate(tomorrow.toISOString().split("T")[0])
    setScheduledTime("10:00")
    setIsSendCampaignDialogOpen(true)
  }

  const handleNewCampaignSubmit = () => {
    if (!newCampaign.name || !newCampaign.subject) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Create a new campaign object
      const campaignData = {
        id: `campaign-${Date.now()}`,
        name: newCampaign.name,
        status: "Draft",
        subject: newCampaign.subject,
        sent: 0,
        opens: 0,
        openRate: 0,
        clicks: 0,
        clickRate: 0,
        unsubscribes: 0,
        bounces: 0,
        date: "",
        content:
          newCampaign.content ||
          "<!DOCTYPE html><html><body><h1>" +
            newCampaign.name +
            "</h1><p>Your campaign content here...</p></body></html>",
        sentTo: newCampaign.sentTo.length > 0 ? newCampaign.sentTo : ["All Subscribers"],
        createdBy: "Current User",
      }

      // Add the new campaign to the campaigns array
      emailCampaigns.push(campaignData)

      // Update filtered list
      filterCampaigns()

      toast({
        title: "Campaign created",
        description: `${newCampaign.name} has been created as a draft`,
      })

      setIsLoading(false)
      setIsNewCampaignDialogOpen(false)
      setNewCampaign({
        name: "",
        subject: "",
        content: "",
        sentTo: [],
      })
    }, 1000)
  }

  const handleDuplicateCampaignSubmit = () => {
    if (!newCampaign.name || !newCampaign.subject) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Create a new campaign object
      const campaignData = {
        id: `campaign-${Date.now()}`,
        name: newCampaign.name,
        status: "Draft",
        subject: newCampaign.subject,
        sent: 0,
        opens: 0,
        openRate: 0,
        clicks: 0,
        clickRate: 0,
        unsubscribes: 0,
        bounces: 0,
        date: "",
        content: newCampaign.content,
        sentTo: newCampaign.sentTo,
        createdBy: "Current User",
      }

      // Add the new campaign to the campaigns array
      emailCampaigns.push(campaignData)

      // Update filtered list
      filterCampaigns()

      toast({
        title: "Campaign duplicated",
        description: `${selectedCampaign.name} has been duplicated as ${newCampaign.name}`,
      })

      setIsLoading(false)
      setIsDuplicateCampaignDialogOpen(false)
      setNewCampaign({
        name: "",
        subject: "",
        content: "",
        sentTo: [],
      })
    }, 1000)
  }

  const handleEditCampaignSubmit = () => {
    if (!editedCampaign || !editedCampaign.name || !editedCampaign.subject) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the campaign index
      const campaignIndex = emailCampaigns.findIndex((campaign) => campaign.id === editedCampaign.id)

      if (campaignIndex !== -1) {
        // Update the campaign
        emailCampaigns[campaignIndex] = { ...editedCampaign }
      }

      // Update filtered list
      filterCampaigns()

      toast({
        title: "Campaign updated",
        description: `${editedCampaign.name} has been updated successfully`,
      })

      setIsLoading(false)
      setIsEditCampaignDialogOpen(false)
      setEditedCampaign(null)
    }, 1000)
  }

  const handleDeleteCampaignSubmit = () => {
    if (!selectedCampaign) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the campaign index
      const campaignIndex = emailCampaigns.findIndex((campaign) => campaign.id === selectedCampaign.id)

      if (campaignIndex !== -1) {
        // Remove the campaign
        emailCampaigns.splice(campaignIndex, 1)
      }

      // Update filtered list
      filterCampaigns()

      toast({
        title: "Campaign deleted",
        description: `${selectedCampaign.name} has been deleted successfully`,
      })

      setIsLoading(false)
      setIsDeleteCampaignDialogOpen(false)
      setSelectedCampaign(null)
    }, 1000)
  }

  const handleSendCampaignSubmit = () => {
    if (!selectedCampaign) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the campaign index
      const campaignIndex = emailCampaigns.findIndex((campaign) => campaign.id === selectedCampaign.id)

      if (campaignIndex !== -1) {
        if (scheduledDate && scheduledTime) {
          // Schedule the campaign
          emailCampaigns[campaignIndex].status = "Scheduled"
          emailCampaigns[campaignIndex].date = new Date(scheduledDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          emailCampaigns[campaignIndex].scheduledTime = scheduledTime

          toast({
            title: "Campaign scheduled",
            description: `${selectedCampaign.name} has been scheduled for ${emailCampaigns[campaignIndex].date} at ${scheduledTime}`,
          })
        } else {
          // Send immediately
          emailCampaigns[campaignIndex].status = "Sent"
          emailCampaigns[campaignIndex].date = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })

          // Set some made-up stats
          const recipientCount = Math.floor(Math.random() * 1000) + 500
          emailCampaigns[campaignIndex].sent = recipientCount

          toast({
            title: "Campaign sent",
            description: `${selectedCampaign.name} has been sent to ${recipientCount} recipients`,
          })
        }
      }

      // Update filtered list
      filterCampaigns()

      setIsLoading(false)
      setIsSendCampaignDialogOpen(false)
      setSelectedCampaign(null)
      setScheduledDate("")
      setScheduledTime("")
    }, 1500)
  }

  const handleNewCampaignChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCampaign((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditedCampaignChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setEditedCampaign((prev: any) => ({ ...prev, [name]: value }))
  }

  const toggleCampaignSegment = (segment: string) => {
    setNewCampaign((prev) => {
      if (prev.sentTo.includes(segment)) {
        return { ...prev, sentTo: prev.sentTo.filter((s) => s !== segment) }
      } else {
        return { ...prev, sentTo: [...prev.sentTo, segment] }
      }
    })
  }

  const toggleEditCampaignSegment = (segment: string) => {
    if (!editedCampaign) return

    setEditedCampaign((prev: any) => {
      if (prev.sentTo.includes(segment)) {
        return { ...prev, sentTo: prev.sentTo.filter((s) => s !== segment) }
      } else {
        return { ...prev, sentTo: [...prev.sentTo, segment] }
      }
    })
  }

  const filterCampaigns = () => {
    const filtered = emailCampaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name.toLowerCase().includes(campaignSearchTerm.toLowerCase()) ||
        campaign.subject.toLowerCase().includes(campaignSearchTerm.toLowerCase())

      const matchesStatus = campaignStatusFilter === "all" || campaign.status === campaignStatusFilter

      return matchesSearch && matchesStatus
    })

    setCampaignFilteredList(filtered)
  }

  // Call this whenever search term or status filter changes
  useEffect(() => {
    filterCampaigns()
  }, [campaignSearchTerm, campaignStatusFilter])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">CRM & Lead Management</h1>
        <p className="text-muted-foreground">
          Track leads, manage customer relationships, and monitor sales activities.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Won</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,250</div>
            <p className="text-xs text-muted-foreground">+$750 from last month</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="email">Email Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="leads" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                    <SelectItem value="Won">Won</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="Contact Form">Contact Form</SelectItem>
                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                    <SelectItem value="Trade Show">Trade Show</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isNewLeadDialogOpen} onOpenChange={setIsNewLeadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Lead
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Lead</DialogTitle>
                      <DialogDescription>Enter the details of the new lead.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newLead.name}
                          onChange={handleNewLeadChange}
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={newLead.email}
                          onChange={handleNewLeadChange}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={newLead.phone}
                          onChange={handleNewLeadChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="source">Source</Label>
                        <Select
                          name="source"
                          value={newLead.source}
                          onValueChange={(value) => setNewLead((prev) => ({ ...prev, source: value }))}
                        >
                          <SelectTrigger id="source">
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Contact Form">Contact Form</SelectItem>
                            <SelectItem value="Landing Page">Landing Page</SelectItem>
                            <SelectItem value="Referral">Referral</SelectItem>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                            <SelectItem value="Trade Show">Trade Show</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewLeadDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleNewLeadSubmit} disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Lead"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <div className="flex items-center gap-1">
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No leads found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${statusColors[lead.status] || "bg-gray-500"}`} />
                            {lead.status}
                          </div>
                        </TableCell>
                        <TableCell>{lead.assignedTo}</TableCell>
                        <TableCell>{lead.createdAt}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewDetails(lead)}>
                                <Search className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit lead
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeStatus(lead)}>
                                <CheckCheck className="mr-2 h-4 w-4" />
                                Change status
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReassign(lead)}>
                                <Users className="mr-2 h-4 w-4" />
                                Reassign
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleSendEmail(lead)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send email
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLogCall(lead)}>
                                <Phone className="mr-2 h-4 w-4" />
                                Log call
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleScheduleMeeting(lead)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule meeting
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete lead
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
        <TabsContent value="activities" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search activities..." className="w-full md:w-[300px]" />
              </div>
              <Dialog open={isNewActivityDialogOpen} onOpenChange={setIsNewActivityDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Log Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log New Activity</DialogTitle>
                    <DialogDescription>Record a new activity with a lead.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="activityType">Activity Type</Label>
                      <Select
                        name="type"
                        value={newActivity.type}
                        onValueChange={(value) => setNewActivity((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger id="activityType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Call">Call</SelectItem>
                          <SelectItem value="Meeting">Meeting</SelectItem>
                          <SelectItem value="Note">Note</SelectItem>
                          <SelectItem value="Task">Task</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="activityLead">Lead</Label>
                      <Select
                        name="lead"
                        value={newActivity.lead}
                        onValueChange={(value) => setNewActivity((prev) => ({ ...prev, lead: value }))}
                      >
                        <SelectTrigger id="activityLead">
                          <SelectValue placeholder="Select lead" />
                        </SelectTrigger>
                        <SelectContent>
                          {leads.map((lead) => (
                            <SelectItem key={lead.id} value={lead.name}>
                              {lead.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="activityDescription">Description</Label>
                      <Textarea
                        id="activityDescription"
                        name="description"
                        value={newActivity.description}
                        onChange={handleNewActivityChange}
                        placeholder="Describe the activity..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewActivityDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleNewActivitySubmit} disabled={isLoading}>
                      {isLoading ? "Logging..." : "Log Activity"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <Badge variant="outline">{activity.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{activity.lead}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.time}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewActivityDetails(activity)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditActivity(activity)}>
                              Edit activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteActivity(activity)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete activity
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
        </TabsContent>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Create and manage email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex w-full items-center gap-2 md:w-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      className="w-full md:w-[300px]"
                      value={campaignSearchTerm}
                      onChange={(e) => setCampaignSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Select value={campaignStatusFilter} onValueChange={setCampaignStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          New Campaign
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Create New Email Campaign</DialogTitle>
                          <DialogDescription>Design and send an email campaign to your leads.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="campaign-name">Campaign Name</Label>
                            <Input
                              id="campaign-name"
                              name="name"
                              value={newCampaign.name}
                              onChange={handleNewCampaignChange}
                              placeholder="March Newsletter"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="campaign-subject">Email Subject</Label>
                            <Input
                              id="campaign-subject"
                              name="subject"
                              value={newCampaign.subject}
                              onChange={handleNewCampaignChange}
                              placeholder="Check out our March updates"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Recipients</Label>
                            <div className="rounded-md border p-4">
                              <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                  "All Subscribers",
                                  "Qualified Leads",
                                  "Current Customers",
                                  "Marketing Prospects",
                                  "Partners",
                                ].map((segment) => (
                                  <div key={segment} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`segment-${segment}`}
                                      checked={newCampaign.sentTo.includes(segment)}
                                      onCheckedChange={() => toggleCampaignSegment(segment)}
                                    />
                                    <Label htmlFor={`segment-${segment}`}>{segment}</Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="campaign-content">Email Content</Label>
                            <Textarea
                              id="campaign-content"
                              name="content"
                              value={newCampaign.content}
                              onChange={handleNewCampaignChange}
                              placeholder="<!DOCTYPE html><html><body><h1>Your Campaign Title</h1><p>Your content here...</p></body></html>"
                              rows={8}
                            />
                            <p className="text-xs text-muted-foreground">
                              Enter HTML content for your email, or use our builder (coming soon)
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNewCampaignDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleNewCampaignSubmit} disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Campaign"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Open Rate</TableHead>
                        <TableHead>Click Rate</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignFilteredList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No campaigns found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        campaignFilteredList.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  campaign.status === "Sent"
                                    ? "bg-green-500/10 text-green-500"
                                    : campaign.status === "Scheduled"
                                      ? "bg-blue-500/10 text-blue-500"
                                      : "bg-amber-500/10 text-amber-500"
                                }
                              >
                                {campaign.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{campaign.sent > 0 ? campaign.sent.toLocaleString() : "-"}</TableCell>
                            <TableCell>{campaign.openRate > 0 ? `${campaign.openRate}%` : "-"}</TableCell>
                            <TableCell>{campaign.clickRate > 0 ? `${campaign.clickRate}%` : "-"}</TableCell>
                            <TableCell>{campaign.date || "-"}</TableCell>
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
                                  <DropdownMenuItem onClick={() => handleViewCampaign(campaign)}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    View campaign
                                  </DropdownMenuItem>
                                  {campaign.status !== "Sent" && (
                                    <DropdownMenuItem onClick={() => handleEditCampaign(campaign)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit campaign
                                    </DropdownMenuItem>
                                  )}
                                  {campaign.status === "Sent" && (
                                    <DropdownMenuItem onClick={() => handleAnalyticsCampaign(campaign)}>
                                      <BarChart4 className="mr-2 h-4 w-4" />
                                      View analytics
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign)}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicate campaign
                                  </DropdownMenuItem>
                                  {campaign.status !== "Sent" && (
                                    <DropdownMenuItem onClick={() => handleSendCampaign(campaign)}>
                                      <Send className="mr-2 h-4 w-4" />
                                      {campaign.status === "Scheduled" ? "Reschedule" : "Send campaign"}
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteCampaign(campaign)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete campaign
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
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Analytics</CardTitle>
              <CardDescription>Track and analyze your lead generation and conversion metrics</CardDescription>
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
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Lead conversion funnel chart placeholder</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Top Lead Sources</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Contact Form</span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[32%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Landing Page</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[28%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Campaign</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[20%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Conversion by Stage</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New → Contacted</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[85%] rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Contacted → Qualified</span>
                        <span className="text-sm font-medium">62%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[62%] rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Qualified → Won</span>
                        <span className="text-sm font-medium">38%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[38%] rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Response Time</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average First Response</span>
                        <span className="text-sm font-medium">2.5 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[65%] rounded-full bg-amber-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Follow-up Time</span>
                        <span className="text-sm font-medium">1.8 days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[45%] rounded-full bg-orange-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* View Lead Details Dialog */}
      <Dialog open={isViewDetailDialogOpen} onOpenChange={setIsViewDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>Detailed information about this lead.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                  <p className="text-muted-foreground">
                    {selectedLead.position} at {selectedLead.company}
                  </p>
                </div>
                <Badge
                  className={`${statusColors[selectedLead.status]?.replace("bg-", "bg-opacity-20 text-")} border-none`}
                >
                  {selectedLead.status}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Contact Information</h3>
                  <div className="space-y-2 rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
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
                        className="mt-1 text-muted-foreground"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{selectedLead.address || "No address provided"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Lead Information</h3>
                  <div className="space-y-2 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span>{selectedLead.source}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{selectedLead.createdAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Activity:</span>
                      <span>{selectedLead.lastActivity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Assigned To:</span>
                      <span>{selectedLead.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Deal Information</h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span>{selectedLead.budget || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Timeline:</span>
                    <span>{selectedLead.timeline || "Not specified"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Notes</h3>
                <div className="rounded-md border p-3">
                  <p>{selectedLead.notes || "No notes available"}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.tags && selectedLead.tags.length > 0 ? (
                    selectedLead.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No tags</span>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleEditLead(selectedLead)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" onClick={() => handleSendEmail(selectedLead)}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" onClick={() => handleLogCall(selectedLead)}>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsViewDetailDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Lead Dialog */}
      <Dialog open={isEditLeadDialogOpen} onOpenChange={setIsEditLeadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>Update lead information.</DialogDescription>
          </DialogHeader>
          {editedLead && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" name="name" value={editedLead.name} onChange={handleEditedLeadChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    name="company"
                    value={editedLead.company}
                    onChange={handleEditedLeadChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={editedLead.email}
                    onChange={handleEditedLeadChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" name="phone" value={editedLead.phone} onChange={handleEditedLeadChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-position">Position</Label>
                <Input
                  id="edit-position"
                  name="position"
                  value={editedLead.position}
                  onChange={handleEditedLeadChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input id="edit-address" name="address" value={editedLead.address} onChange={handleEditedLeadChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-budget">Budget</Label>
                  <Input id="edit-budget" name="budget" value={editedLead.budget} onChange={handleEditedLeadChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-timeline">Timeline</Label>
                  <Input
                    id="edit-timeline"
                    name="timeline"
                    value={editedLead.timeline}
                    onChange={handleEditedLeadChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={editedLead.notes}
                  onChange={handleEditedLeadChange}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLeadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditLeadSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Change Status Dialog */}
      <Dialog open={isChangeStatusDialogOpen} onOpenChange={setIsChangeStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Lead Status</DialogTitle>
            <DialogDescription>Update the status of this lead.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">Current Status:</div>
                <Badge
                  className={`${statusColors[selectedLead.status]?.replace("bg-", "bg-opacity-20 text-")} border-none`}
                >
                  {selectedLead.status}
                </Badge>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-status">New Status</Label>
                <RadioGroup value={newStatus} onValueChange={setNewStatus} className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="New" id="status-new" />
                    <Label htmlFor="status-new" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      New
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Contacted" id="status-contacted" />
                    <Label htmlFor="status-contacted" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      Contacted
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Qualified" id="status-qualified" />
                    <Label htmlFor="status-qualified" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      Qualified
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Proposal" id="status-proposal" />
                    <Label htmlFor="status-proposal" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      Proposal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Negotiation" id="status-negotiation" />
                    <Label htmlFor="status-negotiation" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-pink-500" />
                      Negotiation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Won" id="status-won" />
                    <Label htmlFor="status-won" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Won
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lost" id="status-lost" />
                    <Label htmlFor="status-lost" className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Lost
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangeStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeStatusSubmit} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Reassign Dialog */}
      <Dialog open={isReassignDialogOpen} onOpenChange={setIsReassignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign Lead</DialogTitle>
            <DialogDescription>Assign this lead to another team member.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">Currently Assigned To:</div>
                <span>{selectedLead.assignedTo}</span>
              </div>
              <div className="grid gap-4">
                <Label>Select Team Member</Label>
                <RadioGroup value={selectedTeamMember} onValueChange={setSelectedTeamMember} className="grid gap-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={member.name} id={`member-${member.id}`} />
                      <Label htmlFor={`member-${member.id}`} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReassignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReassignSubmit} disabled={isLoading}>
              {isLoading ? "Reassigning..." : "Reassign Lead"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Send Email Dialog */}
      <Dialog open={isSendEmailDialogOpen} onOpenChange={setIsSendEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>Compose an email to send to this lead.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">To:</div>
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{selectedLead.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>
                    {selectedLead.name} ({selectedLead.email})
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-cc">CC:</Label>
                  <div className="text-xs text-muted-foreground">Select team members to CC</div>
                </div>
                <div className="max-h-32 overflow-y-auto rounded-md border p-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={`cc-${member.id}`}
                        checked={emailData.cc.includes(member.email)}
                        onCheckedChange={() => toggleCcEmail(member.email)}
                      />
                      <Label htmlFor={`cc-${member.id}`} className="flex items-center gap-2 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>
                          {member.name} ({member.email})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData((prev) => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email-message">Message</Label>
                <Textarea
                  id="email-message"
                  value={emailData.message}
                  onChange={(e) => setEmailData((prev) => ({ ...prev, message: e.target.value }))}
                  rows={8}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Attachments</Label>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="h-8">
                    <Plus className="mr-1 h-3 w-3" />
                    Add File
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                </div>
                {emailData.attachments.length > 0 ? (
                  <div className="max-h-32 overflow-y-auto rounded-md border p-2">
                    {emailData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2 text-sm">
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
                            className="text-muted-foreground"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          <span>{file.name}</span>
                          <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeAttachment(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                    No attachments added
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmailSubmit} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Log Call Dialog */}
      <Dialog open={isLogCallDialogOpen} onOpenChange={setIsLogCallDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Call</DialogTitle>
            <DialogDescription>Record details about your call with this lead.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">Call with:</div>
                <span>
                  {selectedLead.name} ({selectedLead.phone})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="call-duration">Duration (minutes)</Label>
                  <Select
                    value={callData.duration}
                    onValueChange={(value) => setCallData((prev) => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger id="call-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="call-outcome">Outcome</Label>
                  <Select
                    value={callData.outcome}
                    onValueChange={(value) => setCallData((prev) => ({ ...prev, outcome: value }))}
                  >
                    <SelectTrigger id="call-outcome">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Very Interested">Very Interested</SelectItem>
                      <SelectItem value="Not Interested">Not Interested</SelectItem>
                      <SelectItem value="No Answer">No Answer</SelectItem>
                      <SelectItem value="Left Voicemail">Left Voicemail</SelectItem>
                      <SelectItem value="Wrong Number">Wrong Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="call-notes">Notes</Label>
                <Textarea
                  id="call-notes"
                  value={callData.notes}
                  onChange={(e) => setCallData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter details about the call..."
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="call-follow-up"
                  checked={callData.followUp}
                  onCheckedChange={(checked) => setCallData((prev) => ({ ...prev, followUp: checked === true }))}
                />
                <Label htmlFor="call-follow-up">Schedule follow-up</Label>
              </div>
              {callData.followUp && (
                <div className="grid gap-2">
                  <Label htmlFor="follow-up-date">Follow-up Date</Label>
                  <Input
                    id="follow-up-date"
                    type="date"
                    value={callData.followUpDate}
                    onChange={(e) => setCallData((prev) => ({ ...prev, followUpDate: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogCallDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogCallSubmit} disabled={isLoading}>
              {isLoading ? "Logging..." : "Log Call"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Schedule Meeting Dialog */}
      <Dialog open={isScheduleMeetingDialogOpen} onOpenChange={setIsScheduleMeetingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Meeting</DialogTitle>
            <DialogDescription>Set up a meeting with this lead.</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="meeting-title">Meeting Title</Label>
                <Input
                  id="meeting-title"
                  value={meetingData.title}
                  onChange={(e) => setMeetingData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="meeting-date">Date</Label>
                  <Input
                    id="meeting-date"
                    type="date"
                    value={meetingData.date}
                    onChange={(e) => setMeetingData((prev) => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meeting-time">Time</Label>
                  <Input
                    id="meeting-time"
                    type="time"
                    value={meetingData.time}
                    onChange={(e) => setMeetingData((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="meeting-duration">Duration</Label>
                  <Select
                    value={meetingData.duration}
                    onValueChange={(value) => setMeetingData((prev) => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger id="meeting-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meeting-location">Location</Label>
                  <Select
                    value={meetingData.location}
                    onValueChange={(value) => setMeetingData((prev) => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger id="meeting-location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Virtual">Virtual (Zoom)</SelectItem>
                      <SelectItem value="Phone">Phone Call</SelectItem>
                      <SelectItem value="Office">Our Office</SelectItem>
                      <SelectItem value="Client">Client Location</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="meeting-attendees">Attendees</Label>
                  <div className="text-xs text-muted-foreground">Select additional attendees</div>
                </div>
                <div className="max-h-32 overflow-y-auto rounded-md border p-2">
                  <div className="flex items-center space-x-2 py-1">
                    <Checkbox id={`attendee-${selectedLead.id}`} checked={true} disabled />
                    <Label htmlFor={`attendee-${selectedLead.id}`} className="flex items-center gap-2 text-sm">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{selectedLead.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>
                        {selectedLead.name} ({selectedLead.email})
                      </span>
                    </Label>
                  </div>
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={`attendee-${member.id}`}
                        checked={meetingData.attendees.includes(member.email)}
                        onCheckedChange={() => toggleAttendee(member.email)}
                      />
                      <Label htmlFor={`attendee-${member.id}`} className="flex items-center gap-2 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>
                          {member.name} ({member.email})
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meeting-notes">Notes</Label>
                <Textarea
                  id="meeting-notes"
                  value={meetingData.notes}
                  onChange={(e) => setMeetingData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter meeting agenda or notes..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleMeetingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleMeetingSubmit} disabled={isLoading}>
              {isLoading ? "Scheduling..." : "Schedule Meeting"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* View Activity Details Dialog */}
      <Dialog open={isViewActivityDialogOpen} onOpenChange={setIsViewActivityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
            <DialogDescription>Detailed information about this activity.</DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Type</h3>
                  <Badge variant="outline">{selectedActivity.type}</Badge>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="font-medium">Lead</h3>
                <p>{selectedActivity.lead}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="font-medium">Description</h3>
                <p>{selectedActivity.description}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="font-medium">Performed by</h3>
                <p>{selectedActivity.user}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <h3 className="font-medium">Date</h3>
                  <p>{selectedActivity.date}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="font-medium">Time</h3>
                  <p>{selectedActivity.time}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewActivityDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Activity Dialog */}
      <Dialog open={isEditActivityDialogOpen} onOpenChange={setIsEditActivityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>Update activity information.</DialogDescription>
          </DialogHeader>
          {editedActivity && (
            <form
              onSubmit={(e) => {
                e.preventDefault()

                // Update the activity in the activities array
                const activityIndex = activities.findIndex((act) => act.id === editedActivity.id)

                if (activityIndex !== -1) {
                  activities[activityIndex] = { ...editedActivity }
                }

                // Update the UI by forcing a re-render
                setSearchTerm(searchTerm + " ")
                setSearchTerm(searchTerm)

                toast({
                  title: "Activity updated",
                  description: "The activity details have been updated.",
                })

                setIsEditActivityDialogOpen(false)
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select
                    name="type"
                    value={editedActivity.type}
                    onValueChange={(value) => setEditedActivity((prev: any) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Note">Note</SelectItem>
                      <SelectItem value="Task">Task</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-lead">Lead</Label>
                  <Input id="edit-lead" name="lead" value={editedActivity.lead} onChange={handleEditedActivityChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={editedActivity.description}
                    onChange={handleEditedActivityChange}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input
                      id="edit-date"
                      name="date"
                      value={editedActivity.date}
                      onChange={handleEditedActivityChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input
                      id="edit-time"
                      name="time"
                      value={editedActivity.time}
                      onChange={handleEditedActivityChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      {/* Delete Activity Dialog */}
      <Dialog open={isDeleteActivityDialogOpen} onOpenChange={setIsDeleteActivityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Activity</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="py-4">
              <p>
                Are you sure you want to delete this activity for <strong>{selectedActivity.lead}</strong>?
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Activity: {selectedActivity.type} - {selectedActivity.description}
              </p>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsDeleteActivityDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Remove the activity from the activities array
                    const updatedActivities = activities.filter((act) => act.id !== selectedActivity.id)

                    // Replace the activities array with the updated one
                    activities.splice(0, activities.length, ...updatedActivities)

                    // Update the UI by forcing a re-render
                    setSearchTerm(searchTerm + " ")
                    setSearchTerm(searchTerm)

                    toast({
                      title: "Activity deleted",
                      description: "The activity has been deleted successfully.",
                    })

                    setIsDeleteActivityDialogOpen(false)
                  }}
                >
                  Delete Activity
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* View Campaign Dialog */}
      <Dialog open={isViewCampaignDialogOpen} onOpenChange={setIsViewCampaignDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
            <DialogDescription>Detailed information about this campaign.</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="grid gap-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCampaign.name}</h2>
                  <p className="text-muted-foreground">Subject: {selectedCampaign.subject}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedCampaign.status === "Sent"
                      ? "bg-green-500/10 text-green-500"
                      : selectedCampaign.status === "Scheduled"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-amber-500/10 text-amber-500"
                  }
                >
                  {selectedCampaign.status}
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Campaign Information</h3>
                  <div className="space-y-2 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created by:</span>
                      <span>{selectedCampaign.createdBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{selectedCampaign.status}</span>
                    </div>
                    {selectedCampaign.status === "Scheduled" && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Scheduled:</span>
                        <span>
                          {selectedCampaign.date} at {selectedCampaign.scheduledTime}
                        </span>
                      </div>
                    )}
                    {selectedCampaign.status === "Sent" && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Sent:</span>
                        <span>{selectedCampaign.date}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Audience:</span>
                      <span>{selectedCampaign.sentTo.join(", ")}</span>
                    </div>
                  </div>
                </div>

                {selectedCampaign.status === "Sent" && (
                  <div>
                    <h3 className="mb-2 font-semibold">Campaign Performance</h3>
                    <div className="space-y-4 rounded-md border p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Recipients:</span>
                          <span>{selectedCampaign.sent.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Opens:</span>
                          <span>
                            {selectedCampaign.opens.toLocaleString()} ({selectedCampaign.openRate}%)
                          </span>
                        </div>
                        <Progress value={selectedCampaign.openRate} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Clicks:</span>
                          <span>
                            {selectedCampaign.clicks.toLocaleString()} ({selectedCampaign.clickRate}%)
                          </span>
                        </div>
                        <Progress value={selectedCampaign.clickRate} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Unsubscribes:</span>
                          <span>{selectedCampaign.unsubscribes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Bounces:</span>
                          <span>{selectedCampaign.bounces}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Email Content</h3>
                <div className="rounded-md border p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-medium">HTML Preview</h4>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Browser
                    </Button>
                  </div>
                  <div className="h-64 overflow-auto rounded border bg-white p-4">
                    <div className="text-xs font-mono text-muted-foreground">
                      {selectedCampaign.content.slice(0, 500)}
                      {selectedCampaign.content.length > 500 && "..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <div className="flex space-x-2">
              {selectedCampaign && selectedCampaign.status !== "Sent" && (
                <Button variant="outline" onClick={() => handleEditCampaign(selectedCampaign)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
              <Button variant="outline" onClick={() => handleDuplicateCampaign(selectedCampaign)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              {selectedCampaign && selectedCampaign.status === "Sent" && (
                <Button variant="outline" onClick={() => handleAnalyticsCampaign(selectedCampaign)}>
                  <BarChart4 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={() => setIsViewCampaignDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Campaign Dialog */}
      <Dialog open={isEditCampaignDialogOpen} onOpenChange={setIsEditCampaignDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>Update campaign details and content.</DialogDescription>
          </DialogHeader>
          {editedCampaign && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-campaign-name">Campaign Name</Label>
                <Input
                  id="edit-campaign-name"
                  name="name"
                  value={editedCampaign.name}
                  onChange={handleEditedCampaignChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-campaign-subject">Email Subject</Label>
                <Input
                  id="edit-campaign-subject"
                  name="subject"
                  value={editedCampaign.subject}
                  onChange={handleEditedCampaignChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Recipients</Label>
                <div className="rounded-md border p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {["All Subscribers", "Qualified Leads", "Current Customers", "Marketing Prospects", "Partners"].map(
                      (segment) => (
                        <div key={segment} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-segment-${segment}`}
                            checked={editedCampaign.sentTo.includes(segment)}
                            onCheckedChange={() => toggleEditCampaignSegment(segment)}
                          />
                          <Label htmlFor={`edit-segment-${segment}`}>{segment}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-campaign-content">Email Content</Label>
                  <Textarea
                    id="edit-campaign-content"
                    name="content"
                    value={editedCampaign.content}
                    onChange={handleEditedCampaignChange}
                    rows={8}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCampaignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCampaignSubmit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Campaign Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Campaign Analytics</DialogTitle>
            <DialogDescription>Detailed performance metrics for this campaign.</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="grid gap-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedCampaign.name}</h2>
                  <p className="text-sm text-muted-foreground">Sent on {selectedCampaign.date}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Recipients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.sent.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Opens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.opens.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{selectedCampaign.openRate}% open rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.clicks.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{selectedCampaign.clickRate}% click rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Unsubscribes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCampaign.unsubscribes}</div>
                    <p className="text-xs text-muted-foreground">
                      {((selectedCampaign.unsubscribes / selectedCampaign.sent) * 100).toFixed(2)}% unsubscribe rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Performance Over Time</h3>
                <div className="h-[300px] w-full rounded-md border flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive chart placeholder</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold">Top Clicked Links</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">/product-page</span>
                      <span className="text-sm font-medium">42 clicks</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[45%] rounded-full bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">/features</span>
                      <span className="text-sm font-medium">31 clicks</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[33%] rounded-full bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">/pricing</span>
                      <span className="text-sm font-medium">24 clicks</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[26%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Device Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile</span>
                      <span className="text-sm font-medium">58%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[58%] rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Desktop</span>
                      <span className="text-sm font-medium">36%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[36%] rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tablet</span>
                      <span className="text-sm font-medium">6%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[6%] rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Duplicate Campaign Dialog */}
      <Dialog open={isDuplicateCampaignDialogOpen} onOpenChange={setIsDuplicateCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duplicate Campaign</DialogTitle>
            <DialogDescription>Create a copy of this campaign with a new name.</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">Original Campaign:</div>
                <span>{selectedCampaign.name}</span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duplicate-campaign-name">New Campaign Name</Label>
                <Input
                  id="duplicate-campaign-name"
                  name="name"
                  value={newCampaign.name}
                  onChange={handleNewCampaignChange}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDuplicateCampaignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDuplicateCampaignSubmit} disabled={isLoading}>
              {isLoading ? "Duplicating..." : "Duplicate Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Campaign Dialog */}
      <Dialog open={isDeleteCampaignDialogOpen} onOpenChange={setIsDeleteCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="py-4">
              <p>
                Are you sure you want to delete <strong>{selectedCampaign.name}</strong>?
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                All campaign data, analytics, and content will be permanently deleted.
              </p>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsDeleteCampaignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteCampaignSubmit} disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Delete Campaign"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Send Campaign Dialog */}
      <Dialog open={isSendCampaignDialogOpen} onOpenChange={setIsSendCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Campaign</DialogTitle>
            <DialogDescription>Schedule or send this campaign immediately.</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <div className="font-medium">Campaign:</div>
                <span>{selectedCampaign.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium">Recipients:</div>
                <span>{selectedCampaign.sentTo.join(", ")}</span>
              </div>

              <div className="space-y-4 rounded-md border p-4">
                <RadioGroup defaultValue="schedule">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="schedule" id="schedule" />
                    <Label htmlFor="schedule">Schedule for later</Label>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 pl-6">
                    <div className="grid gap-2">
                      <Label htmlFor="schedule-date">Date</Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schedule-time">Time</Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <RadioGroupItem
                      value="immediate"
                      id="immediate"
                      onClick={() => {
                        setScheduledDate("")
                        setScheduledTime("")
                      }}
                    />
                    <Label htmlFor="immediate">Send immediately</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                <div className="flex items-center gap-2">
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
                    className="h-4 w-4"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <p className="text-sm font-medium">
                    This action will send your campaign to {selectedCampaign.sentTo.join(", ")}. Please ensure all
                    content is correct before sending.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendCampaignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendCampaignSubmit} disabled={isLoading}>
              {isLoading ? "Sending..." : scheduledDate && scheduledTime ? "Schedule Campaign" : "Send Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
