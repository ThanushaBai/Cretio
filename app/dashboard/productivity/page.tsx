"use client"

import type React from "react"

import { useState } from "react"
import {
  CheckSquare,
  Clock,
  Edit,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  User,
  ChevronRight,
  GripVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialTasks = [
  {
    id: "task-1",
    title: "Update landing page content",
    description: "Revise the copy and update images on the homepage",
    status: "To Do",
    priority: "High",
    dueDate: "2025-03-20",
    assignedTo: "Thanusha",
    tags: ["Website", "Marketing"],
  },
  {
    id: "task-2",
    title: "Create email campaign for product launch",
    description: "Design and write copy for the email sequence",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-03-18",
    assignedTo: "Jane Smith",
    tags: ["Email", "Marketing"],
  },
  {
    id: "task-3",
    title: "Review analytics for Q1",
    description: "Analyze performance metrics and prepare report",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-03-25",
    assignedTo: "John Doe",
    tags: ["Analytics", "Reporting"],
  },
  {
    id: "task-4",
    title: "Update client proposal",
    description: "Revise pricing and service offerings",
    status: "To Do",
    priority: "Medium",
    dueDate: "2025-03-22",
    assignedTo: "Bob Johnson",
    tags: ["Sales", "Client"],
  },
  {
    id: "task-5",
    title: "Prepare presentation for team meeting",
    description: "Create slides for the monthly team meeting",
    status: "Done",
    priority: "Low",
    dueDate: "2025-03-15",
    assignedTo: "Jane Smith",
    tags: ["Internal", "Meeting"],
  },
  {
    id: "task-6",
    title: "Research competitors",
    description: "Analyze competitor websites and offerings",
    status: "Done",
    priority: "Low",
    dueDate: "2025-03-10",
    assignedTo: "Bob Johnson",
    tags: ["Research", "Marketing"],
  },
]

// Define types for our data
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
  tags: string[];
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
}

// Mock data
const initialNotes = [
  {
    id: "note-1",
    title: "Client Meeting Notes - Acme Inc",
    content:
      "Discussed new project requirements. Client wants to launch by end of Q2. Budget approved for additional resources.",
    createdAt: "2025-03-15T10:30:00",
    updatedAt: "2025-03-15T14:45:00",
    tags: ["Client", "Meeting"],
  },
  {
    id: "note-2",
    title: "Product Roadmap Ideas",
    content:
      "Features to consider for Q3:\n- Enhanced reporting\n- Custom dashboards\n- API improvements\n- Mobile app updates",
    createdAt: "2025-03-14T09:15:00",
    updatedAt: "2025-03-14T09:15:00",
    tags: ["Product", "Planning"],
  },
  {
    id: "note-3",
    title: "Marketing Campaign Brainstorm",
    content:
      "Social media campaign ideas:\n1. User testimonials\n2. Case studies\n3. Behind-the-scenes content\n4. Product tutorials",
    createdAt: "2025-03-12T13:20:00",
    updatedAt: "2025-03-13T11:10:00",
    tags: ["Marketing", "Planning"],
  },
]

