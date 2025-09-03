"use client"

import { AlertDialogTrigger } from "@/components/ui/alert-dialog"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowUpDown,
  File,
  FileImage,
  FileText,
  FilmIcon,
  FolderPlus,
  Grid,
  List,
  MoreHorizontal,
  Search,
  Trash,
  Upload,
  Download,
  X,
  Eye,
  ExternalLink,
  Pencil,
  FolderIcon,
  Move,
  Share2,
  Star,
  StarOff,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { useToast } from "@/hooks/use-toast"
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
import { Checkbox } from "@/components/ui/checkbox"

// Mock data with improved thumbnails
const files = [
  {
    id: "file-1",
    name: "hero-image.jpg",
    type: "image/jpeg",
    size: "1.2 MB",
    dimensions: "1920x1080",
    uploadedAt: "Mar 15, 2025",
    folder: "Website Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Hero+Image",
    starred: false,
  },
  {
    id: "file-2",
    name: "product-brochure.pdf",
    type: "application/pdf",
    size: "3.5 MB",
    dimensions: "-",
    uploadedAt: "Mar 12, 2025",
    folder: "Marketing",
    thumbnail: "/placeholder.svg?height=100&width=100&text=PDF",
    starred: true,
  },
  {
    id: "file-3",
    name: "team-photo.png",
    type: "image/png",
    size: "2.8 MB",
    dimensions: "2400x1600",
    uploadedAt: "Mar 10, 2025",
    folder: "About Us",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Team+Photo",
    starred: false,
  },
  {
    id: "file-4",
    name: "product-demo.mp4",
    type: "video/mp4",
    size: "24.5 MB",
    dimensions: "1920x1080",
    uploadedAt: "Mar 8, 2025",
    folder: "Product",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Video",
    starred: false,
  },
  {
    id: "file-5",
    name: "logo.svg",
    type: "image/svg+xml",
    size: "45 KB",
    dimensions: "512x512",
    uploadedAt: "Mar 5, 2025",
    folder: "Brand Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Logo",
    starred: true,
  },
  {
    id: "file-6",
    name: "customer-testimonial.mp4",
    type: "video/mp4",
    size: "18.2 MB",
    dimensions: "1920x1080",
    uploadedAt: "Mar 3, 2025",
    folder: "Testimonials",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Video",
    starred: false,
  },
  {
    id: "file-7",
    name: "pricing-sheet.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: "250 KB",
    dimensions: "-",
    uploadedAt: "Mar 1, 2025",
    folder: "Sales",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Excel",
    starred: false,
  },
  {
    id: "file-8",
    name: "banner-image.jpg",
    type: "image/jpeg",
    size: "850 KB",
    dimensions: "1200x600",
    uploadedAt: "Feb 28, 2025",
    folder: "Website Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Banner",
    starred: false,
  },
  {
    id: "file-9",
    name: "company-logo.png",
    type: "image/png",
    size: "120 KB",
    dimensions: "500x500",
    uploadedAt: "Mar 16, 2025",
    folder: "Brand Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Company+Logo",
    starred: true,
  },
  {
    id: "file-10",
    name: "client-logo-acme.svg",
    type: "image/svg+xml",
    size: "35 KB",
    dimensions: "400x200",
    uploadedAt: "Mar 16, 2025",
    folder: "Client Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Acme+Logo",
    starred: false,
  },
  {
    id: "file-11",
    name: "client-logo-globex.png",
    type: "image/png",
    size: "85 KB",
    dimensions: "400x200",
    uploadedAt: "Mar 16, 2025",
    folder: "Client Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Globex+Logo",
    starred: false,
  },
  {
    id: "file-12",
    name: "client-logo-initech.svg",
    type: "image/svg+xml",
    size: "42 KB",
    dimensions: "400x200",
    uploadedAt: "Mar 16, 2025",
    folder: "Client Assets",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Initech+Logo",
    starred: false,
  },
]

