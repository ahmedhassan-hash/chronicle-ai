"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, Heart } from "lucide-react"
import Image from "next/image"

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  views: number
  likes: number
}

export default function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Link href={`/article/${article.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group glass-dark rounded-lg overflow-hidden cursor-pointer border border-border hover:border-accent/50 transition-all h-full flex flex-col glow-accent"
      >
        <div className="relative h-32 overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded-md border border-accent/50">
              {article.category}
            </span>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-accent transition-colors">{article.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{article.excerpt}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 hover:text-accent transition-colors">
                <Eye className="w-3 h-3" />
                <span>{(article.views / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-1 hover:text-accent transition-colors">
                <Heart className="w-3 h-3" />
                <span>{(article.likes / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
