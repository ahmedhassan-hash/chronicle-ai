"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface ArticleFormProps {
  onClose: () => void
  onSubmit: (data: ArticleFormData) => void
}

export interface ArticleFormData {
  title: string
  excerpt: string
  category: string
  content: string
  image: string
}

export default function AdminArticleForm({ onClose, onSubmit }: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    excerpt: "",
    category: "Technology",
    content: "",
    image: "/placeholder.svg",
  })

  const handleSubmit = () => {
    if (formData.title && formData.excerpt && formData.content) {
      onSubmit(formData)
      setFormData({
        title: "",
        excerpt: "",
        category: "Technology",
        content: "",
        image: "/placeholder.svg",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-dark rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border/50 glass-dark">
          <h2 className="text-xl font-bold">Create New Article</h2>
          <button onClick={onClose} className="p-2 hover:bg-card rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              type="text"
              placeholder="Enter article title"
              className="w-full bg-card border-border"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <Input
              type="text"
              placeholder="Brief summary of the article"
              className="w-full bg-card border-border"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground"
              >
                <option>Technology</option>
                <option>Politics</option>
                <option>Science</option>
                <option>Health</option>
                <option>Environment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                type="text"
                placeholder="/image.jpg"
                className="w-full bg-card border-border"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              placeholder="Write your article content here..."
              rows={8}
              className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground resize-none"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-primary to-accent">
              Publish Article
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 glass-dark border-border bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
