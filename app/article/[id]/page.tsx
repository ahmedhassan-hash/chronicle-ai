"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ArticleDetailHero from "@/components/article-detail-hero"
import RelatedArticles from "@/components/related-articles"
import Navbar from "@/components/navbar"
import { useState } from "react"

const DEMO_ARTICLES: Record<string, any> = {
  "1": {
    id: "1",
    title: "Zohran Momdani Recent Election Win: A Historic Victory for Progressive Politics",
    excerpt:
      "Socialist candidate secures historic victory in municipal elections with groundswell of grassroots support",
    category: "Politics",
    image: "/election-victory-celebration.jpg",
    date: "2025-11-24",
    views: 15420,
    likes: 3200,
    author: "Sarah Mitchell",
    readTime: "6 min read",
    content: `Zohran Momdani has secured a historic victory in the recent municipal elections, marking a significant moment for progressive politics in the region. With overwhelming grassroots support and innovative campaign strategies, Momdani's win represents a shift in voter preferences towards bold progressive policies.

The election campaign focused on several key issues including climate action, affordable housing, and community empowerment. Momdani's platform resonated strongly with voters across diverse demographics, from students to working professionals.

Key achievements during the campaign include over 50,000 hours of volunteer canvassing, 15,000+ individual donations from community members, social media engagement reaching 2 million impressions, and ground-level community forums in 50+ neighborhoods.

Political analysts attribute the victory to authentic grassroots organizing, clear policy communication, and genuine connection with local community concerns. The win has already sparked discussions about similar campaigns in neighboring municipalities.

With this victory, Momdani plans to prioritize environmental sustainability initiatives, expand public transit systems, and create affordable housing programs. The first 100 days of office will focus on establishing community advisory boards to ensure continued democratic participation.

This election represents a turning point, showing that dedicated community organizing can overcome traditional political establishments. Political scientists are already studying the campaign as a model for future progressive movements.

The victory has inspired multiple similar campaigns across the country, with organizers citing Momdani's approach as proof that people-powered politics can succeed at scale.`,
    relatedArticles: [
      {
        id: "2",
        title: "AI Breakthroughs in Medical Imaging",
        excerpt: "New deep learning model...",
        category: "Technology",
      },
      {
        id: "3",
        title: "Climate Summit Reaches Historic Agreement",
        excerpt: "Nations pledge to cut...",
        category: "Environment",
      },
      {
        id: "4",
        title: "Space Agency Announces Mars Colony Timeline",
        excerpt: "First crewed mission...",
        category: "Science",
      },
    ],
  },
  "2": {
    id: "2",
    title: "AI Breakthroughs in Medical Imaging: 99.2% Accuracy Achieved",
    excerpt: "New deep learning model achieves 99.2% accuracy in detecting rare diseases early",
    category: "Technology",
    image: "/medical-imaging-technology.jpg",
    date: "2025-11-23",
    views: 8900,
    likes: 2100,
    author: "Dr. James Chen",
    readTime: "8 min read",
    content:
      "Medical researchers have developed a breakthrough AI system that achieves unprecedented accuracy in disease detection. The new model uses advanced deep learning techniques to identify patterns invisible to the human eye, enabling earlier interventions and better patient outcomes.",
    relatedArticles: [],
  },
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [shared, setShared] = useState(false)
  const id = (params as any).id
  const article = DEMO_ARTICLES[id] || DEMO_ARTICLES["1"]

  return (
    <main className="min-h-screen smooth-gradient">
      <Navbar />

      {/* Sticky Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-dark border-b border-border/50 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/user-dashboard" className="flex items-center gap-2 hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="text-sm text-muted-foreground truncate flex-1 text-center px-4 line-clamp-1">
            {article.title}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShared(true)} className="hover:bg-card text-sm">
            Share
          </Button>
        </div>
      </motion.div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Hero Section */}
        <ArticleDetailHero
          title={article.title}
          excerpt={article.excerpt}
          image={article.image}
          category={article.category}
          date={article.date}
          author={article.author}
          readTime={article.readTime}
          likes={article.likes}
          views={article.views}
        />

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="my-12 prose prose-invert max-w-none"
        >
          <div className="text-base leading-relaxed text-foreground/90 space-y-6">
            {article.content
              .split("\n\n")
              .filter(Boolean)
              .map((para: string, i: number) => (
                <p key={i} className="text-lg">
                  {para.trim()}
                </p>
              ))}
          </div>
        </motion.div>

        {/* Related Articles Section */}
        <RelatedArticles articles={article.relatedArticles || []} />

        {/* AI Info Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 glass-dark rounded-lg border border-border/50 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10"
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                AI-Curated Article
              </h3>
              <p className="text-sm text-muted-foreground">
                This article was discovered, researched, and curated by our intelligent AI agent. It combines
                information from multiple verified sources and has been processed through our vector database for
                personalized recommendations.
              </p>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Share Toast */}
      {shared && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 p-4 glass-dark rounded-lg border border-border/50"
        >
          <p className="text-sm font-medium text-accent">Article link copied to clipboard!</p>
        </motion.div>
      )}
    </main>
  )
}
