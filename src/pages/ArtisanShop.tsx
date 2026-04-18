import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar, FiHeart, FiShare2, FiMessageSquare, FiMapPin,
  FiShoppingBag, FiCheck, FiArrowLeft, FiGrid, FiList
} from "react-icons/fi";
import { SAMPLE_PRODUCTS } from "@/constants";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";

const ARTISANS: Record<string, {
  id: string; name: string; tagline: string; bio: string;
  avatar: string; banner: string; location: string; joinedYear: string;
  rating: number; reviews: number; sales: number; followers: number;
  specialties: string[]; social: { instagram?: string; etsy?: string };
}> = {
  "lunas-jewelry": {
    id: "lunas-jewelry",
    name: "Luna's Jewelry",
    tagline: "Handcrafted crystal jewelry for the free spirit",
    bio: "Hi, I'm Luna! I've been making handcrafted jewelry with natural crystals and gemstones for over 8 years. Each piece is carefully designed to bring beauty and positive energy into your life. I source my crystals ethically and use recycled silver and gold-filled metals. Based in Austin, TX, I ship worldwide.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop",
    location: "Austin, TX",
    joinedYear: "2017",
    rating: 4.9,
    reviews: 847,
    sales: 2340,
    followers: 12400,
    specialties: ["Crystal Jewelry", "Gemstone Rings", "Healing Pendants", "Custom Orders"],
    social: { instagram: "@lunas.jewelry" },
  },
  "woven-wonders": {
    id: "woven-wonders",
    name: "Woven Wonders",
    tagline: "Sustainable textiles made with love and intention",
    bio: "Woven Wonders is a small-batch textile studio founded by Sofia Martinez. We create handwoven and macrame pieces using natural, sustainably sourced fibers. From chunky throw blankets to delicate wall art, every piece is a labor of love — taking 10–40 hours to complete. We believe in slow, intentional making.",
    avatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=200&h=200&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1576037728058-fe432b654d37?w=1200&h=400&fit=crop",
    location: "Burlington, VT",
    joinedYear: "2019",
    rating: 4.8,
    reviews: 412,
    sales: 980,
    followers: 7200,
    specialties: ["Macrame", "Woven Textiles", "Wall Art", "Plant Hangers"],
    social: { instagram: "@wovenwonders" },
  },
  "bloom-brush": {
    id: "bloom-brush",
    name: "Bloom & Brush",
    tagline: "Original watercolor art celebrating nature's beauty",
    bio: "I'm a botanical artist based in Portland, creating original watercolor illustrations and art prints inspired by the Pacific Northwest's incredible flora. Each print is made from my original artwork, professionally printed on archival paper. I also take custom commissions — perfect for wedding gifts or home décor.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=400&fit=crop",
    location: "Portland, OR",
    joinedYear: "2020",
    rating: 4.7,
    reviews: 293,
    sales: 640,
    followers: 9800,
    specialties: ["Watercolor", "Art Prints", "Botanical Art", "Custom Portraits"],
    social: { instagram: "@bloomandbrush", etsy: "BloomBrush" },
  },
  "glow-scent": {
    id: "glow-scent",
    name: "Glow & Scent Co",
    tagline: "Clean, handcrafted candles & bath rituals",
    bio: "Glow & Scent Co was born out of a passion for clean beauty and intentional self-care. We hand-pour all our soy candles in small batches using only premium fragrance oils and cotton wicks. Our bath and body collection is crafted with skin-loving botanicals. No parabens, no synthetic dyes — just good vibes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=1200&h=400&fit=crop",
    location: "Nashville, TN",
    joinedYear: "2018",
    rating: 4.8,
    reviews: 621,
    sales: 1820,
    followers: 5900,
    specialties: ["Soy Candles", "Bath Salts", "Body Oils", "Gift Sets"],
    social: { instagram: "@glowandscent" },
  },
};

const DEFAULT_ARTISAN = ARTISANS["lunas-jewelry"];

