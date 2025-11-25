"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Bookmark, Share2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ArticleHeroProps {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  author: string
  readTime: string
  likes: number
  views: number
}

export default function ArticleDetailHero({
  title,
  excerpt,
  image,
  category,
  date,
  author,
  readTime,
  likes,
  views,
}: ArticleHeroProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative h-[500px] rounded-xl overflow-hidden mb-8 glass-dark border border-border/50">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-2 text-sm font-semibold bg-accent/90 text-accent-foreground rounded-full backdrop-blur-md"
          >
            {category}
          </motion.span>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-foreground/90 mb-6 max-w-2xl line-clamp-2"
          >
            {excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-semibold">{author}</p>
                <p className="text-xs text-foreground/70">{readTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-foreground/80">
              <span>{views.toLocaleString()} views</span>
              <span>•</span>
              <span>{likes.toLocaleString()} likes</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <Button
          onClick={() => setLiked(!liked)}
          className={`gap-2 ${liked ? "bg-accent text-accent-foreground" : "glass-dark border border-border hover:border-accent/50"}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          {liked ? "Liked" : "Like"}
        </Button>
        <Button
          onClick={() => setBookmarked(!bookmarked)}
          variant="outline"
          className="glass-dark border border-border hover:border-accent/50 gap-2"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
          {bookmarked ? "Saved" : "Save"}
        </Button>
        <Button
          variant="outline"
          className="glass-dark border border-border hover:border-accent/50 gap-2 bg-transparent"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button
          variant="outline"
          className="glass-dark border border-border hover:border-accent/50 gap-2 bg-transparent"
        >
          <MessageSquare className="w-4 h-4" />
          Comments
        </Button>
      </motion.div>
    </motion.div>
  )
}
