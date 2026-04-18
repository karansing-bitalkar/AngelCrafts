import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiStar, FiEdit2, FiCheck, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SAMPLE_PRODUCTS } from "@/constants";
import StarRating from "@/components/features/StarRating";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import { getReviews, subscribe, ReviewEntry } from "@/lib/reviewStore";

/* Seed reviews that exist from the beginning */
const SEED_REVIEWS: ReviewEntry[] = [
  {
    id: "seed1",
    orderId: "SEED-001",
    productId: "p1",
    productTitle: SAMPLE_PRODUCTS[0].title,
    productImage: SAMPLE_PRODUCTS[0].images[0],
    artisanName: "Luna's Jewelry",
    rating: 5,
    title: "Absolutely stunning!",
    text: "The rose quartz necklace is even more beautiful in person. The artisan took great care in packaging.",
    date: "Apr 12, 2025",
  },
  {
    id: "seed2",
    orderId: "SEED-002",
    productId: "p3",
    productTitle: SAMPLE_PRODUCTS[2].title,
    productImage: SAMPLE_PRODUCTS[2].images[0],
    artisanName: "Glow & Scent Co",
    rating: 4,
    title: "Lovely candles",
    text: "The lavender scent is perfect — not too strong. Will definitely order again.",
    date: "Mar 28, 2025",
  },
];

export default function CustomerReviews() {
  /* Live reviews from the shared store (submitted from OrderHistory) */
  const [dynamicReviews, setDynamicReviews] = useState<ReviewEntry[]>(getReviews());
  const [writing, setWriting] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const { toasts, addToast, removeToast } = useToast();

  /* Subscribe to store updates */
  useEffect(() => {
    const unsub = subscribe(() => setDynamicReviews([...getReviews()]));
    return unsub;
  }, []);

  /* Merge: store reviews first, then seeds (avoiding duplicates by id) */
  const allReviews: ReviewEntry[] = [
    ...dynamicReviews,
    ...SEED_REVIEWS.filter((s) => !dynamicReviews.find((d) => d.id === s.id)),
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;
    setWriting(false);
    setNewTitle("");
    setNewText("");
    addToast("Review submitted! Thank you for your feedback. ⭐");
  };

  const avgRating =
    allReviews.length > 0
      ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
      : "—";

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">My Reviews</h1>
          <p className="text-sm text-gray-500">{allReviews.length} reviews written</p>
        </div>
        <button
          onClick={() => setWriting(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <FiEdit2 className="w-4 h-4" /> Write Review
        </button>
      </div>

      {/* Summary */}
      <div className="glass-card p-5 flex items-center gap-6">
        <div className="text-center px-4">
          <p className="font-display text-4xl font-bold text-gray-800">{avgRating}</p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(Number(avgRating))
                    ? "text-amber-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">avg rating</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((s) => {
            const count = allReviews.filter((r) => r.rating === s).length;
            const pct = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
            return (
              <div key={s} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-gray-500">{s}</span>
                <FiStar className="w-3 h-3 text-amber-400 fill-current" />
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
                <span className="text-gray-400 w-6">{count}</span>
              </div>
            );
          })}
        </div>
        <div className="hidden sm:block pl-4 border-l border-pink-100">
          <p className="text-xs text-gray-400 mb-2">Want to review more?</p>
          <Link to="/dashboard/customer/orders" className="btn-secondary text-xs py-2">
            View Orders
          </Link>
        </div>
      </div>

      {/* Quick write form */}
      {writing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-lg font-bold text-gray-800 mb-4">Write a Review</h3>
          <form onSubmit={handleQuickSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <StarRating rating={newRating} size={28} interactive onRate={setNewRating} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Review Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Review</label>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows={4}
                placeholder="Tell us about the product quality, packaging, and artisan communication…"
                className="input-field resize-none"
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setWriting(false)} className="btn-secondary text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex items-center gap-2 text-sm">
                <FiCheck className="w-4 h-4" /> Submit Review
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Review list */}
      <div className="space-y-4">
        {allReviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card p-5"
          >
            <div className="flex gap-4">
              <img
                src={r.productImage}
                alt={r.productTitle}
                className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-semibold text-sm text-gray-800 truncate">{r.productTitle}</p>
                    <p className="text-xs text-gray-400">by {r.artisanName}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= r.rating ? "text-amber-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{r.date}</span>
                </div>
                <p className="font-semibold text-sm text-gray-700 mt-2">{r.title}</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{r.text}</p>
                {r.orderId && !r.orderId.startsWith("SEED") && (
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <FiShoppingBag className="w-3 h-3" /> Order: {r.orderId}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {allReviews.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">⭐</div>
          <h3 className="font-display text-xl font-bold text-gray-700 mb-2">No reviews yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            After your order is delivered, you can leave a review from Order History.
          </p>
          <Link to="/dashboard/customer/orders" className="btn-primary text-sm">
            View Orders
          </Link>
        </div>
      )}
    </div>
  );
}