const folders = [
  {
    id: "folder-1",
    name: "Website Assets",
    files: 12,
    size: "45.2 MB",
    updatedAt: "Mar 15, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Website+Assets",
    color: "#4f46e5",
  },
  {
    id: "folder-2",
    name: "Marketing",
    files: 8,
    size: "32.5 MB",
    updatedAt: "Mar 12, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Marketing",
    color: "#ec4899",
  },
  {
    id: "folder-3",
    name: "About Us",
    files: 5,
    size: "18.7 MB",
    updatedAt: "Mar 10, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=About+Us",
    color: "#10b981",
  },
  {
    id: "folder-4",
    name: "Product",
    files: 15,
    size: "120.5 MB",
    updatedAt: "Mar 8, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Product",
    color: "#f59e0b",
  },
  {
    id: "folder-5",
    name: "Brand Assets",
    files: 7,
    size: "15.2 MB",
    updatedAt: "Mar 5, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Brand+Assets",
    color: "#3b82f6",
  },
  {
    id: "folder-6",
    name: "Testimonials",
    files: 10,
    size: "85.3 MB",
    updatedAt: "Mar 3, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Testimonials",
    color: "#8b5cf6",
  },
  {
    id: "folder-7",
    name: "Sales",
    files: 6,
    size: "12.8 MB",
    updatedAt: "Mar 1, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Sales",
    color: "#ef4444",
  },
  {
    id: "folder-8",
    name: "Client Assets",
    files: 15,
    size: "28.4 MB",
    updatedAt: "Mar 16, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Client+Assets",
    color: "#0ea5e9",
  },
  {
    id: "folder-9",
    name: "Logos",
    files: 8,
    size: "5.6 MB",
    updatedAt: "Mar 16, 2025",
    thumbnail: "/placeholder.svg?height=100&width=100&text=Logos",
    color: "#6366f1",
  },
]

