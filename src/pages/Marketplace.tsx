import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList, FiX, FiSliders, FiStar, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/constants";
import ProductCard from "@/components/features/ProductCard";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, truncate } from "@/lib/utils";

/** Same slug helper as ProductCard */
function toShopSlug(artisanId: string, artisanName: string): string {
  if (/^a\d+$/.test(artisanId)) {
    return artisanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  return artisanId;
}

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const navigate = useNavigate();

  const filtered = SAMPLE_PRODUCTS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.includes(search.toLowerCase()));
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchCat && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="pt-20 min-h-screen">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div className="bg-gradient-hero py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag-badge mb-3">🛍️ Marketplace</span>
            <h1 className="section-title mb-3">Explore Handmade Creations</h1>
            <p className="section-subtitle max-w-xl mx-auto">
              Discover thousands of unique products crafted with passion by artisans worldwide.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 bg-white rounded-2xl shadow-glass p-2 max-w-2xl mx-auto mt-6"
          >
            <FiSearch className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, artisans, categories..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-2"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-4 h-4" />
              </button>
            )}
            <button className="btn-primary px-5 py-2 text-sm">Search</button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="glass-card p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-gray-800">Filters</h3>
                <button
                  onClick={() => { setSelectedCategory("all"); setPriceRange([0, 200]); }}
                  className="text-xs text-primary-600 font-medium hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                      selectedCategory === "all"
                        ? "bg-primary/15 text-primary-700 font-medium"
                        : "text-gray-600 hover:bg-pink-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-primary/15 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-pink-50"
                      }`}
                    >
                      <span>
                        {cat.icon} {cat.name}
                      </span>
                      <span className="text-xs text-gray-400">{cat.count.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-1">
                  {(
                    [
                      [0, 25],
                      [25, 50],
                      [50, 100],
                      [100, 200],
                    ] as [number, number][]
                  ).map(([min, max]) => (
                    <button
                      key={`${min}-${max}`}
                      onClick={() => setPriceRange([min, max])}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                        priceRange[0] === min && priceRange[1] === max
                          ? "bg-primary/15 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-pink-50"
                      }`}
                    >
                      ${min} – ${max}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-sm text-gray-500">{sorted.length} products found</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-pink-200 text-sm text-gray-600 hover:bg-pink-50"
                >
                  <FiSliders className="w-4 h-4" /> Filters
                </button>
                <div className="flex items-center gap-1 bg-white rounded-xl border border-pink-100 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-primary/20 text-primary-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-primary/20 text-primary-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(""); setSelectedCategory("all"); }}
                  className="mt-4 btn-primary text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p as any}
                    onAddToCart={() => addToast(`${p.title} added to cart! 🛍️`)}
                  />
                ))}
              </div>
            ) : (
              /* ── List View ─────────────────────────────────────── */
              <div className="flex flex-col gap-4">
                {sorted.map((p, i) => {
                  const slug = toShopSlug(p.artisanId, p.artisanName);
                  const inWish = isInWishlist(p.id);
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="glass-card p-4 flex gap-4 group"
                    >
                      {/* Image */}
                      <Link to={`/marketplace/${p.id}`} className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {/* Artisan link */}
                        <button
                          onClick={() => navigate(`/shop/${slug}`)}
                          className="flex items-center gap-1.5 mb-1 group/art"
                        >
                          <img
                            src={p.artisanAvatar}
                            alt={p.artisanName}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span className="text-xs text-gray-400 group-hover/art:text-primary-600 transition-colors font-medium">
                            {p.artisanName}
                          </span>
                        </button>

                        <Link to={`/marketplace/${p.id}`}>
                          <h3 className="font-semibold text-gray-800 text-sm hover:text-primary-700 transition-colors truncate">
                            {truncate(p.title, 55)}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>

                        <div className="flex items-center gap-2 mt-1.5">
                          <FiStar className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                          <span className="text-xs text-gray-400">({p.reviewCount})</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <div className="text-right">
                          <p className="font-bold text-primary-600 text-base">{formatPrice(p.price)}</p>
                          {p.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">{formatPrice(p.originalPrice)}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => { toggleWishlist(p as any); }}
                            className={`p-2 rounded-xl border transition-all ${
                              inWish
                                ? "border-red-300 bg-red-50 text-red-500"
                                : "border-pink-200 text-gray-400 hover:bg-pink-50 hover:text-red-400"
                            }`}
                          >
                            <FiHeart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={() => { addToCart(p as any); addToast(`${p.title} added to cart! 🛍️`); }}
                            className="px-4 py-2 rounded-xl bg-gradient-primary text-white text-xs font-semibold hover:shadow-soft transition-all flex items-center gap-1.5"
                          >
                            <FiShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
