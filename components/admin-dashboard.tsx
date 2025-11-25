"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit, Trash2, Eye, BarChart3, FileText, AlertCircle, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import AdminArticleForm, { type ArticleFormData } from "@/components/admin-article-form"

const INITIAL_ARTICLES = [
  {
    id: "1",
    title: "Zohran Momdani Recent Election Win",
    status: "published" as const,
    views: 15420,
    likes: 3200,
    date: "2025-11-24",
    category: "Politics",
  },
  {
    id: "2",
    title: "AI Breakthroughs in Medical Imaging",
    status: "published" as const,
    views: 8900,
    likes: 2100,
    date: "2025-11-23",
    category: "Technology",
  },
  {
    id: "3",
    title: "Climate Summit Reaches Historic Agreement",
    status: "draft" as const,
    views: 0,
    likes: 0,
    date: "2025-11-22",
    category: "Environment",
  },
]

export default function AdminDashboard() {
  const [articles, setArticles] = useState(INITIAL_ARTICLES)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((a) => a.id !== id))
    }
  }

  const handleCreateArticle = (formData: ArticleFormData) => {
    const newArticle = {
      id: Date.now().toString(),
      title: formData.title,
      status: "published" as const,
      views: 0,
      likes: 0,
      date: new Date().toISOString().split("T")[0],
      category: formData.category,
    }
    setArticles([newArticle, ...articles])
    setShowCreateModal(false)
  }

  const publishedCount = articles.filter((a) => a.status === "published").length
  const draftCount = articles.filter((a) => a.status === "draft").length
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0)
  const totalLikes = articles.reduce((sum, a) => sum + a.likes, 0)

  return (
    <main className="min-h-screen smooth-gradient">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-primary">Admin Dashboard</span>
              </h1>
              <p className="text-muted-foreground">Manage articles and monitor platform analytics</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground px-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10"
          >
            {[
              { icon: FileText, label: "Total Articles", value: articles.length, color: "text-blue-400" },
              { icon: AlertCircle, label: "Published", value: publishedCount, color: "text-green-400" },
              { icon: BarChart3, label: "Drafts", value: draftCount, color: "text-yellow-400" },
              { icon: Eye, label: "Total Views", value: totalViews.toLocaleString(), color: "text-purple-400" },
              {
                icon: Users,
                label: "Total Users",
                value: "124",
                color: "text-cyan-400",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-dark p-6 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-card rounded-lg mb-3">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Articles Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-xl border border-border overflow-hidden mb-10"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/50 bg-card/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Likes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {articles.map((article, i) => (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border/50 hover:bg-card/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm line-clamp-1 font-medium">{article.title}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{article.category}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              article.status === "published"
                                ? "bg-accent/20 text-accent"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{article.views.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium">{article.likes.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <Link href={`/article/${article.id}`}>
                            <Button variant="ghost" size="sm" className="hover:bg-accent/20 hover:text-accent">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingId(article.id)}
                            className="hover:bg-card"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(article.id)}
                            className="hover:bg-destructive/20 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* AI Agent Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 glass-dark rounded-xl border border-border/50 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2 text-accent">Chronicle AI Agent</h3>
                <p className="text-sm text-muted-foreground mb-3">Intelligent automation features:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Real-time internet search for trending topics</li>
                  <li>• Automatic article generation and enhancement</li>
                  <li>• Image fetching and optimization</li>
                  <li>• Vector database storage and embeddings</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Create Article Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <AdminArticleForm onClose={() => setShowCreateModal(false)} onSubmit={handleCreateArticle} />
        )}
      </AnimatePresence>
    </main>
  )
}