export default function MediaLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [folderFilter, setFolderFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [previewFile, setPreviewFile] = useState<any | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null)
  const [folderList, setFolderList] = useState(folders)
  const [fileList, setFileList] = useState(files)
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null)
  const [isRenameFolderOpen, setIsRenameFolderOpen] = useState(false)
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = useState(false)
  const [isRenameFileOpen, setIsRenameFileOpen] = useState(false)
  const [selectedFileForRename, setSelectedFileForRename] = useState<any | null>(null)
  const [newFileName, setNewFileName] = useState("")
  const [isMovingFile, setIsMovingFile] = useState(false)
  const [selectedFileForMove, setSelectedFileForMove] = useState<any | null>(null)
  const [targetFolder, setTargetFolder] = useState("")
  const [isDeleteFileOpen, setIsDeleteFileOpen] = useState(false)
  const [selectedFileForDelete, setSelectedFileForDelete] = useState<any | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isBatchActionOpen, setIsBatchActionOpen] = useState(false)

  const { toast } = useToast()

  const allFiles = [...fileList, ...uploadedFiles]

  const filteredFiles = allFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = folderFilter === "all" || file.folder === folderFilter
    const matchesType = typeFilter === "all" || file.type.startsWith(typeFilter)

    return matchesSearch && matchesFolder && matchesType
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files)
    }
  }

  const handleUploadSubmit = () => {
    if (!selectedFiles || selectedFiles.length === 0) return

    // Create new file objects from the selected files
    const newFiles = Array.from(selectedFiles).map((file, index) => {
      return {
        id: `uploaded-${Date.now()}-${index}`,
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        dimensions: file.type.startsWith("image/") ? "1000x1000" : "-",
        uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        folder: document.getElementById("folder")
          ? (document.getElementById("folder") as HTMLSelectElement).value
          : "Uploads",
        thumbnail: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : file.type.startsWith("video/")
            ? "/placeholder.svg?height=100&width=100&text=Video"
            : file.type.includes("pdf")
              ? "/placeholder.svg?height=100&width=100&text=PDF"
              : "/placeholder.svg?height=100&width=100",
        starred: false,
      }
    })

    // Add the new files to the state
    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Update the UI immediately
    setViewMode(viewMode === "grid" ? "list" : "grid")
    setTimeout(() => setViewMode(viewMode), 10)

    toast({
      title: "Files uploaded successfully",
      description: `${selectedFiles.length} file(s) have been uploaded`,
    })

    setIsUploadDialogOpen(false)
    setSelectedFiles(null)
  }

  const handleNewFolderSubmit = () => {
    if (!newFolderName.trim()) return

    // Create a new folder object
    const folderData = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      files: 0,
      size: "0 KB",
      updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      thumbnail: `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(newFolderName)}`,
      color: getRandomColor(),
    }

    // Add the new folder to the folders array
    setFolderList([...folderList, folderData])

    toast({
      title: "Folder created successfully",
      description: `Folder "${newFolderName}" has been created`,
    })

    setIsNewFolderDialogOpen(false)
    setNewFolderName("")
  }

  const getRandomColor = () => {
    const colors = ["#4f46e5", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444", "#0ea5e9", "#6366f1"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <FileImage className="h-6 w-6 text-blue-500" />
    } else if (fileType.startsWith("video/")) {
      return <FilmIcon className="h-6 w-6 text-purple-500" />
    } else if (fileType.startsWith("application/pdf")) {
      return <FileText className="h-6 w-6 text-red-500" />
    } else {
      return <File className="h-6 w-6 text-gray-500" />
    }
  }

  // Function to handle file preview
  const handlePreview = (file: any) => {
    // Import the action handler dynamically
    import("./actions").then(({ handleFileOperation }) => {
      handleFileOperation("preview", file, () => {
        setPreviewFile(file)
        setIsPreviewOpen(true)
      })
    })
  }

  // Function to handle file download
  const handleDownload = (file: any) => {
    // Import the action handler dynamically
    import("./actions").then(({ handleFileOperation }) => {
      handleFileOperation("download", file, () => {
        // For demo purposes, we'll simulate a download with a progress indicator
        setDownloadProgress(0)

        // Create a download link
        const link = document.createElement("a")
        
        // For real files, you would use the actual file URL
        // For our mock data, we'll use the thumbnail or a placeholder
        const fileUrl = file.thumbnail || "/placeholder.svg"

        // Set link properties
        link.href = fileUrl
        link.download = file.name

        // Simulate download progress
        const interval = setInterval(() => {
          setDownloadProgress((prev) => {
            if (prev === null || prev >= 100) {
              clearInterval(interval)

              // Trigger the download
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)

              // Reset progress after a delay
              setTimeout(() => setDownloadProgress(null), 500)
              return 100
            }
            return prev + 10
          })
        }, 100)
      })
    })
  }

  // Function to get file preview content based on file type
  const getPreviewContent = (file: any) => {
    if (!file) return null

    if (file.type.startsWith("image/")) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={file.thumbnail || "/placeholder.svg"}
            alt={file.name}
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>
      )
    } else if (file.type === "application/pdf") {
      return (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-red-500" />
          <p className="mt-4 text-lg font-medium">PDF Preview</p>
          <p className="text-sm text-muted-foreground">{file.name}</p>
          <Button className="mt-4" onClick={() => window.open(file.thumbnail || "/placeholder.svg", "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open PDF
          </Button>
        </div>
      )
    } else if (file.type.startsWith("video/")) {
      return (
        <div className="flex h-[70vh] w-full items-center justify-center">
          <FilmIcon className="h-16 w-16 text-purple-500" />
          <p className="mt-4 text-lg font-medium">Video Preview</p>
          <p className="text-sm text-muted-foreground">{file.name}</p>
          <Button className="mt-4" onClick={() => window.open(file.thumbnail || "/placeholder.svg", "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Video
          </Button>
        </div>
      )
    } else {
      return (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center">
          {getFileIcon(file.type)}
          <p className="mt-4 text-lg font-medium">File Preview</p>
          <p className="text-sm text-muted-foreground">{file.name}</p>
          <p className="text-xs text-muted-foreground">({file.type})</p>
        </div>
      )
    }
  }

  // Folder action handlers
  const handleRenameFolder = (folder: any) => {
    setSelectedFolder(folder)
    setNewFolderName(folder.name)
    setIsRenameFolderOpen(true)
  }

  const handleDeleteFolder = (folder: any) => {
    setSelectedFolder(folder)
    setIsDeleteFolderOpen(true)
  }

  const confirmRenameFolder = () => {
    if (!selectedFolder || !newFolderName.trim()) return

    // Update the folder name
    const updatedFolders = folderList.map((folder) => {
      if (folder.id === selectedFolder.id) {
        return {
          ...folder,
          name: newFolderName,
          thumbnail: `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(newFolderName)}`,
        }
      }
      return folder
    })

    setFolderList(updatedFolders)

    // Also update folder references in files
    const updatedFiles = fileList.map((file) => {
      if (file.folder === selectedFolder.name) {
        return {
          ...file,
          folder: newFolderName,
        }
      }
      return file
    })

    setFileList(updatedFiles)

    toast({
      title: "Folder renamed",
      description: `Folder has been renamed to "${newFolderName}"`,
    })

    setIsRenameFolderOpen(false)
  }

  const confirmDeleteFolder = () => {
    if (!selectedFolder) return

    // Remove the folder
    setFolderList(folderList.filter((folder) => folder.id !== selectedFolder.id))

    // Update files that were in this folder
    const updatedFiles = fileList.map((file) => {
      if (file.folder === selectedFolder.name) {
        return {
          ...file,
          folder: "Uncategorized",
        }
      }
      return file
    })

    setFileList(updatedFiles)

    toast({
      title: "Folder deleted",
      description: `Folder "${selectedFolder.name}" has been deleted`,
    })

    setIsDeleteFolderOpen(false)
  }

  // File action handlers
  const handleRenameFile = (file: any) => {
    setSelectedFileForRename(file)
    setNewFileName(file.name)
    setIsRenameFileOpen(true)
  }

  const confirmRenameFile = () => {
    if (!selectedFileForRename || !newFileName.trim()) return

    // Update the file name
    const updatedFiles = fileList.map((file) => {
      if (file.id === selectedFileForRename.id) {
        return {
          ...file,
          name: newFileName,
        }
      }
      return file
    })

    setFileList(updatedFiles)

    toast({
      title: "File renamed",
      description: `File has been renamed to "${newFileName}"`,
    })

    setIsRenameFileOpen(false)
  }

  const handleMoveFile = (file: any) => {
    setSelectedFileForMove(file)
    setTargetFolder(file.folder)
    setIsMovingFile(true)
  }

  const confirmMoveFile = () => {
    if (!selectedFileForMove || !targetFolder) return

    // Update the file's folder
    const updatedFiles = fileList.map((file) => {
      if (file.id === selectedFileForMove.id) {
        return {
          ...file,
          folder: targetFolder,
        }
      }
      return file
    })

    setFileList(updatedFiles)

    toast({
      title: "File moved",
      description: `File has been moved to "${targetFolder}"`,
    })

    setIsMovingFile(false)
  }

  const handleDeleteFile = (file: any) => {
    setSelectedFileForDelete(file)
    setIsDeleteFileOpen(true)
  }

  const confirmDeleteFile = () => {
    if (!selectedFileForDelete) return

    // Remove the file
    setFileList(fileList.filter((file) => file.id !== selectedFileForDelete.id))

    toast({
      title: "File deleted",
      description: `File "${selectedFileForDelete.name}" has been deleted`,
    })

    setIsDeleteFileOpen(false)
  }

  const toggleStarFile = (fileId: string) => {
    const updatedFiles = fileList.map((file) => {
      if (file.id === fileId) {
        return {
          ...file,
          starred: !file.starred,
        }
      }
      return file
    })

    setFileList(updatedFiles)

    const file = fileList.find((f) => f.id === fileId)
    if (file) {
      toast({
        title: file.starred ? "Removed from favorites" : "Added to favorites",
        description: `"${file.name}" has been ${file.starred ? "removed from" : "added to"} favorites`,
      })
    }
  }

  // Batch actions
  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredFiles.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredFiles.map((file) => file.id))
    }
  }

  const handleBatchDelete = () => {
    // Remove all selected files
    setFileList(fileList.filter((file) => !selectedItems.includes(file.id)))

    toast({
      title: "Files deleted",
      description: `${selectedItems.length} files have been deleted`,
    })

    setSelectedItems([])
    setIsBatchActionOpen(false)
  }

  const handleBatchMove = (targetFolder: string) => {
    // Move all selected files to the target folder
    const updatedFiles = fileList.map((file) => {
      if (selectedItems.includes(file.id)) {
        return {
          ...file,
          folder: targetFolder,
        }
      }
      return file
    })

    setFileList(updatedFiles)

    toast({
      title: "Files moved",
      description: `${selectedItems.length} files have been moved to "${targetFolder}"`,
    })

    setSelectedItems([])
    setIsBatchActionOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground">Upload, organize, and manage your media files.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by folder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              {folderList.map((folder) => (
                <SelectItem key={folder.id} value={folder.name}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image/">Images</SelectItem>
              <SelectItem value="video/">Videos</SelectItem>
              <SelectItem value="application/pdf">PDFs</SelectItem>
              <SelectItem value="application/">Documents</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 rounded-md border p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
              <DialogDescription>Select files to upload to your media library.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="files">Files</Label>
                <Input id="files" type="file" multiple onChange={handleFileUpload} />
                {selectedFiles && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Selected files:</p>
                    <ul className="mt-1 text-sm text-muted-foreground">
                      {Array.from(selectedFiles).map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="folder">Folder</Label>
                <Select defaultValue={folderList[0].name}>
                  <SelectTrigger id="folder">
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folderList.map((folder) => (
                      <SelectItem key={folder.id} value={folder.name}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadSubmit} disabled={!selectedFiles}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>Enter a name for your new folder.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="folderName">Folder Name</Label>
                <Input
                  id="folderName"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="My Folder"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewFolderSubmit} disabled={!newFolderName.trim()}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Batch Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between rounded-md border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedItems.length} items selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isBatchActionOpen} onOpenChange={setIsBatchActionOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Move className="mr-2 h-3.5 w-3.5" />
                  Move
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Move Files</DialogTitle>
                  <DialogDescription>Select a destination folder for the selected files.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="targetFolder">Destination Folder</Label>
                    <Select defaultValue={folderList[0].name} onValueChange={setTargetFolder}>
                      <SelectTrigger id="targetFolder">
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {folderList.map((folder) => (
                          <SelectItem key={folder.id} value={folder.name}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBatchActionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleBatchMove(targetFolder)}>Move Files</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-3.5 w-3.5" />
              Download
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <Trash className="mr-2 h-3.5 w-3.5" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Files</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedItems.length} files? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleBatchDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      <Tabs defaultValue="files" className="space-y-4">
        <TabsList>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
        </TabsList>
        <TabsContent value="files" className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredFiles.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">No files found.</p>
                </div>
              ) : (
                filteredFiles.map((file) => (
                  <div key={file.id} className="group relative overflow-hidden rounded-lg border bg-background">
                    <div className="absolute left-2 top-2 z-10">
                      <Checkbox
                        checked={selectedItems.includes(file.id)}
                        onCheckedChange={() => handleSelectItem(file.id)}
                        className="h-4 w-4 rounded-sm border-white bg-black/30 opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100"
                      />
                    </div>
                    <div className="absolute right-2 top-2 z-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handlePreview(file)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(file)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRenameFile(file)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMoveFile(file)}>
                            <Move className="mr-2 h-4 w-4" />
                            Move
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStarFile(file.id)}>
                            {file.starred ? (
                              <>
                                <StarOff className="mr-2 h-4 w-4" />
                                Remove from favorites
                              </>
                            ) : (
                              <>
                                <Star className="mr-2 h-4 w-4" />
                                Add to favorites
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFile(file)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="aspect-square w-full overflow-hidden bg-muted">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.thumbnail || "/placeholder.svg"}
                          alt={file.name}
                          className="h-full w-full object-cover transition-all hover:scale-105 cursor-pointer"
                          onClick={() => handlePreview(file)}
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center cursor-pointer"
                          onClick={() => handlePreview(file)}
                        >
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      {file.starred && (
                        <div className="absolute bottom-2 right-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="truncate font-medium">{file.name}</div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <span>{file.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedItems.length > 0 && selectedItems.length === filteredFiles.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-[300px]">
                      <div className="flex items-center gap-1">
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Folder</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No files found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(file.id)}
                            onCheckedChange={() => handleSelectItem(file.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="font-medium">{file.name}</span>
                            {file.starred && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                          </div>
                        </TableCell>
                        <TableCell>{file.type.split("/")[1]}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.dimensions}</TableCell>
                        <TableCell>{file.folder}</TableCell>
                        <TableCell>{file.uploadedAt}</TableCell>
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
                              <DropdownMenuItem onClick={() => handlePreview(file)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownload(file)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRenameFile(file)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMoveFile(file)}>
                                <Move className="mr-2 h-4 w-4" />
                                Move
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleStarFile(file.id)}>
                                {file.starred ? (
                                  <>
                                    <StarOff className="mr-2 h-4 w-4" />
                                    Remove from favorites
                                  </>
                                ) : (
                                  <>
                                    <Star className="mr-2 h-4 w-4" />
                                    Add to favorites
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFile(file)}>
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
          )}
        </TabsContent>
        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {folderList.map((folder) => (
              <div key={folder.id} className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="absolute right-2 top-2 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setFolderFilter(folder.name)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Contents
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRenameFolder(folder)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFolder(folder)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  className="aspect-square w-full cursor-pointer overflow-hidden bg-muted"
                  onClick={() => setFolderFilter(folder.name)}
                >
                  <div
                    className="flex h-full w-full flex-col items-center justify-center p-4"
                    style={{ backgroundColor: `${folder.color}10` }}
                  >
                    <FolderIcon className="h-16 w-16" style={{ color: folder.color }} />
                    <span className="mt-2 text-center font-medium">{folder.name}</span>
                    <span className="text-xs text-muted-foreground">{folder.files} files</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="logos" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredFiles
              .filter(
                (file) =>
                  file.name.toLowerCase().includes("logo") ||
                  file.folder === "Logos" ||
                  file.folder === "Brand Assets" ||
                  file.folder === "Client Assets",
              )
              .map((file) => (
                <div key={file.id} className="group relative overflow-hidden rounded-lg border bg-background">
                  <div className="absolute left-2 top-2 z-10">
                    <Checkbox
                      checked={selectedItems.includes(file.id)}
                      onCheckedChange={() => handleSelectItem(file.id)}
                      className="h-4 w-4 rounded-sm border-white bg-black/30 opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100"
                    />
                  </div>
                  <div className="absolute right-2 top-2 z-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handlePreview(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(file)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRenameFile(file)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMoveFile(file)}>
                          <Move className="mr-2 h-4 w-4" />
                          Move
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFile(file)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="aspect-square w-full overflow-hidden bg-muted">
                    <img
                      src={file.thumbnail || "/placeholder.svg"}
                      alt={file.name}
                      className="h-full w-full object-contain p-4 transition-all hover:scale-105 cursor-pointer"
                      onClick={() => handlePreview(file)}
                    />
                    {file.starred && (
                      <div className="absolute bottom-2 right-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <div className="truncate font-medium">{file.name}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{file.size}</span>
                      <span>{file.folder}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* File Preview Dialog */}
      <AlertDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>{previewFile?.name}</span>
              <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {previewFile?.size} • {previewFile?.uploadedAt}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">{getPreviewContent(previewFile)}</div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={() => handleDownload(previewFile)}>
                <Download className="mr-2 h-4 w-4" />
                Download
                {downloadProgress !== null && <span className="ml-2">{downloadProgress}%</span>}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Folder Dialog */}
      <Dialog open={isRenameFolderOpen} onOpenChange={setIsRenameFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
            <DialogDescription>Enter a new name for this folder.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newFolderName">Folder Name</Label>
              <Input id="newFolderName" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameFolderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRenameFolder} disabled={!newFolderName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Folder Dialog */}
      <AlertDialog open={isDeleteFolderOpen} onOpenChange={setIsDeleteFolderOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Folder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this folder? Files inside will be moved to "Uncategorized".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2 rounded-md border p-3 bg-muted/30">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-medium">Warning</p>
              <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteFolder}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename File Dialog */}
      <Dialog open={isRenameFileOpen} onOpenChange={setIsRenameFileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>Enter a new name for this file.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newFileName">File Name</Label>
              <Input id="newFileName" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameFileOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRenameFile} disabled={!newFileName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move File Dialog */}
      <Dialog open={isMovingFile} onOpenChange={setIsMovingFile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move File</DialogTitle>
            <DialogDescription>Select a destination folder for this file.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="moveTargetFolder">Destination Folder</Label>
              <Select value={targetFolder} onValueChange={setTargetFolder}>
                <SelectTrigger id="moveTargetFolder">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  {folderList.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMovingFile(false)}>
              Cancel
            </Button>
            <Button onClick={confirmMoveFile} disabled={!targetFolder}>
              Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete File Dialog */}
      <AlertDialog open={isDeleteFileOpen} onOpenChange={setIsDeleteFileOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedFileForDelete && (
            <div className="flex items-center gap-2 rounded-md border p-3 bg-muted/30">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium">{selectedFileForDelete.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedFileForDelete.size} • {selectedFileForDelete.uploadedAt}
                </p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteFile}
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
