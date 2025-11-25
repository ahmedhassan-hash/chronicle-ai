"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Link from "next/link"

export default function ArticlesPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
    }
  }, [user, router])

  if (!user) return null

  return (
    <main className="min-h-screen smooth-gradient">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-primary">My Articles</span>
            </h1>
            <p className="text-muted-foreground">Create, manage, and track your contributions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Create Article Card */}
            <div className="glass-dark p-8 rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 cursor-pointer group">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                  <Plus className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Create Article</h3>
                <p className="text-sm text-muted-foreground mb-4">Write and publish a new article</p>
                <Link href="/dashboards">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground w-full">
                    New Article
                  </Button>
                </Link>
              </div>
            </div>

            {/* Upload Article Card */}
            <div className="glass-dark p-8 rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 cursor-pointer group">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Upload Content</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload articles from external sources</p>
                <Button variant="outline" className="border-border hover:bg-card/50 w-full bg-transparent">
                  Upload
                </Button>
              </div>
            </div>

            {/* My Drafts Card */}
            <div className="glass-dark p-8 rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 cursor-pointer group">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">My Drafts</h3>
                <p className="text-sm text-muted-foreground mb-4">View and edit your draft articles</p>
                <Button variant="outline" className="border-border hover:bg-card/50 w-full bg-transparent">
                  View Drafts
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Recent Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
            <div className="glass-dark p-8 rounded-xl border border-border text-center py-16">
              <p className="text-muted-foreground">No articles yet. Create your first article to get started!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
