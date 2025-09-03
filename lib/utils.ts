import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely serializes MongoDB documents to plain JavaScript objects
 * that can be passed to client components or stored in cookies.
 * 
 * @param doc MongoDB document or any object that might contain non-serializable properties
 * @returns A serialized plain JavaScript object
 */
export function serializeDocument(doc: any): any {
  if (!doc) return null;
  
  // Handle arrays
  if (Array.isArray(doc)) {
    return doc.map(item => serializeDocument(item));
  }
  
  // Handle Date objects
  if (doc instanceof Date) {
    return doc.toISOString();
  }
  
  // Handle plain objects (including MongoDB documents)
  if (typeof doc === 'object' && doc !== null) {
    const serialized: Record<string, any> = {};
    
    // Convert MongoDB ObjectId to string if it has a toString method
    if (doc._id && typeof doc._id.toString === 'function') {
      serialized.id = doc._id.toString();
    }
    
    // Process all properties
    for (const [key, value] of Object.entries(doc)) {
      // Skip the _id field as we've already handled it
      if (key === '_id') continue;
      
      // Skip the password field for security
      if (key === 'password') continue;
      
      // Skip the __v field (MongoDB version key)
      if (key === '__v') continue;
      
      // Recursively serialize nested objects
      serialized[key] = serializeDocument(value);
    }
    
    return serialized;
  }
  
  // Return primitive values as is
  return doc;
}
