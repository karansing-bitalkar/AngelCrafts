import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { CATEGORIES, SAMPLE_PRODUCTS } from "@/constants";

export default function Categories() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag-badge mb-3">📂 Categories</span>
            <h1 className="section-title mb-3">Shop by Category</h1>
            <p className="section-subtitle max-w-xl mx-auto">Explore our curated collection across all handmade craft categories.</p>
          </motion.div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link to="/marketplace" className="group block rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40 group-hover:opacity-50 transition-opacity`} />
                  <div className="absolute top-3 right-3 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-gray-800 text-lg mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{cat.count.toLocaleString()} handmade items</p>
                  <div className="flex items-center gap-1 text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Browse <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <section className="bg-gradient-soft py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Trending Tags</h2>
          <p className="section-subtitle mb-8">What's popular right now in the community</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["handmade", "custom orders", "boho", "minimalist", "vintage", "sustainable", "personalized", "wedding gifts", "home decor", "jewelry", "art prints", "ceramics", "candles", "knitting", "macrame"].map((tag) => (
              <Link key={tag} to="/marketplace" className="px-5 py-2 bg-white rounded-full border border-pink-100 text-sm text-gray-600 hover:border-primary hover:text-primary-700 hover:shadow-soft transition-all capitalize">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title mb-2">Trending This Week</h2>
        <p className="section-subtitle mb-8">The most-loved items across all categories</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SAMPLE_PRODUCTS.slice(0, 4).map((p) => (
            <Link key={p.id} to="/marketplace" className="group block rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-glass transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-700 truncate">{p.title}</p>
                <p className="text-xs text-primary-600 font-bold">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
