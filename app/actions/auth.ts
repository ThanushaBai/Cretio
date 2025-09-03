'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectToDatabase from '@/lib/db'
import { User } from "@/models/User"
import { serializeDocument } from "@/lib/utils"

// Define JWT payload type for better type safety
interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate inputs
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  try {
    console.log(`Attempting to login user: ${email}`);
    
    // Handle demo account
    if (email === 'demo@cretio.com' && password === 'demo123456') {
      console.log('Using demo account login');
      const demoUser = {
        id: 'demo-user-id',
        email: 'demo@cretio.com',
        username: 'demo',
        name: 'Demo User',
        role: 'user',
        companyName: 'Demo Company',
        createdAt: new Date().toISOString()
      };
      
      const token = jwt.sign(
        { id: demoUser.id, email: demoUser.email, role: demoUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );
      
      // Set cookies with proper attributes
      cookies().set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "lax"
      });
      
      cookies().set("user", JSON.stringify(demoUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax"
      });
      
      return {
        success: true,
        message: "Login successful",
        user: demoUser,
      };
    }
    
    // Regular login flow
    await connectToDatabase();
    
    // Find the user and select all fields including password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log(`Login failed: User not found for email ${email}`);
      return {
        success: false,
        message: "Invalid email or password", // Don't reveal that the user doesn't exist
        redirectToSignup: false // Prevent automatic redirect to signup
      };
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for user ${email}`);
      return {
        success: false,
        message: "Invalid email or password",
        redirectToSignup: false
      };
    }
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
    // Create token
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        email: user.email, 
        role: user.role || 'user'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
    // Create a sanitized user object without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    // Set both cookies
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax"
    });
    
    cookies().set("user", JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax"
    });
    
    console.log('Login successful for:', email);
    
    return {
      success: true,
      message: "Login successful",
      user: userWithoutPassword
    };
    
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Handle specific database errors
    if (error.name === 'MongoServerSelectionError') {
      return {
        success: false,
        message: "Connection error. Please try again later.",
        redirectToSignup: false
      };
    }
    
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
      redirectToSignup: false
    };
  }
}

export async function signup(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const companyName = formData.get("companyName") as string

  // Validate inputs
  if (!name || !email || !username || !password || !companyName) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  try {
    console.log(`Attempting to create user: ${email}`)
    
    // For demo purposes, simulate a successful signup without database
    if (email === 'demo@cretio.com') {
      return {
        success: false,
        message: "This demo email is already registered. Please use a different email."
      }
    }
    
    // Regular signup flow with database
    await connectToDatabase()
    
    // Check if user exists
    const existingUser = await User.findOne({ email }).exec()

    if (existingUser) {
      console.log(`Signup failed: User with email ${email} already exists`)
      return { 
        success: false,
        message: "Email already registered" 
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user with the provided username
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      companyName,
      role: 'user',
    })

    // Serialize the user object before returning
    const serializedUser = serializeDocument(user)
    
    console.log(`User created successfully: ${email}`)
    
    return { 
      success: true, 
      message: "Account created successfully",
      user: serializedUser 
    }
  } catch (error: any) {
    console.error("Signup error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    // Check for connection errors
    if (error.name === 'MongooseServerSelectionError') {
      console.log("Database connection error during signup")
      return {
        success: false,
        message: "Could not connect to the database. Please try again later.",
      }
    }
    
    // Check for MongoDB errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      // Check for duplicate key error
      if (error.code === 11000) {
        console.log("Duplicate key error during signup")
        return {
          success: false,
          message: "Email already registered",
        }
      }
      
      console.log("MongoDB error during signup:", error.code)
      return {
        success: false,
        message: "Database error. Please try again later.",
      }
    }
    
    return {
      success: false,
      message: `An error occurred during signup: ${errorMessage}`,
    }
  }
}

export async function logout() {
  console.log('Logging out user')
  try {
    cookies().delete("token")
    cookies().delete("user")
    console.log('User cookies deleted, redirecting to login page')
    redirect("/auth/login")
  } catch (error) {
    console.error("Logout error:", error)
    // Still redirect even if there's an error
    redirect("/auth/login")
  }
}

export async function getUserFromCookie() {
  try {
    const userCookie = cookies().get("user")
    if (!userCookie) {
      console.log('No user cookie found')
      return null
    }
    
    const userData = JSON.parse(userCookie.value)
    console.log(`User data retrieved from cookie for: ${userData.email}`)
    
    // The data should already be serialized, but let's ensure it's clean
    // This is a safety check in case there are any non-serializable properties
    if (userData && userData._id) {
      // If we still have MongoDB ObjectId, convert it
      return serializeDocument(userData);
    }
    
    return userData
  } catch (error) {
    console.error("Error getting user from cookie:", error)
    return null
  }
}

// For backward compatibility
export const signUp = signup

// Verify JWT token from cookies
export async function verifyAuth(): Promise<JwtPayload | null> {
  try {
    const token = cookies().get("token")?.value
    
    if (!token) {
      console.log('No auth token found in cookies')
      return null
    }
    
    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not defined, using fallback secret')
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload
    
    // Validate that the decoded token has the expected fields
    if (!decoded || !decoded.id || !decoded.email) {
      console.error('Invalid token format - missing required fields')
      cookies().delete("token")
      cookies().delete("user")
      return null
    }
    
    console.log(`Token verified for user: ${decoded.email}`)
    return decoded
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token expired, user needs to login again")
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Invalid token, user needs to login again")
    } else {
      console.error("Token verification error:", error)
    }
    
    // Clear invalid cookies
    cookies().delete("token")
    cookies().delete("user")
    
    return null
  }
}

// Get current user with fresh data from database
export async function getCurrentUser() {
  try {
    const decoded = await verifyAuth()
    
    if (!decoded || !decoded.id) {
      console.log('No valid auth token or missing user ID')
      return null
    }
    
    console.log(`Getting fresh user data for ID: ${decoded.id}`)
    
    try {
      await connectToDatabase()
    } catch (dbError) {
      console.error("Database connection error in getCurrentUser:", dbError)
      // Don't clear cookies on DB connection error - might be temporary
      return null
    }
    
    try {
      const user = await User.findById(decoded.id).lean()
      
      if (!user) {
        console.log(`User not found in database for ID: ${decoded.id}`)
        // Clear cookies if user no longer exists
        cookies().delete("token")
        cookies().delete("user")
        return null
      }
      
      // Create a properly serialized user object
      const serializedUser = serializeDocument(user)
      
      console.log(`Fresh user data retrieved for: ${user.email}`)
      return serializedUser
    } catch (findError: any) {
      console.error("Error finding user:", findError)
      
      // Only clear cookies if it's not a temporary DB error
      if (findError.name !== 'MongooseServerSelectionError') {
        cookies().delete("token")
        cookies().delete("user")
      }
      
      return null
    }
  } catch (error: any) {
    console.error("Get current user error:", error)
    
    // Clear cookies on critical errors
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      cookies().delete("token")
      cookies().delete("user")
    }
    
    return null
  }
}