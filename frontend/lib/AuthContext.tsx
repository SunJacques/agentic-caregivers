"use client"

import type React from "react"
import { createContext, useContext } from "react"

type AuthContextType = {
  getUserId: () => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sample ID to use for all operations
  const sampleID = "123e4567-e89b-12d3-a456-426614174000"

  const getUserId = async () => {
    return sampleID
  }

  const value = { getUserId }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}