export default function ArtisanShop() {
  const { artisanId } = useParams<{ artisanId: string }>();
  const artisan = ARTISANS[artisanId || ""] || DEFAULT_ARTISAN;
  const [followed, setFollowed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"products" | "about" | "reviews">("products");
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const { toasts, addToast, removeToast } = useToast();

  const reviews = [
    { id: 1, author: "Emma T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces", rating: 5, text: "Absolutely stunning work! The crystal necklace arrived beautifully packaged and exceeded my expectations. Will definitely order again!", date: "Apr 12, 2025", product: "Rose Quartz Necklace" },
    { id: 2, author: "Priya P.", avatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=60&h=60&fit=crop&crop=faces", rating: 5, text: "I've ordered three times now and every single piece is perfect. The quality is exceptional and shipping is always fast.", date: "Apr 5, 2025", product: "Amethyst Earrings" },
    { id: 3, author: "Rachel G.", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=faces", rating: 4, text: "Beautiful piece, very well made. The packaging was eco-friendly which I really appreciate. Slight delay in shipping but worth the wait.", date: "Mar 28, 2025", product: "Crystal Healing Kit" },
    { id: 4, author: "Diana P.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces", rating: 5, text: "A true artisan! Every piece tells a story. I gifted this to my mom and she was moved to tears. So much love in the work.", date: "Mar 20, 2025", product: "Custom Crystal Set" },
  ];

  return (
    <div className="min-h-screen bg-cream-100 pt-20">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>
      </div>

      {/* Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={artisan.banner} alt={artisan.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-100/90" />
      </div>

      {/* Artisan Info */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative -mt-16 flex flex-col md:flex-row md:items-end gap-5 mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <img
              src={artisan.avatar}
              alt={artisan.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover ring-4 ring-white shadow-glass-lg"
            />
          </motion.div>

          <div className="flex-1 pb-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-800">{artisan.name}</h1>
              <p className="text-gray-500 mt-1 text-sm md:text-base">{artisan.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-3.5 h-3.5 text-primary-400" /> {artisan.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiStar className="w-3.5 h-3.5 text-accent fill-current" />
                  <strong className="text-gray-700">{artisan.rating}</strong> ({artisan.reviews.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <FiShoppingBag className="w-3.5 h-3.5 text-secondary" />
                  {artisan.sales.toLocaleString()} sales
                </span>
                <span>Member since {artisan.joinedYear}</span>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5 flex-shrink-0 pb-2"
          >
            <button className="p-2.5 rounded-xl border border-pink-200 text-gray-500 hover:bg-pink-50 hover:text-primary-600 transition-all">
              <FiShare2 className="w-5 h-5" />
            </button>
            <Link
              to="/dashboard/artisan/messages"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-secondary/30 text-secondary-700 hover:bg-secondary/10 transition-all text-sm font-medium"
            >
              <FiMessageSquare className="w-4 h-4" /> Message
            </Link>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setFollowed(!followed)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                followed
                  ? "bg-primary/15 text-primary-700 border border-primary/30"
                  : "bg-gradient-primary text-white shadow-soft hover:shadow-glass"
              }`}
            >
              <AnimatePresence mode="wait">
                {followed ? (
                  <motion.span key="following" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                    <FiCheck className="w-4 h-4" /> Following
                  </motion.span>
                ) : (
                  <motion.span key="follow" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                    <FiHeart className="w-4 h-4" /> Follow
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { label: "Followers", value: `${(artisan.followers / 1000).toFixed(1)}K` },
            { label: "Total Sales", value: artisan.sales.toLocaleString() },
            { label: "Reviews", value: artisan.reviews.toLocaleString() },
            { label: "Avg Rating", value: `${artisan.rating} ⭐` },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card p-4 text-center">
              <p className="font-display text-xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-6">
          {artisan.specialties.map(s => (
            <span key={s} className="px-3 py-1.5 bg-primary/10 text-primary-700 text-xs font-semibold rounded-xl">{s}</span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-pink-100 mb-7">
          {(["products", "about", "reviews"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-all relative ${
                activeTab === tab ? "text-primary-700" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="shopTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
              )}
            </button>
          ))}
          {activeTab === "products" && (
            <div className="ml-auto flex items-center gap-1 pb-2">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary-700" : "text-gray-400 hover:bg-pink-50"}`}>
                <FiGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary-700" : "text-gray-400 hover:bg-pink-50"}`}>
                <FiList className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`pb-16 ${viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" : "space-y-4"}`}
            >
              {SAMPLE_PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={viewMode === "list" ? "glass-card p-4 flex gap-4 group" : "glass-card overflow-hidden group"}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-square overflow-hidden relative">
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <button
                          onClick={() => { toggleWishlist(p as any); addToast(isInWishlist(p.id) ? "Removed from wishlist" : "Added to wishlist! ❤️"); }}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow"
                        >
                          <FiHeart className={`w-4 h-4 ${isInWishlist(p.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-bold text-primary-600">{formatPrice(p.price)}</p>
                          <button
                            onClick={() => { addToCart(p as any); addToast("Added to cart! 🛍️"); }}
                            className="p-1.5 rounded-lg bg-primary/10 text-primary-700 hover:bg-primary/20 transition-colors"
                          >
                            <FiShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{p.category}</p>
                        <p className="font-semibold text-gray-800 truncate">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p className="font-bold text-primary-600">{formatPrice(p.price)}</p>
                        <button
                          onClick={() => { addToCart(p as any); addToast("Added to cart! 🛍️"); }}
                          className="px-3 py-1.5 rounded-xl bg-gradient-primary text-white text-xs font-semibold hover:shadow-soft transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="pb-16 max-w-3xl"
            >
              <div className="glass-card p-6 space-y-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-800 mb-3">About {artisan.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{artisan.bio}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Based in", value: artisan.location },
                    { label: "Member since", value: artisan.joinedYear },
                    { label: "Total sales", value: artisan.sales.toLocaleString() + " orders" },
                    { label: "Response time", value: "Within 24 hours" },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 bg-pink-50/50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
                {artisan.social.instagram && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-xs bg-pink-100 text-primary-700 px-2.5 py-1 rounded-lg font-semibold">Instagram</span>
                    {artisan.social.instagram}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="pb-16 space-y-4 max-w-3xl"
            >
              {/* Rating Summary */}
              <div className="glass-card p-5 flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-gray-800">{artisan.rating}</p>
                  <div className="flex items-center gap-0.5 mt-1 justify-center">
                    {[1,2,3,4,5].map(s => (
                      <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(artisan.rating) ? "text-accent fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{artisan.reviews.toLocaleString()} reviews</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5,4,3,2,1].map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 w-3">{s}</span>
                      <FiStar className="w-3 h-3 text-accent fill-current" />
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-gold rounded-full"
                          style={{ width: `${s === 5 ? 78 : s === 4 ? 15 : s === 3 ? 5 : 2}%` }}
                        />
                      </div>
                      <span className="text-gray-400 w-7">{s === 5 ? "78%" : s === 4 ? "15%" : s === 3 ? "5%" : s === 2 ? "2%" : "0%"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              {reviews.map((rev, i) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800 text-sm">{rev.author}</p>
                        <p className="text-xs text-gray-400">{rev.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1,2,3,4,5].map(s => (
                          <FiStar key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? "text-accent fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{rev.text}</p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <FiShoppingBag className="w-3 h-3" /> Purchased: {rev.product}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
