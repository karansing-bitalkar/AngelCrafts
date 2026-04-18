import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiShare2, FiPlus, FiTrendingUp } from "react-icons/fi";
import communityBanner from "@/assets/community-banner.jpg";

const posts = [
  { id: 1, author: "Luna Craft", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces", title: "Just finished this macrame wall piece! 🌿", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop", likes: 284, comments: 42, time: "2h ago", tag: "Macrame" },
  { id: 2, author: "Bloom & Brush", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces", title: "Watercolor florals for spring! These prints are now in my shop 🌸", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop", likes: 412, comments: 67, time: "5h ago", tag: "Watercolor" },
  { id: 3, author: "Clay & Canvas", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces", title: "New ceramic mug collection — each one is unique! ☕", image: "https://images.unsplash.com/photo-1510706019793-fd0ea8ba6090?w=600&h=400&fit=crop", likes: 176, comments: 28, time: "1d ago", tag: "Ceramics" },
  { id: 4, author: "Glow & Scent Co", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces", title: "Lavender & rose candle making session today! 🕯️✨", image: "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=600&h=400&fit=crop", likes: 321, comments: 54, time: "1d ago", tag: "Candles" },
  { id: 5, author: "Luna's Jewelry", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces", title: "New rose quartz crystal collection 💎 Limited pieces available!", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop", likes: 567, comments: 93, time: "2d ago", tag: "Jewelry" },
  { id: 6, author: "Woven Wonders", avatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=80&h=80&fit=crop&crop=faces", title: "Handloomed throw blankets — perfect for cozy evenings 🧶", image: "https://images.unsplash.com/photo-1576037728058-fe432b654d37?w=600&h=400&fit=crop", likes: 234, comments: 37, time: "3d ago", tag: "Textiles" },
];

const topArtisans = [
  { name: "Luna's Jewelry", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces", followers: "12.4K", products: 84 },
  { name: "Bloom & Brush", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces", followers: "9.8K", products: 52 },
  { name: "Clay & Canvas", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces", followers: "7.2K", products: 63 },
  { name: "Glow & Scent Co", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces", followers: "5.9K", products: 41 },
];

export default function Community() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("feed");

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <img src={communityBanner} alt="Community" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-secondary/85" />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">🌸 Creative Community</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Where Artisans Connect</h1>
            <p className="text-white/85 text-lg mb-6 max-w-2xl mx-auto">
              Share your creations, discover inspiration, follow your favorite artisans, and be part of the world's most passionate handmade community.
            </p>
            <Link to="/register" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2">
              <FiPlus className="w-5 h-5" /> Join Community
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-pink-100 pb-4">
          {["feed", "trending", "following"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-primary/15 text-primary-700" : "text-gray-500 hover:bg-pink-50"}`}>
              {tab === "feed" ? "🏠 " : tab === "trending" ? "🔥 " : "❤️ "}{tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                  <span className="tag-badge text-xs">{post.tag}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{post.title}</p>
                <div className="rounded-2xl overflow-hidden mb-4 aspect-video">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-5">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 ${likedPosts.has(post.id) ? "text-red-500" : "text-gray-500 hover:text-red-400"}`}>
                    <FiHeart className={`w-5 h-5 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                    {likedPosts.has(post.id) ? post.likes + 1 : post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                    <FiMessageCircle className="w-5 h-5" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-secondary transition-colors ml-auto">
                    <FiShare2 className="w-5 h-5" /> Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Artisans */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <FiTrendingUp className="w-5 h-5 text-primary-500" />
                <h3 className="font-display font-bold text-gray-800">Top Artisans</h3>
              </div>
              <div className="space-y-4">
                {topArtisans.map((a, i) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                    <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.followers} followers</p>
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-primary/10 text-primary-700 text-xs font-semibold hover:bg-primary/20 transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Craft Tips */}
            <div className="glass-card-pink p-5">
              <h3 className="font-display font-bold text-gray-800 mb-3">✨ Craft Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {["Use natural lighting for product photography", "Add texture descriptions to attract buyers", "Respond to messages within 24 hours", "Bundle products for higher cart values"].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-primary-400 mt-0.5">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Share */}
            <div className="glass-card p-5">
              <h3 className="font-display font-bold text-gray-800 mb-3">📸 Share Your Craft</h3>
              <p className="text-sm text-gray-500 mb-4">Post your latest creation and connect with the community</p>
              <textarea className="input-field text-sm resize-none h-20 mb-3" placeholder="What did you make today? ✨" />
              <button className="btn-primary w-full text-sm">Post to Community</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
