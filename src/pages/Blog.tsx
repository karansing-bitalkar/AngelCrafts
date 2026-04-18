import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiArrowRight } from "react-icons/fi";

const posts = [
  { id: 1, title: "10 Ways Artisans Are Changing the Way We Shop", category: "Trends", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop", author: "Sofia Martinez", time: "8 min read", date: "Apr 10, 2025", excerpt: "Handmade commerce is on the rise. We explore how independent artisans are reshaping consumer expectations and building loyal communities around authenticity.", featured: true },
  { id: 2, title: "How to Photograph Your Handmade Products Like a Pro", category: "Tips", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&h=400&fit=crop", author: "James Wilson", time: "6 min read", date: "Apr 5, 2025", excerpt: "Great product photography can triple your sales. Learn the exact lighting setups, camera angles, and editing tricks top artisans use to make their products shine." },
  { id: 3, title: "Artisan Spotlight: How Luna Craft Built a $100K Shop", category: "Success Stories", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop", author: "Angelica Rose", time: "10 min read", date: "Mar 28, 2025", excerpt: "Luna started crafting jewelry in her kitchen in 2022. Two years later, she's running a six-figure shop on AngelCrafts. Here's her full story." },
  { id: 4, title: "The Rise of Custom Orders: Why Personalization Wins", category: "Industry", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=400&fit=crop", author: "Marcus Chen", time: "5 min read", date: "Mar 20, 2025", excerpt: "Custom orders now account for 38% of all AngelCrafts sales. We dive into why personalization is the biggest trend in handmade commerce." },
  { id: 5, title: "Sustainable Crafting: Materials That Are Good for the Planet", category: "Sustainability", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", author: "Sofia Martinez", time: "7 min read", date: "Mar 15, 2025", excerpt: "From organic cotton to recycled metals — discover the sustainable materials top artisans are using to create beautiful, eco-conscious products." },
  { id: 6, title: "Pricing Your Handmade Products: A Complete Guide", category: "Business", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop", author: "Angelica Rose", time: "9 min read", date: "Mar 8, 2025", excerpt: "Pricing is one of the hardest parts of running a handmade business. This guide covers materials, time, overhead, and profit to help you price with confidence." },
];

export default function Blog() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-hero py-14 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4">
          <span className="tag-badge mb-4">📝 Blog</span>
          <h1 className="section-title mb-4">Craft Stories & Insights</h1>
          <p className="section-subtitle">Tips, success stories, and industry insights for artisans and craft lovers.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden mb-12 group cursor-pointer">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="tag-badge mb-3 self-start">{featured.category}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-primary-700 transition-colors">{featured.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-5 text-sm">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{featured.time}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                </div>
                <button className="btn-primary self-start flex items-center gap-2 text-sm">Read Article <FiArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card overflow-hidden group cursor-pointer hover:shadow-glass-lg transition-all hover:-translate-y-1">
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="tag-badge text-xs mb-2">{post.category}</span>
                <h3 className="font-display font-bold text-gray-800 mb-2 group-hover:text-primary-700 transition-colors">{post.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{post.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
