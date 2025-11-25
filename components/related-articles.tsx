"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface RelatedArticle {
  id: string
  title: string
  excerpt: string
  category: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-border pt-12 mt-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Related Articles</h2>
        <p className="text-muted-foreground">Discover more articles from our AI-curated collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href={`/article/${article.id}`}>
              <div className="group glass-dark p-6 rounded-lg border border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 h-full cursor-pointer flex flex-col">
                <span className="text-xs font-semibold text-accent mb-3">{article.category}</span>
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
