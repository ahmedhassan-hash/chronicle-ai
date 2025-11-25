"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import UserDashboard from "@/components/user-dashboard"
import AdminDashboard from "@/components/admin-dashboard"

export default function DashboardsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return user.role === "admin" ? <AdminDashboard /> : <UserDashboard />
}
