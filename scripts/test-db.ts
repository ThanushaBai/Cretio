import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Test the connection
    await prisma.$connect()
    console.log("Successfully connected to MongoDB")

    // Count users
    const userCount = await prisma.user.count()
    console.log(`Database has ${userCount} users`)

    // Create a test user if none exist
    if (userCount === 0) {
      const user = await prisma.user.create({
        data: {
          name: "Test User",
          email: "test@example.com",
          password: "hashed_password_would_go_here",
          role: "admin",
        },
      })
      console.log("Created test user:", user)
    }
  } catch (error) {
    console.error("Database connection error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

