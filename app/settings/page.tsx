"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bell, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
    }
  }, [user, router])

  if (!user) return null

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <main className="min-h-screen smooth-gradient">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-primary">Settings</span>
            </h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-8 glass-dark p-1 rounded-lg border border-border"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-medium ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-accent text-accent-foreground shadow-lg shadow-accent/30"
                    : "hover:text-accent"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-dark p-8 rounded-xl border border-border space-y-6"
          >
            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Email Address</label>
                  <Input type="email" value={user.email} disabled className="bg-input border-border" />
                  <p className="text-xs text-muted-foreground mt-2">Your primary email address</p>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Account Type</label>
                  <div className="px-4 py-3 bg-card border border-border rounded-lg">
                    <p className="text-sm font-medium capitalize">{user.role === "admin" ? "Administrator" : "User"}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Member Since</label>
                  <div className="px-4 py-3 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground">November 2025</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
                    Delete Account
                  </Button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="bg-input border-border pr-10"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">New Password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="bg-input border-border"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Confirm Password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="bg-input border-border"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground">
                  Update Password
                </Button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive updates about new articles</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                    className="w-5 h-5 rounded cursor-pointer accent-accent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg opacity-50">
                  <div>
                    <p className="font-semibold text-sm">Daily Digest</p>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  </div>
                  <input type="checkbox" disabled className="w-5 h-5 rounded cursor-not-allowed" />
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground">
                  Save Preferences
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
