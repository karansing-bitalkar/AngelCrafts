import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar, FiHeart, FiShoppingBag, FiChevronLeft, FiChevronRight,
  FiCheck, FiShare2, FiTruck, FiShield, FiRefreshCw, FiMapPin,
} from "react-icons/fi";
import { SAMPLE_PRODUCTS } from "@/constants";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { formatPrice } from "@/lib/utils";
import AuthGateModal from "@/components/features/AuthGateModal";
import ToastContainer from "@/components/features/ToastContainer";
import { useToast } from "@/hooks/useToast";
import { Link } from "react-router-dom";

/** Slugify artisan name to shop URL */
function toShopSlug(artisanId: string, artisanName: string): string {
  if (/^a\d+$/.test(artisanId)) {
    return artisanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  return artisanId;
}

const MOCK_REVIEWS = [
  { id: 1, name: "Sophia R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=faces", rating: 5, date: "Apr 10, 2025", title: "Absolutely stunning!", text: "This is even more beautiful in person. The artisan packaged it so carefully. Will definitely buy again!", verified: true },
  { id: 2, name: "Marcus T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces", rating: 4, date: "Mar 28, 2025", title: "Great quality", text: "Really solid craftsmanship. Arrived quickly and well-packaged. Minor thing: color was slightly different than photo but still lovely.", verified: true },
  { id: 3, name: "Priya M.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces", rating: 5, date: "Mar 15, 2025", title: "Perfect gift!", text: "Bought this as a birthday gift and my friend absolutely loved it. The quality is amazing for the price.", verified: false },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const { toasts, addToast, removeToast } = useToast();
  const [authModal, setAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"reviews" | "details" | "shipping">("reviews");

  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">This product doesn't exist or has been removed.</p>
        <button onClick={() => navigate("/marketplace")} className="btn-primary">
          Back to Marketplace
        </button>
      </div>
    );
  }

  // Pad images with extras for gallery variety
  const images = [
    ...product.images,
    `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&random=${product.id}1`,
    `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop&random=${product.id}2`,
  ].slice(0, 4);

  const shopSlug = toShopSlug(product.artisanId, product.artisanName);
  const inWishlist = isInWishlist(product.id);
  const avgRating = (product.rating ?? 4.8).toFixed(1);

  const requireAuth = (action: string, fn: () => void) => {
    if (!isAuthenticated) {
      setAuthAction(action);
      setAuthModal(true);
      return;
    }
    fn();
  };

  const handleAddToCart = () => {
    requireAuth("add items to your cart", () => {
      addToCart(product as any, quantity);
      setAddedToCart(true);
      addToast(`${product.title} added to cart! 🛍️`);
      setTimeout(() => setAddedToCart(false), 2500);
    });
  };

  const handleWishlist = () => {
    requireAuth("save items to your wishlist", () => {
      toggleWishlist(product as any);
      addToast(inWishlist ? "Removed from wishlist" : "Added to wishlist ❤️");
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-cream-100">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <AuthGateModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        action={authAction}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-primary-600 transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[180px]">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── Image Gallery ──────────────────────────────── */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-glass group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isFeatured && (
                  <span className="px-3 py-1 bg-accent-400 text-white text-xs font-bold rounded-xl shadow">Featured</span>
                )}
                {(product as any).originalPrice && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-xl shadow">Sale</span>
                )}
              </div>

              {/* Share */}
              <button className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all text-gray-600 opacity-0 group-hover:opacity-100">
                <FiShare2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImg === i
                      ? "border-primary-400 shadow-soft scale-105"
                      : "border-transparent hover:border-pink-200"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info ────────────────────────────────── */}
          <div className="space-y-5">
            {/* Artisan Card */}
            <Link
              to={`/shop/${shopSlug}`}
              className="flex items-center gap-3 group w-fit"
            >
              <img
                src={product.artisanAvatar}
                alt={product.artisanName}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-pink-100"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                  {product.artisanName}
                </p>
                <p className="text-xs text-primary-500 group-hover:underline">View Shop →</p>
              </div>
            </Link>

            {/* Title */}
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FiStar
                    key={s}
                    className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-800 text-sm">{avgRating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
              {(product as any).inStock && (
                <span className="ml-2 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  In Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {(product as any).originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice((product as any).originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-600 text-sm font-bold">
                    {Math.round((1 - product.price / (product as any).originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

            {/* Tags */}
            {(product as any).tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(product as any).tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center font-bold text-gray-700 transition-all hover:shadow-sm"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min((product as any).stockCount ?? 10, quantity + 1))}
                  className="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center font-bold text-gray-700 transition-all hover:shadow-sm"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">
                {(product as any).stockCount} available
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                  addedToCart
                    ? "bg-green-500 text-white shadow-soft"
                    : "bg-gradient-primary text-white shadow-soft hover:shadow-glass"
                }`}
              >
                {addedToCart ? (
                  <>
                    <FiCheck className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-5 h-5" /> Add to Cart
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={handleWishlist}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  inWishlist
                    ? "border-red-300 bg-red-50 text-red-500 shadow-soft"
                    : "border-pink-200 text-gray-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50"
                }`}
              >
                <FiHeart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: FiTruck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: FiShield, label: "Secure Pay", sub: "100% protected" },
                { icon: FiRefreshCw, label: "Easy Returns", sub: "30-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-pink-50/60 rounded-2xl">
                  <Icon className="w-4 h-4 text-primary-600 mb-1.5" />
                  <p className="text-xs font-semibold text-gray-700">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Artisan info card */}
            <div className="glass-card p-4 flex items-start gap-4">
              <img
                src={product.artisanAvatar}
                alt={product.artisanName}
                className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 ring-2 ring-pink-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{product.artisanName}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <FiMapPin className="w-3 h-3" /> Verified Artisan
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <FiStar className="w-3 h-3 fill-current" />
                    <span className="font-bold">{avgRating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Crafting unique handmade pieces with love and attention to detail. All products are made-to-order with premium materials.
                </p>
                <Link
                  to={`/shop/${shopSlug}`}
                  className="mt-2 inline-block text-xs font-semibold text-primary-600 hover:underline"
                >
                  Visit {product.artisanName}'s Shop →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Reviews / Details / Shipping Tabs ─────────────────── */}
        <div className="mt-12">
          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-pink-100 mb-6">
            {(["reviews", "details", "shipping"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium transition-all capitalize relative ${
                  activeTab === tab ? "text-primary-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="productTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Rating summary */}
                <div className="glass-card p-5 flex items-center gap-6">
                  <div className="text-center px-4">
                    <p className="font-display text-4xl font-bold text-gray-800">{avgRating}</p>
                    <div className="flex items-center gap-0.5 mt-1 justify-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400 fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((s) => {
                      const counts = [60, 25, 8, 4, 3];
                      const pct = counts[5 - s];
                      return (
                        <div key={s} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-gray-500">{s}</span>
                          <FiStar className="w-3 h-3 text-amber-400 fill-current" />
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.7, delay: s * 0.05 }}
                              className="h-full bg-amber-400 rounded-full"
                            />
                          </div>
                          <span className="text-gray-400 w-6">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review cards */}
                {MOCK_REVIEWS.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-5"
                  >
                    <div className="flex items-start gap-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm text-gray-800">{review.name}</p>
                            {review.verified && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full flex items-center gap-0.5">
                                <FiCheck className="w-2.5 h-2.5" /> Verified
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FiStar key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "text-amber-400 fill-current" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <p className="font-semibold text-sm text-gray-700 mt-2">{review.title}</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6 space-y-4"
              >
                <h3 className="font-display font-bold text-gray-800">Product Details</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    ["Material", "Premium handcrafted natural materials"],
                    ["Category", product.category],
                    ["Artisan", product.artisanName],
                    ["Stock", `${(product as any).stockCount ?? "10+"} units available`],
                    ["Rating", `${avgRating}/5 (${product.reviewCount} reviews)`],
                    ["Customizable", (product as any).isCustomizable ? "Yes — contact artisan" : "No"],
                  ].map(([key, val]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-sm font-semibold text-gray-600 min-w-[100px]">{key}:</span>
                      <span className="text-sm text-gray-500 capitalize">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-pink-100 pt-4">
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">Full Description</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {product.description} Each piece is individually handcrafted with care, ensuring unique character and quality. Our artisans use only premium materials sourced ethically and responsibly. Small variations in color and texture are natural features of handmade products, not defects.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6 space-y-5"
              >
                <h3 className="font-display font-bold text-gray-800">Shipping & Returns</h3>
                {[
                  { icon: FiTruck, title: "Standard Shipping", desc: "5–8 business days · Free on orders over $50" },
                  { icon: FiTruck, title: "Express Shipping", desc: "2–3 business days · $12.99 flat rate" },
                  { icon: FiShield, title: "Order Protection", desc: "All orders are fully insured during transit" },
                  { icon: FiRefreshCw, title: "30-Day Returns", desc: "Not satisfied? Return for a full refund, no questions asked." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 pb-4 border-b border-pink-50 last:border-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-gray-800 mb-6">
            More from {product.artisanName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SAMPLE_PRODUCTS.filter((p) => p.artisanId === product.artisanId && p.id !== product.id)
              .slice(0, 4)
              .concat(
                SAMPLE_PRODUCTS.filter(
                  (p) => p.category === product.category && p.id !== product.id
                ).slice(0, 4)
              )
              .slice(0, 4)
              .map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/marketplace/${p.id}`)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-800 truncate">{p.title}</p>
                    <p className="text-xs font-bold text-primary-600 mt-1">{formatPrice(p.price)}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
