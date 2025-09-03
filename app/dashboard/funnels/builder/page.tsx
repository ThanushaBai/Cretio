"use client"

import React from "react"

import type { ElementType } from "react"
import { useState, useRef } from "react"
import {
  ArrowLeft,
  Copy,
  Heading1,
  Heading2,
  ImageIcon,
  LayoutGrid,
  Layers,
  List,
  MousePointer,
  MoveHorizontal,
  Save,
  Smartphone,
  Square,
  Tablet,
  Text,
  Video,
  Trash,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

// Element types for the funnel builder
type ElementType =
  | "heading1"
  | "heading2"
  | "paragraph"
  | "image"
  | "video"
  | "button"
  | "form"
  | "divider"
  | "spacer"
  | "container"
  | "columns-2"
  | "columns-3"

// Element interface
interface BuilderElement {
  id: string
  type: ElementType
  content?: string
  src?: string
  alt?: string
  children?: BuilderElement[]
  styles?: Record<string, string>
}

// Initial page structure
const initialElements: BuilderElement[] = [
  {
    id: "header",
    type: "container",
    styles: { padding: "20px", backgroundColor: "#ffffff" },
    children: [
      {
        id: "logo",
        type: "image",
        src: "/placeholder.svg?height=60&width=200",
        alt: "Logo",
        styles: { maxWidth: "200px" },
      },
    ],
  },
  {
    id: "hero",
    type: "container",
    styles: {
      padding: "60px 20px",
      backgroundColor: "#f9fafb",
      textAlign: "center",
    },
    children: [
      {
        id: "hero-heading",
        type: "heading1",
        content: "Welcome to Our Amazing Product",
        styles: {
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        },
      },
      {
        id: "hero-text",
        type: "paragraph",
        content: "The all-in-one solution for your business needs. Try it free for 14 days.",
        styles: {
          fontSize: "1.25rem",
          color: "#4b5563",
          marginBottom: "2rem",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
      {
        id: "hero-button",
        type: "button",
        content: "Get Started",
        styles: {
          backgroundColor: "#ec4899",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.375rem",
          fontWeight: "500",
          border: "none",
          cursor: "pointer",
        },
      },
    ],
  },
]

// Available elements for the sidebar
const availableElements = [
  { type: "heading1", icon: <Heading1 />, label: "Heading 1" },
  { type: "heading2", icon: <Heading2 />, label: "Heading 2" },
  { type: "paragraph", icon: <Text />, label: "Paragraph" },
  { type: "image", icon: <ImageIcon />, label: "Image" },
  { type: "video", icon: <Video />, label: "Video" },
  { type: "button", icon: <Square />, label: "Button" },
  { type: "form", icon: <List />, label: "Form" },
  { type: "divider", icon: <MoveHorizontal />, label: "Divider" },
  { type: "spacer", icon: <Layers />, label: "Spacer" },
  { type: "container", icon: <LayoutGrid />, label: "Container" },
  { type: "columns-2", icon: <LayoutGrid />, label: "2 Columns" },
  { type: "columns-3", icon: <LayoutGrid />, label: "3 Columns" },
] as const

export default function FunnelBuilderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [elements, setElements] = useState<BuilderElement[]>(initialElements)
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isDragging, setIsDragging] = useState(false)
  const [draggedElement, setDraggedElement] = useState<ElementType | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [funnelName, setFunnelName] = useState("New Funnel")
  const [isSaving, setIsSaving] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)

  // Find the selected element in the elements tree
  const findSelectedElement = (elements: BuilderElement[], id: string): BuilderElement | null => {
    for (const element of elements) {
      if (element.id === id) {
        return element
      }
      if (element.children) {
        const found = findSelectedElement(element.children, id)
        if (found) return found
      }
    }
    return null
  }

  // Get the selected element
  const selectedElement = selectedElementId ? findSelectedElement(elements, selectedElementId) : null

  // Handle element selection
  const handleSelectElement = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElementId(id)
  }

  // Handle drag start
  const handleDragStart = (type: ElementType) => {
    setIsDragging(true)
    setDraggedElement(type)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDropTarget(id)
  }

  // Improve drag and drop error handling
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!draggedElement) return

    try {
      // Create a new element with unique ID
      const newElement: BuilderElement = {
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: draggedElement,
      }

      // Add default content and styles based on type
      switch (draggedElement) {
        case "heading1":
          newElement.content = "Heading 1"
          newElement.styles = { fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }
          break
        case "heading2":
          newElement.content = "Heading 2"
          newElement.styles = { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }
          break
        case "paragraph":
          newElement.content = "This is a paragraph of text. Click to edit."
          newElement.styles = { marginBottom: "1rem" }
          break
        case "button":
          newElement.content = "Button"
          newElement.styles = {
            backgroundColor: "#ec4899",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }
          break
        case "image":
          newElement.src = "/placeholder.svg?height=200&width=400"
          newElement.alt = "Image"
          newElement.styles = { maxWidth: "100%", height: "auto" }
          break
        case "video":
          newElement.src = "https://example.com/video.mp4"
          newElement.styles = { width: "100%", height: "auto" }
          break
        case "form":
          newElement.styles = { padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "0.375rem" }
          break
        case "divider":
          newElement.styles = { borderTop: "1px solid #e5e7eb", margin: "1rem 0" }
          break
        case "spacer":
          newElement.styles = { height: "2rem" }
          break
        case "container":
          newElement.children = []
          newElement.styles = { padding: "20px", backgroundColor: "#ffffff", minHeight: "50px" }
          break
        case "columns-2":
          newElement.children = [
            {
              id: `column-1-${Date.now()}`,
              type: "container",
              children: [],
              styles: { padding: "10px", minHeight: "100px", border: "1px dashed #e5e7eb" },
            },
            {
              id: `column-2-${Date.now()}`,
              type: "container",
              children: [],
              styles: { padding: "10px", minHeight: "100px", border: "1px dashed #e5e7eb" },
            },
          ]
          newElement.styles = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }
          break
        case "columns-3":
          newElement.children = [
            {
              id: `column-1-${Date.now()}`,
              type: "container",
              children: [],
              styles: { padding: "10px", minHeight: "100px", border: "1px dashed #e5e7eb" },
            },
            {
              id: `column-2-${Date.now()}`,
              type: "container",
              children: [],
              styles: { padding: "10px", minHeight: "100px", border: "1px dashed #e5e7eb" },
            },
            {
              id: `column-3-${Date.now()}`,
              type: "container",
              children: [],
              styles: { padding: "10px", minHeight: "100px", border: "1px dashed #e5e7eb" },
            },
          ]
          newElement.styles = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }
          break
      }

      // Add the new element to the target container
      const addElementToContainer = (elements: BuilderElement[], targetId: string): BuilderElement[] => {
        return elements.map((element) => {
          if (element.id === targetId) {
            // If the target is a container, add to its children
            if (element.children !== undefined) {
              return {
                ...element,
                children: [...element.children, newElement],
              }
            }
            // Otherwise, we can't add to this element
            return element
          }

          // Recursively check children
          if (element.children) {
            return {
              ...element,
              children: addElementToContainer(element.children, targetId),
            }
          }

          return element
        })
      }

      setElements(addElementToContainer(elements, targetId))
      setSelectedElementId(newElement.id)

      toast({
        title: "Element added",
        description: `${availableElements.find((e) => e.type === draggedElement)?.label} has been added to the funnel.`,
      })
    } catch (error) {
      console.error("Error adding element:", error)
      toast({
        title: "Error",
        description: "Failed to add element. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDragging(false)
      setDraggedElement(null)
      setDropTarget(null)
    }
  }

  // Handle element content change
  const handleElementChange = (property: string, value: string) => {
    if (!selectedElementId) return

    const updateElement = (elements: BuilderElement[]): BuilderElement[] => {
      return elements.map((element) => {
        if (element.id === selectedElementId) {
          return {
            ...element,
            [property]: value,
          }
        }

        if (element.children) {
          return {
            ...element,
            children: updateElement(element.children),
          }
        }

        return element
      })
    }

    setElements(updateElement(elements))
  }

  // Handle element style change
  const handleStyleChange = (property: string, value: string) => {
    if (!selectedElementId) return

    const updateElementStyle = (elements: BuilderElement[]): BuilderElement[] => {
      return elements.map((element) => {
        if (element.id === selectedElementId) {
          return {
            ...element,
            styles: {
              ...element.styles,
              [property]: value,
            },
          }
        }

        if (element.children) {
          return {
            ...element,
            children: updateElementStyle(element.children),
          }
        }

        return element
      })
    }

    setElements(updateElementStyle(elements))
  }

  // Handle element deletion
  const handleDeleteElement = (id: string) => {
    const deleteElement = (elements: BuilderElement[]): BuilderElement[] => {
      return elements.filter((element) => {
        if (element.id === id) {
          return false
        }

        if (element.children) {
          element.children = deleteElement(element.children)
        }

        return true
      })
    }

    setElements(deleteElement(elements))
    setSelectedElementId(null)
  }

  // Fix the duplicateElement function to avoid infinite recursion
  const handleDuplicateElement = (id: string) => {
    const duplicateElementRecursive = (element: BuilderElement): BuilderElement => {
      const duplicated: BuilderElement = {
        ...element,
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        children: element.children ? element.children.map(duplicateElementRecursive) : undefined,
      }
      return duplicated
    }

    const duplicateInElements = (elements: BuilderElement[]): BuilderElement[] => {
      return elements.flatMap((element) => {
        if (element.id === id) {
          const duplicated = duplicateElementRecursive(element)
          return [element, duplicated]
        }

        if (element.children) {
          return {
            ...element,
            children: duplicateInElements(element.children),
          }
        }

        return element
      })
    }

    setElements(duplicateInElements(elements))
  }

  // Handle save funnel
  const handleSaveFunnel = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Funnel saved",
        description: `${funnelName} has been saved successfully.`,
      })
    }, 1500)
  }

  // Fix the renderElement function with proper key handling
  const renderElement = (element: BuilderElement, index: number): React.ReactNode => {
    const isSelected = selectedElementId === element.id
    const isDropTargetActive = dropTarget === element.id

    const elementStyles: React.CSSProperties = {
      ...element.styles,
      ...(isSelected ? { outline: "2px solid #ec4899", outlineOffset: "2px" } : {}),
      ...(isDropTargetActive ? { backgroundColor: "rgba(236, 72, 153, 0.1)" } : {}),
    }

    const elementProps = {
      style: elementStyles,
      onClick: (e: React.MouseEvent) => handleSelectElement(element.id, e),
      onDragOver: (e: React.DragEvent) => handleDragOver(e, element.id),
      onDrop: (e: React.DragEvent) => handleDrop(e, element.id),
      className: `relative ${isSelected ? "builder-selected" : ""} ${isDropTargetActive ? "builder-drop-target" : ""}`,
    }

    const renderChildren = () => {
      return element.children?.map((child, childIndex) => renderElement(child, childIndex))
    }

    switch (element.type) {
      case "heading1":
        return (
          <h1 key={element.id} {...elementProps}>
            {element.content}
          </h1>
        )
      case "heading2":
        return (
          <h2 key={element.id} {...elementProps}>
            {element.content}
          </h2>
        )
      case "paragraph":
        return (
          <p key={element.id} {...elementProps}>
            {element.content}
          </p>
        )
      case "image":
        return (
          <div key={element.id} {...elementProps}>
            <img
              src={element.src || "/placeholder.svg?height=200&width=400"}
              alt={element.alt || "Image"}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )
      case "video":
        return (
          <div key={element.id} {...elementProps}>
            <video src={element.src} controls style={{ maxWidth: "100%", height: "auto" }}>
              Your browser does not support the video tag.
            </video>
          </div>
        )
      case "button":
        return (
          <button key={element.id} {...elementProps}>
            {element.content}
          </button>
        )
      case "form":
        return (
          <form key={element.id} {...elementProps}>
            <div className="space-y-4">
              <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded" />
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                Submit
              </button>
            </div>
          </form>
        )
      case "divider":
        return <hr key={element.id} {...elementProps} />
      case "spacer":
        return <div key={element.id} {...elementProps}></div>
      case "container":
        return (
          <div key={element.id} {...elementProps}>
            {renderChildren()}
          </div>
        )
      case "columns-2":
      case "columns-3":
        return (
          <div key={element.id} {...elementProps}>
            {renderChildren()}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/funnels")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Input value={funnelName} onChange={(e) => setFunnelName(e.target.value)} className="h-8 w-48 text-sm" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border p-1">
            <Button
              variant={viewMode === "desktop" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("desktop")}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSaveFunnel} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex w-64 flex-col border-r">
          <Tabs defaultValue="elements">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="elements">Elements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="elements" className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-2">
                {availableElements.map((element) => (
                  <div
                    key={element.type}
                    draggable
                    onDragStart={() => handleDragStart(element.type as ElementType)}
                    className="flex flex-col items-center justify-center rounded-md border p-2 hover:bg-muted/50 cursor-move"
                  >
                    <div className="mb-1">{element.icon}</div>
                    <span className="text-xs">{element.label}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="settings" className="flex-1 overflow-auto p-4">
              {selectedElement ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      {availableElements.find((e) => e.type === selectedElement.type)?.label || "Element"}
                    </h3>
                    <div className="flex gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleDuplicateElement(selectedElement.id)}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Duplicate</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => handleDeleteElement(selectedElement.id)}
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Content settings */}
                  {(selectedElement.type === "heading1" ||
                    selectedElement.type === "heading2" ||
                    selectedElement.type === "paragraph" ||
                    selectedElement.type === "button") && (
                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-xs">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        value={selectedElement.content || ""}
                        onChange={(e) => handleElementChange("content", e.target.value)}
                        className="h-20 text-sm"
                      />
                    </div>
                  )}

                  {/* Image settings */}
                  {selectedElement.type === "image" && (
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="src" className="text-xs">
                          Image URL
                        </Label>
                        <Input
                          id="src"
                          value={selectedElement.src || ""}
                          onChange={(e) => handleElementChange("src", e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alt" className="text-xs">
                          Alt Text
                        </Label>
                        <Input
                          id="alt"
                          value={selectedElement.alt || ""}
                          onChange={(e) => handleElementChange("alt", e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Video settings */}
                  {selectedElement.type === "video" && (
                    <div className="space-y-2">
                      <Label htmlFor="src" className="text-xs">
                        Video URL
                      </Label>
                      <Input
                        id="src"
                        value={selectedElement.src || ""}
                        onChange={(e) => handleElementChange("src", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  )}

                  {/* Style settings */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium">Styles</h4>

                    {/* Background color */}
                    <div className="grid grid-cols-3 gap-2">
                      <Label htmlFor="bg-color" className="text-xs flex items-center">
                        Background
                      </Label>
                      <Input
                        id="bg-color"
                        type="color"
                        value={selectedElement.styles?.backgroundColor || "#ffffff"}
                        onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                        className="col-span-2 h-8"
                      />
                    </div>

                    {/* Text color */}
                    {(selectedElement.type === "heading1" ||
                      selectedElement.type === "heading2" ||
                      selectedElement.type === "paragraph" ||
                      selectedElement.type === "button") && (
                      <div className="grid grid-cols-3 gap-2">
                        <Label htmlFor="text-color" className="text-xs flex items-center">
                          Text Color
                        </Label>
                        <Input
                          id="text-color"
                          type="color"
                          value={selectedElement.styles?.color || "#000000"}
                          onChange={(e) => handleStyleChange("color", e.target.value)}
                          className="col-span-2 h-8"
                        />
                      </div>
                    )}

                    {/* Padding */}
                    <div className="grid grid-cols-3 gap-2">
                      <Label htmlFor="padding" className="text-xs flex items-center">
                        Padding
                      </Label>
                      <Input
                        id="padding"
                        value={selectedElement.styles?.padding || "0px"}
                        onChange={(e) => handleStyleChange("padding", e.target.value)}
                        className="col-span-2 h-8 text-sm"
                        placeholder="e.g. 10px or 10px 20px"
                      />
                    </div>

                    {/* Margin */}
                    <div className="grid grid-cols-3 gap-2">
                      <Label htmlFor="margin" className="text-xs flex items-center">
                        Margin
                      </Label>
                      <Input
                        id="margin"
                        value={selectedElement.styles?.margin || "0px"}
                        onChange={(e) => handleStyleChange("margin", e.target.value)}
                        className="col-span-2 h-8 text-sm"
                        placeholder="e.g. 10px or 10px 20px"
                      />
                    </div>

                    {/* Font size */}
                    {(selectedElement.type === "heading1" ||
                      selectedElement.type === "heading2" ||
                      selectedElement.type === "paragraph" ||
                      selectedElement.type === "button") && (
                      <div className="grid grid-cols-3 gap-2">
                        <Label htmlFor="font-size" className="text-xs flex items-center">
                          Font Size
                        </Label>
                        <Input
                          id="font-size"
                          value={selectedElement.styles?.fontSize || "16px"}
                          onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                          className="col-span-2 h-8 text-sm"
                          placeholder="e.g. 16px or 1rem"
                        />
                      </div>
                    )}

                    {/* Font weight */}
                    {(selectedElement.type === "heading1" ||
                      selectedElement.type === "heading2" ||
                      selectedElement.type === "paragraph" ||
                      selectedElement.type === "button") && (
                      <div className="grid grid-cols-3 gap-2">
                        <Label htmlFor="font-weight" className="text-xs flex items-center">
                          Font Weight
                        </Label>
                        <Select
                          value={selectedElement.styles?.fontWeight || "normal"}
                          onValueChange={(value) => handleStyleChange("fontWeight", value)}
                        >
                          <SelectTrigger id="font-weight" className="col-span-2 h-8 text-sm">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="lighter">Lighter</SelectItem>
                            <SelectItem value="bolder">Bolder</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="200">200</SelectItem>
                            <SelectItem value="300">300</SelectItem>
                            <SelectItem value="400">400</SelectItem>
                            <SelectItem value="500">500</SelectItem>
                            <SelectItem value="600">600</SelectItem>
                            <SelectItem value="700">700</SelectItem>
                            <SelectItem value="800">800</SelectItem>
                            <SelectItem value="900">900</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Text align */}
                    {(selectedElement.type === "heading1" ||
                      selectedElement.type === "heading2" ||
                      selectedElement.type === "paragraph") && (
                      <div className="grid grid-cols-3 gap-2">
                        <Label htmlFor="text-align" className="text-xs flex items-center">
                          Text Align
                        </Label>
                        <Select
                          value={selectedElement.styles?.textAlign || "left"}
                          onValueChange={(value) => handleStyleChange("textAlign", value)}
                        >
                          <SelectTrigger id="text-align" className="col-span-2 h-8 text-sm">
                            <SelectValue placeholder="Select alignment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="justify">Justify</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                  <div>
                    <MousePointer className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p>Select an element to edit its properties</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-muted/20 p-4">
          <div
            ref={editorRef}
            className={`mx-auto bg-white shadow-sm transition-all ${
              viewMode === "desktop"
                ? "w-full max-w-6xl"
                : viewMode === "tablet"
                  ? "w-full max-w-md"
                  : "w-full max-w-sm"
            }`}
            onClick={() => setSelectedElementId(null)}
          >
            {elements.map((element, index) => renderElement(element, index))}
          </div>
        </div>
      </div>
    </div>
  )
}