export default function ProductivityPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  
  interface NewTaskForm {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assignedTo: string;
    tags: string;
  }
  
  interface NewNoteForm {
    title: string;
    content: string;
    tags: string;
  }
  
  const [newTask, setNewTask] = useState<NewTaskForm>({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
    tags: "",
  })
  
  const [newNote, setNewNote] = useState<NewNoteForm>({
    title: "",
    content: "",
    tags: "",
  })
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event-1",
      title: "Team Meeting",
      date: new Date(2025, 2, 20),
      time: "10:00 AM - 11:30 AM",
      description: "Weekly team sync to discuss project progress",
    },
    {
      id: "event-2",
      title: "Client Presentation",
      date: new Date(2025, 2, 22),
      time: "2:00 PM - 3:30 PM",
      description: "Present the new marketing strategy to the client",
    },
    {
      id: "event-3",
      title: "Product Launch Planning",
      date: new Date(2025, 2, 25),
      time: "11:00 AM - 12:30 PM",
      description: "Finalize the product launch timeline and marketing materials",
    },
  ])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    // In a real app, you would fetch events for this date
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewNote((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewTaskSubmit = () => {
    if (!newTask.title) return

    // Create a new task object
    const taskData: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      dueDate: newTask.dueDate || new Date().toISOString().split("T")[0],
      assignedTo: newTask.assignedTo || "Unassigned",
      tags: newTask.tags ? newTask.tags.split(",").map((tag) => tag.trim()) : [],
    }

    // Add the new task to the tasks array
    setTasks([...tasks, taskData])

    toast({
      title: "Task created successfully",
      description: `${newTask.title} has been added to your tasks`,
    })

    setIsNewTaskDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
      assignedTo: "",
      tags: "",
    })
  }

  const handleNewNoteSubmit = () => {
    if (!newNote.title) return

    // Create a new note object
    const noteData: Note = {
      id: `note-${Date.now()}`,
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: newNote.tags ? newNote.tags.split(",").map((tag) => tag.trim()) : [],
    }

    // Add the new note to the notes array using state
    setNotes([...notes, noteData])

    toast({
      title: "Note created successfully",
      description: `${newNote.title} has been added to your notes`,
    })

    setIsNewNoteDialogOpen(false)
    setNewNote({
      title: "",
      content: "",
      tags: "",
    })
  }

  // Drag and drop handlers
  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, column: string) => {
    e.preventDefault()
    setDragOverColumn(column)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStatus: string) => {
    e.preventDefault()

    if (draggedTask && draggedTask.status !== targetStatus) {
      const updatedTasks = tasks.map((task) => (task.id === draggedTask.id ? { ...task, status: targetStatus } : task))

      setTasks(updatedTasks)

      toast({
        title: "Task moved",
        description: `"${draggedTask.title}" moved to ${targetStatus}`,
      })
    }

    setDraggedTask(null)
    setDragOverColumn(null)
  }

  const handleChangeTaskStatus = (taskId: string, newStatus: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))

    setTasks(updatedTasks)

    toast({
      title: "Task status updated",
      description: `Task status changed to ${newStatus}`,
    })
  }

  // Change status: cycles through To Do → In Progress → Done → To Do
  const handleCycleTaskStatus = (taskId: string) => {
    setTasks(tasks =>
      tasks.map(task => {
        if (task.id !== taskId) return task
        const statusOrder = ["To Do", "In Progress", "Done"]
        const nextStatus = statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length]
        return { ...task, status: nextStatus }
      })
    )
    toast({
      title: "Task status updated",
      description: "Task status cycled",
    })
  }

  // Mark as Done (for calendar tab)
  const handleMarkTaskDone = (taskId: string) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, status: "Done" } : task
      )
    )
    toast({
      title: "Task marked as done",
      description: "Task status set to Done",
    })
  }

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)

    toast({
      title: "Task deleted",
      description: "Task has been deleted successfully",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Productivity Tools</h1>
        <p className="text-muted-foreground">
          Manage tasks, take notes, and stay organized with our productivity tools.
        </p>
      </div>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="tasks">Task List</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        {/* Kanban Board Tab */}
        <TabsContent value="kanban" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
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
                <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>Add a new task to your board.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={newTask.title}
                          onChange={handleNewTaskChange}
                          placeholder="Enter task title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={newTask.description}
                          onChange={handleNewTaskChange}
                          placeholder="Enter task description"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            name="status"
                            value={newTask.status}
                            onValueChange={(value) => setNewTask((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="To Do">To Do</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select
                            name="priority"
                            value={newTask.priority}
                            onValueChange={(value) => setNewTask((prev) => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger id="priority">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                          id="dueDate"
                          name="dueDate"
                          type="date"
                          value={newTask.dueDate}
                          onChange={handleNewTaskChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="assignedTo">Assigned To</Label>
                        <Select
                          name="assignedTo"
                          value={newTask.assignedTo}
                          onValueChange={(value) => setNewTask((prev) => ({ ...prev, assignedTo: value }))}
                        >
                          <SelectTrigger id="assignedTo">
                            <SelectValue placeholder="Select person" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Thanusha">Thanusha</SelectItem>
                            <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                            <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          name="tags"
                          value={newTask.tags}
                          onChange={handleNewTaskChange}
                          placeholder="e.g. Marketing, Website"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleNewTaskSubmit}>Create Task</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* To Do Column */}
              <div
                className={`flex flex-col gap-4 ${dragOverColumn === "To Do" ? "bg-muted/50 rounded-lg p-2" : ""}`}
                onDragOver={(e) => handleDragOver(e, "To Do")}
                onDrop={(e) => handleDrop(e, "To Do")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">To Do</h3>
                  <Badge variant="outline" className="text-xs">
                    {tasks.filter((task) => task.status === "To Do").length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2 min-h-[200px]">
                  {tasks
                    .filter((task) => task.status === "To Do")
                    .map((task) => (
                      <Card
                        key={task.id}
                        className={`cursor-grab hover:shadow-md transition-shadow ${
                          draggedTask?.id === task.id ? "opacity-50" : ""
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              {task.title}
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => {/* Implement edit dialog logic here */}}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCycleTaskStatus(task.id)}>
                                  <CheckSquare className="mr-2 h-4 w-4" />
                                  Change Status
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTask(task.id)}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.assignedTo}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div
                className={`flex flex-col gap-4 ${dragOverColumn === "In Progress" ? "bg-muted/50 rounded-lg p-2" : ""}`}
                onDragOver={(e) => handleDragOver(e, "In Progress")}
                onDrop={(e) => handleDrop(e, "In Progress")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">In Progress</h3>
                  <Badge variant="outline" className="text-xs">
                    {tasks.filter((task) => task.status === "In Progress").length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2 min-h-[200px]">
                  {tasks
                    .filter((task) => task.status === "In Progress")
                    .map((task) => (
                      <Card
                        key={task.id}
                        className={`cursor-grab hover:shadow-md transition-shadow ${
                          draggedTask?.id === task.id ? "opacity-50" : ""
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              {task.title}
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => {/* Implement edit dialog logic here */}}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleMarkTaskDone(task.id)}>
                                  <CheckSquare className="mr-2 h-4 w-4" />
                                  Mark as Done
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTask(task.id)}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.assignedTo}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Done Column */}
              <div
                className={`flex flex-col gap-4 ${dragOverColumn === "Done" ? "bg-muted/50 rounded-lg p-2" : ""}`}
                onDragOver={(e) => handleDragOver(e, "Done")}
                onDrop={(e) => handleDrop(e, "Done")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Done</h3>
                  <Badge variant="outline" className="text-xs">
                    {tasks.filter((task) => task.status === "Done").length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2 min-h-[200px]">
                  {tasks
                    .filter((task) => task.status === "Done")
                    .map((task) => (
                      <Card
                        key={task.id}
                        className={`cursor-grab hover:shadow-md transition-shadow ${
                          draggedTask?.id === task.id ? "opacity-50" : ""
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              {task.title}
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => {/* Implement edit dialog logic here */}}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleChangeTaskStatus(task.id, "To Do")}>
                                  <CheckSquare className="mr-2 h-4 w-4" />
                                  Move to To Do
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTask(task.id)}>
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.assignedTo}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tasks List Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
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
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Task</th>
                      <th className="text-left p-4 hidden md:table-cell">Status</th>
                      <th className="text-left p-4 hidden md:table-cell">Priority</th>
                      <th className="text-left p-4 hidden md:table-cell">Due Date</th>
                      <th className="text-left p-4 hidden md:table-cell">Assigned To</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b">
                        <td className="p-4">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {task.status} · {task.priority} · {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Badge
                            variant={
                              task.status === "Done"
                                ? "default"
                                : task.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {task.status}
                          </Badge>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "High"
                                ? "bg-red-500/10 text-red-500"
                                : task.priority === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-green-500/10 text-green-500"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="p-4 hidden md:table-cell">{new Date(task.dueDate).toLocaleDateString()}</td>
                        <td className="p-4 hidden md:table-cell">{task.assignedTo}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => {/* Implement edit dialog logic here */}}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Change Status
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create</DialogTitle>
                      <DialogDescription>Add a new note to your collection.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="noteTitle">Title</Label>
                        <Input
                          id="noteTitle"
                          name="title"
                          value={newNote.title}
                          onChange={handleNewNoteChange}
                          placeholder="Enter note title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="noteContent">Content</Label>
                        <Textarea
                          id="noteContent"
                          name="content"
                          value={newNote.content}
                          onChange={handleNewNoteChange}
                          placeholder="Enter note content"
                          rows={6}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="noteTags">Tags (comma separated)</Label>
                        <Input
                          id="noteTags"
                          name="tags"
                          value={newNote.tags}
                          onChange={handleNewNoteChange}
                          placeholder="e.g. Meeting, Client"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewNoteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleNewNoteSubmit}>Create Note</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{note.title}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Full Note
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-line">{note.content}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      Updated {new Date(note.updatedAt).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Calendar</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Today
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 gap-px border-b bg-muted">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="bg-background p-3 text-center text-sm font-medium">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-muted">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const date = new Date()
                        date.setDate(date.getDate() - date.getDay() + i)
                        const isToday = new Date().toDateString() === date.toDateString()
                        const hasTask = tasks.some(
                          (task) => new Date(task.dueDate).toDateString() === date.toDateString(),
                        )

                        return (
                          <div
                            key={i}
                            className={`min-h-[100px] bg-background p-2 ${isToday ? "bg-primary/5 font-bold" : ""}`}
                          >
                            <div className="flex justify-between">
                              <span className={`text-sm ${isToday ? "text-primary" : ""}`}>{date.getDate()}</span>
                              {hasTask && <span className="flex h-2 w-2 rounded-full bg-primary"></span>}
                            </div>
                            <div className="mt-2">
                              {tasks
                                .filter((task) => new Date(task.dueDate).toDateString() === date.toDateString())
                                .slice(0, 2)
                                .map((task) => (
                                  <div
                                    key={task.id}
                                    className={`mb-1 truncate rounded-sm px-1 py-0.5 text-xs ${
                                      task.priority === "High"
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        : task.priority === "Medium"
                                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    }`}
                                  >
                                    {task.title}
                                  </div>
                                ))}
                              {tasks.filter((task) => new Date(task.dueDate).toDateString() === date.toDateString())
                                .length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +
                                  {tasks.filter((task) => new Date(task.dueDate).toDateString() === date.toDateString())
                                    .length - 2}{" "}
                                  more
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {tasks
                      .filter((task) => new Date(task.dueDate).toDateString() === new Date().toDateString())
                      .map((task) => (
                        <div key={task.id} className="flex items-center gap-4 rounded-lg border p-3">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-500"
                                : task.priority === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{task.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {task.status} • Assigned to {task.assignedTo}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkTaskDone(task.id)}>
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Mark as Done
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    {tasks.filter((task) => new Date(task.dueDate).toDateString() === new Date().toDateString())
                      .length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="text-muted-foreground">No tasks scheduled for today</div>
                        <Button variant="outline" className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Task
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {tasks
                      .filter((task) => {
                        const dueDate = new Date(task.dueDate)
                        const today = new Date()
                        const nextWeek = new Date()
                        nextWeek.setDate(today.getDate() + 7)
                        return dueDate > today && dueDate <= nextWeek && task.status !== "Done"
                      })
                      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                      .slice(0, 5)
                      .map((task) => (
                        <div key={task.id} className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                task.priority === "High"
                                  ? "bg-red-500"
                                  : task.priority === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            />
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="text-xs text-muted-foreground">
                                Due {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Badge variant={task.status === "In Progress" ? "secondary" : "outline"}>{task.status}</Badge>
                        </div>
                      ))}
                    {tasks.filter((task) => {
                      const dueDate = new Date(task.dueDate)
                      const today = new Date()
                      const nextWeek = new Date()
                      nextWeek.setDate(today.getDate() + 7)
                      return dueDate > today && dueDate <= nextWeek && task.status !== "Done"
                    }).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="text-muted-foreground">No upcoming tasks</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
