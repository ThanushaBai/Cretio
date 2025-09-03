import type { User } from "@/types/admin"

// Mock users for demo purposes
// In a real app, these would be stored in your database
const users: User[] = [
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

export async function getUsers(): Promise<User[]> {
  // In a real app, you would query your database
  return [...users]
}

export async function getUserById(id: string): Promise<User | null> {
  // In a real app, you would query your database
  return users.find((user) => user.id === id) || null
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "lastLogin">): Promise<User> {
  // In a real app, you would save this to your database
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15),
    ...userData,
    createdAt: new Date(),
    lastLogin: null,
  }

  users.push(newUser)
  return newUser
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  // In a real app, you would update your database
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  const updatedUser = {
    ...users[userIndex],
    ...userData,
  }

  users[userIndex] = updatedUser
  return updatedUser
}

export async function deleteUser(id: string): Promise<boolean> {
  // In a real app, you would delete from your database
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return false

  users.splice(userIndex, 1)
  return true
}