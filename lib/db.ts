import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {

    const options = {
      bufferCommands: true,
      connectTimeoutMS: 30000, // Increased timeout for initial connection
      socketTimeoutMS: 90000, // Increased timeout for socket operations
      maxPoolSize: 50,
      minPoolSize: 5, // Keep minimum 5 connections in pool
      maxIdleTimeMS: 60000, // Increased idle time before Incredasing    wtimeoutMS: 05000 // Increased write timeout, // Increased write timeout
      retryWrites: true,
      retryReads: true,
      serverSelectionTimeoutMS: 45000, // Increased server selection timeout
      heartbeatFrequencyMS: 10000, // Check server status everyIncreased server selection timeout
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, options)
  }
  try {
    cached.conn = await cached.promise
    console.log('Successfully connected to MongoDB')
  } catch (e: any) {
    cached.promise = null
    
    // Log specific error information
    console.error('MongoDB connection error:', {
      name: e.name,
      code: e.code,
      message: e.message
    })

    // Handle specific MongoDB errors
    if (e.name === 'MongoServerSelectionError') {
      throw new Error('Could not connect to MongoDB. Please check your network connection and MongoDB Atlas status.')
    }
    
    if (e.name === 'MongoServerError') {
      if (e.code === 8000) {
        throw new Error('MongoDB authentication failed. Please check your database credentials.')
      }
      if (e.code === 18) {
        throw new Error('MongoDB authentication failed. Please verify your database user permissions.')
      }
    }
    
    if (e.name === 'MongoNetworkError') {
      throw new Error('Could not reach MongoDB. Please check your network connection and firewall settings.')
    }

    // For other errors, try to retry the connection
    console.log('Retrying connection in 5 seconds...')
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    // Clear the cached promise to allow retry
    cached.promise = null
    
    // Retry the connection once
    try {
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, options)
      cached.conn = await cached.promise
      console.log('Successfully connected to MongoDB on retry')
    } catch (retryError) {
      cached.promise = null
      console.error('MongoDB retry connection failed:', retryError)
      throw new Error('Could not connect to MongoDB after retry. Please try again later.')
    }
  }

  return cached.conn
}

export default connectToDatabase