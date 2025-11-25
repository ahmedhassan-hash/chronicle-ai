"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, TrendingUp, Clock, Zap } from "lucide-react"
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
    image: "/election-victory.png",
    date: "2025-11-24",
    views: 15420,
    likes: 3200,
  },
  {
    id: "2",
    title: "AI Breakthroughs in Medical Imaging",
    excerpt: "New deep learning model achieves 99.2% accuracy in detecting rare diseases early",
    category: "Technology",
    image: "/medical-imaging.png",
    date: "2025-11-23",
    views: 8900,
    likes: 2100,
  },
  {
    id: "3",
    title: "Climate Summit Reaches Historic Agreement",
    excerpt: "Nations pledge to cut carbon emissions by 50% within the next decade",
    category: "Environment",
    image: "/climate-change-impacts.png",
    date: "2025-11-22",
    views: 12300,
    likes: 2800,
  },
  {
    id: "4",
    title: "Space Agency Announces Mars Colony Timeline",
    excerpt: "First crewed mission planned for 2030 with permanent settlement by 2035",
    category: "Science",
    image: "/mars-colony.png",
    date: "2025-11-21",
    views: 24500,
    likes: 5600,
  },
  {
    id: "5",
    title: "Quantum Computing Reaches New Milestone",
    excerpt: "Researchers achieve quantum advantage in practical real-world applications",
    category: "Technology",
    image: "/quantum-computing-concept.png",
    date: "2025-11-20",
    views: 10200,
    likes: 2400,
  },
  {
    id: "6",
    title: "Revolutionary Cancer Treatment Shows Promise",
    excerpt: "New immunotherapy approach demonstrates 85% success rate in clinical trials",
    category: "Health",
    image: "/medical-research-lab.png",
    date: "2025-11-19",
    views: 18700,
    likes: 4100,
  },
]

const CATEGORIES = ["All", "Politics", "Technology", "Science", "Environment", "Health"]
const SORT_OPTIONS = ["Latest", "Trending", "Most Liked", "Most Viewed"]

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Latest")

  const filteredArticles = useMemo(() => {
    let result = DEMO_ARTICLES

    if (selectedCategory !== "All") {
      result = result.filter((a) => a.category === selectedCategory)
    }

    if (searchQuery) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (sortBy === "Trending") {
      result = [...result].sort((a, b) => b.views - a.views)
    } else if (sortBy === "Most Liked") {
      result = [...result].sort((a, b) => b.likes - a.likes)
    } else if (sortBy === "Most Viewed") {
      result = [...result].sort((a, b) => b.views - a.views)
    } else {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    return result
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <main className="min-h-screen smooth-gradient">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance leading-tight">
              Your <span className="gradient-primary">Article Feed</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover and explore AI-curated content from around the world
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            <div className="glass-dark p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-primary to-accent text-accent-foreground shadow-lg shadow-accent/30"
                      : "glass-dark border border-border hover:border-accent/50"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: TrendingUp, label: "Trending Now", value: "24" },
              { icon: Clock, label: "Recently Added", value: `${DEMO_ARTICLES.length}` },
              { icon: Zap, label: "AI Verified", value: "100%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-dark p-6 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-20">
                <p className="text-lg text-muted-foreground mb-2">No articles found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
