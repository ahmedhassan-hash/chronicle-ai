"use client"

import { motion } from "framer-motion"
import { Search, Zap, Database, Brain } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchCardProps {
  onSearch?: (query: string) => void
}

export default function SearchCard({ onSearch }: SearchCardProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="glass-dark rounded-xl p-1 flex gap-2 border border-border/50 shadow-lg shadow-accent/10">
        <div className="flex-1 flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search news... (e.g., 'Zohran Momdani election win')"
            className="flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground px-6 rounded-lg m-1"
        >
          <Zap className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Info Text */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2 flex-wrap"
      >
        <Database className="w-3 h-3" />
        Searches our database
        <span className="text-border">•</span>
        <Brain className="w-3 h-3" />
        AI-powered curation
      </motion.p>
    </motion.div>
  )
}
