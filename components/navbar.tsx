"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg group-hover:shadow-lg group-hover:shadow-accent/30 transition-shadow">
            <Brain className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Chronicle
            </span>
            <span className="text-xs text-accent font-semibold">AI</span>
          </div>
        </Link>

        {/* Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-8">
            {user.role === "admin" ? (
              <>
                <Link href="/dashboards" className="text-sm hover:text-accent transition-colors font-medium">
                  Dashboard
                </Link>
                <Link href="/articles" className="text-sm hover:text-accent transition-colors font-medium">
                  Articles
                </Link>
                <Link href="/user-management" className="text-sm hover:text-accent transition-colors font-medium">
                  Users
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboards" className="text-sm hover:text-accent transition-colors font-medium">
                  Discover
                </Link>
                <Link href="/articles" className="text-sm hover:text-accent transition-colors font-medium">
                  My Articles
                </Link>
              </>
            )}
            <Link href="/settings" className="text-sm hover:text-accent transition-colors font-medium">
              Settings
            </Link>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">
                {user.email} {user.role === "admin" && <span className="text-accent font-semibold">(Admin)</span>}
              </span>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hidden sm:block">
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
