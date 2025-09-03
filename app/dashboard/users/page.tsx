"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Search, UserPlus, UsersIcon } from "lucide-react"

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

// Initial user data
const initialUsers = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "active",
		createdAt: new Date(2023, 0, 15),
		lastLogin: new Date(2023, 3, 10),
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User",
		status: "active",
		createdAt: new Date(2023, 1, 20),
		lastLogin: new Date(2023, 3, 12),
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User",
		status: "inactive",
		createdAt: new Date(2023, 2, 5),
		lastLogin: null,
	},
	{
		id: "4",
		name: "Alice Brown",
		email: "alice@example.com",
		role: "Manager",
		status: "active",
		createdAt: new Date(2023, 2, 10),
		lastLogin: new Date(2023, 3, 11),
	},
	{
		id: "5",
		name: "Charlie Wilson",
		email: "charlie@example.com",
		role: "User",
		status: "suspended",
		createdAt: new Date(2023, 0, 25),
		lastLogin: new Date(2023, 2, 15),
	},
]

export default function UsersPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		role: "User",
		status: "active",
	})
	const [users, setUsers] = useState(initialUsers) // <-- use state for users
	const [filteredUsers, setFilteredUsers] = useState(initialUsers)

	// Filter users based on search query
	useEffect(() => {
		const filtered = users.filter((user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		setFilteredUsers(filtered)
	}, [searchQuery, users]) // <-- depend on users too

	// Handle adding a new user
	const handleAddUser = () => {
		const newUserObj = {
			...newUser,
			id: (users.length + 1).toString(),
			createdAt: new Date(),
			lastLogin: null,
		}
		setUsers([newUserObj, ...users]) // <-- add to state
		triggerActivityNotification("create", "user", `Created new user: ${newUser.name} (${newUser.email})`)
		setNewUser({
			name: "",
			email: "",
			role: "User",
			status: "active",
		})
		setIsAddUserDialogOpen(false)
	}

	// Handle user actions
	const handleUserAction = (action: string, user: (typeof users)[0]) => {
		import("@/lib/action-handlers").then(({ handleAction }) => {
			handleAction(action, "user", user).then((result) => {
				if (result.success) {
					if (action === "delete") {
						setUsers(users.filter(u => u.id !== user.id)) // <-- remove from state
					} else if (action === "edit" || action === "role") {
						setUsers(users.map(u => u.id === user.id ? { ...u, ...result.item } : u)) // <-- update in state
					}
				}
			})
		})
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold tracking-tight">User Management</h1>
				<p className="text-muted-foreground">Manage your platform users and their permissions.</p>
			</div>

			<div className="flex items-center justify-between">
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search users..."
						className="pl-8"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
					<DialogTrigger asChild>
						<Button className="flex items-center gap-2">
							<UserPlus className="h-4 w-4" />
							<span>Add User</span>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New User</DialogTitle>
							<DialogDescription>Add a new user to your platform.</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									placeholder="John Doe"
									value={newUser.name}
									onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="john@example.com"
									value={newUser.email}
									onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="role">Role</Label>
									<Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
										<SelectTrigger id="role">
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Admin">Admin</SelectItem>
											<SelectItem value="Manager">Manager</SelectItem>
											<SelectItem value="User">User</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="status">Status</Label>
									<Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
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
							<Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleAddUser}>Add User</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2">
						<UsersIcon className="h-5 w-5 text-muted-foreground" />
						<span>Users</span>
					</CardTitle>
					<CardDescription>Manage your platform users and their permissions.</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created</TableHead>
								<TableHead>Last Login</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell>
										<Badge
											variant={
												user.status === "active" ? "success" : user.status === "inactive" ? "outline" : "destructive"
											}
										>
											{user.status}
										</Badge>
									</TableCell>
									<TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
									<TableCell>{user.lastLogin ? user.lastLogin.toLocaleDateString() : "Never"}</TableCell>
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
												<DropdownMenuItem onClick={() => handleUserAction("view", user)}>View Details</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleUserAction("edit", user)}>Edit User</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={() => handleUserAction("reset", user)}>
													Reset Password
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleUserAction("role", user)}>Change Role</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem className="text-destructive" onClick={() => handleUserAction("delete", user)}>
													Delete User
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
