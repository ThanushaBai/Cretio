import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { User } from '@/models/User'
import connectToDatabase from './db'

export async function getUserFromCookie() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    
    if (!token) {
      console.log('No token found in cookies')
      return null
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined')
      return null
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET) as jwt.JwtPayload
    if (!decoded.id) {
      console.log('Invalid token payload')
      return null
    }

    await connectToDatabase()
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      console.log('User not found in database')
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting user from cookie:', error)
    return null
  }
}