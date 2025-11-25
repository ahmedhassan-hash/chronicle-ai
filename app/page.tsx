"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Sparkles, TrendingUp, Zap, Brain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import ArticleCard from "@/components/article-card"

const DEMO_ARTICLES = [
  {
    id: "1",
    title: "Zohran Momdani Recent Election Win",
    excerpt:
      "Socialist candidate secures historic victory in municipal elections with groundswell of grassroots support",
    category: "Politics",
    image: "/election-victory-celebration.jpg",
    date: "2025-11-24",
    views: 15420,
    likes: 3200,
  },
  {
    id: "2",
    title: "AI Breakthroughs in Medical Imaging",
    excerpt: "New deep learning model achieves 99.2% accuracy in detecting rare diseases early",
    category: "Technology",
    image: "/medical-imaging-technology-ai.jpg",
    date: "2025-11-23",
    views: 8900,
    likes: 2100,
  },
  {
    id: "3",
    title: "Climate Summit Reaches Historic Agreement",
    excerpt: "Nations pledge to cut carbon emissions by 50% within the next decade",
    category: "Environment",
    image: "/climate-change-earth-planet.jpg",
    date: "2025-11-22",
    views: 12300,
    likes: 2800,
  },
  {
    id: "4",
    title: "Space Agency Announces Mars Colony Timeline",
    excerpt: "First crewed mission planned for 2030 with permanent settlement by 2035",
    category: "Science",
    image: "/mars-colony-space-mission.jpg",
    date: "2025-11-21",
    views: 24500,
    likes: 5600,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArticles, setFilteredArticles] = useState(DEMO_ARTICLES)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = DEMO_ARTICLES.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredArticles(filtered)
    } else {
      setFilteredArticles(DEMO_ARTICLES)
    }
  }

  return (
    <main className="min-h-screen smooth-gradient">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <Brain className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Powered by Intelligent AI Agents
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-balance leading-tight">
            <span className="gradient-primary">Chronicle</span> <span className="gradient-accent">AI</span>
            <span className="block text-foreground mt-2">News Discovery Reimagined</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Our intelligent agent learns and grows by discovering, curating, and creating articles in real-time. Search
            once, never search again with vector-powered recommendations and AI-enhanced content.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="relative max-w-3xl mx-auto">
              <div className="glass-dark rounded-xl p-1.5 flex gap-2 shadow-lg shadow-accent/20">
                <Input
                  type="text"
                  placeholder="Search news... (e.g., 'Zohran Momdani election win')"
                  className="flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground px-8 rounded-lg font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                AI will search the internet, curate content, and create an article for you instantly
              </p>
            </div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
          >
            {[
              {
                icon: TrendingUp,
                title: "Real-time Discovery",
                desc: "AI continuously searches for trending stories",
              },
              { icon: Sparkles, title: "Smart Curation", desc: "Intelligent content enhancement & generation" },
              { icon: Zap, title: "Vector Search", desc: "Find similar articles from our database instantly" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-dark p-5 rounded-lg border border-border hover:border-accent/50 transition-all group cursor-pointer"
              >
                <div className="p-3 bg-accent/10 rounded-lg w-fit mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth/signin">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-accent-foreground px-10 py-7 text-base font-semibold w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <a href="#trending">
              <Button
                variant="outline"
                className="border-border hover:bg-card/50 hover:border-accent/50 px-10 py-7 text-base font-semibold w-full sm:w-auto bg-transparent"
              >
                Explore Articles
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Trending Articles Section */}
      <section id="trending" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Trending Now</h2>
            </div>
            <p className="text-muted-foreground text-lg">Latest articles discovered and curated by Chronicle AI</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground text-lg">No articles found. Try a different search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                Chronicle AI
              </h3>
              <p className="text-sm text-muted-foreground">Intelligent news discovery powered by AI agents</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2025 Chronicle AI. All articles are AI-curated and sourced from verified sources.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
