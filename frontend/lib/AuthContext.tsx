"use client"

import type React from "react"
import { createContext, useState, useContext, useMemo } from "react"

// Define a simplified User type since we're no longer using Supabase
type User = {
  id: string;
  email: string;
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getUserId: () => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if we have a user in localStorage when the component mounts
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('mockUser')
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  })

  // Sample ID to use for all users
  const sampleID = "123e4567-e89b-12d3-a456-426614174000"

  const signIn = async (email: string, _password: string) => {
    // Accept any email/password combination
    const mockUser = {
      id: sampleID,
      email: email,
    }
    
    // Store user in state and localStorage
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
  }

  const getUserId = async () => {
    if (!user) {
      throw new Error("No user is logged in")
    }
    return user.id
  }

  const signUp = async (email: string, _password: string) => {
    // Same as signIn for this mock implementation
    const mockUser = {
      id: sampleID,
      email: email,
    }
    
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('mockUser')
  }

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut, getUserId }), 
    [user]
  )
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}