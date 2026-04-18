import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPackage, FiTruck, FiCheck, FiClock, FiArrowRight, FiStar, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { SAMPLE_PRODUCTS } from "@/constants";
import StarRating from "@/components/features/StarRating";
import ToastContainer from "@/components/features/ToastContainer";
import { useToast } from "@/hooks/useToast";
import { addReview, hasReview } from "@/lib/reviewStore";

const INITIAL_ORDERS = [
  { id: "ORD-001", item: SAMPLE_PRODUCTS[0], status: "delivered", date: "Apr 10, 2025", total: 48, tracking: "TRK-9281", artisanName: "Luna's Jewelry" },
  { id: "ORD-002", item: SAMPLE_PRODUCTS[1], status: "shipped", date: "Apr 14, 2025", total: 72, tracking: "TRK-4572", artisanName: "Bohemian Threads" },
  { id: "ORD-003", item: SAMPLE_PRODUCTS[2], status: "processing", date: "Apr 16, 2025", total: 34, tracking: null, artisanName: "Glow & Scent Co" },
  { id: "ORD-004", item: SAMPLE_PRODUCTS[4], status: "confirmed", date: "Apr 17, 2025", total: 55, tracking: null, artisanName: "Bloom & Brush" },
  { id: "ORD-005", item: SAMPLE_PRODUCTS[5], status: "delivered", date: "Mar 28, 2025", total: 38, tracking: "TRK-2219", artisanName: "Luna's Jewelry" },
];

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  pending: { color: "bg-gray-100 text-gray-600", icon: FiClock, label: "Pending" },
  confirmed: { color: "bg-blue-100 text-blue-700", icon: FiCheck, label: "Confirmed" },
  processing: { color: "bg-amber-100 text-amber-700", icon: FiPackage, label: "Processing" },
  shipped: { color: "bg-purple-100 text-purple-700", icon: FiTruck, label: "Shipped" },
  delivered: { color: "bg-green-100 text-green-700", icon: FiCheck, label: "Delivered" },
};

interface ReviewModal {
  orderId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  artisanName: string;
}

export default function OrderHistory() {
  const [reviewModal, setReviewModal] = useState<ReviewModal | null>(null);
  const [reviewedOrders, setReviewedOrders] = useState<Set<string>>(new Set());
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const { toasts, addToast, removeToast } = useToast();

  const openReview = (order: typeof INITIAL_ORDERS[0]) => {
    setRating(5);
    setReviewTitle("");
    setReviewText("");
    setReviewModal({
      orderId: order.id,
      productId: order.item.id,
      productTitle: order.item.title,
      productImage: order.item.images[0],
      artisanName: order.artisanName,
    });
  };

  const submitReview = () => {
    if (!reviewModal || !reviewTitle.trim() || !reviewText.trim()) return;

    addReview({
      id: `rev_${Date.now()}`,
      orderId: reviewModal.orderId,
      productId: reviewModal.productId,
      productTitle: reviewModal.productTitle,
      productImage: reviewModal.productImage,
      artisanName: reviewModal.artisanName,
      rating,
      title: reviewTitle.trim(),
      text: reviewText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });

    setReviewedOrders((prev) => new Set([...prev, reviewModal.orderId]));
    setReviewModal(null);
    addToast("Review submitted! Thank you ⭐");
  };

  const isReviewed = (orderId: string) =>
    reviewedOrders.has(orderId) || hasReview(orderId);

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Order History</h1>
        <p className="text-sm text-gray-500">{INITIAL_ORDERS.length} orders total</p>
      </div>

      <div className="space-y-4">
        {INITIAL_ORDERS.map((order, i) => {
          const cfg = statusConfig[order.status];
          const Icon = cfg.icon;
          const reviewed = isReviewed(order.id);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={order.item.images[0]}
                  alt={order.item.title}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold text-gray-800">{order.item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.id} · {order.date} · by {order.artisanName}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${cfg.color}`}>
                      <Icon className="w-3.5 h-3.5" /> {cfg.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div>
                      <span className="text-primary-600 font-bold">{formatPrice(order.total)}</span>
                      {order.tracking && (
                        <span className="text-xs text-gray-400 ml-3">Tracking: {order.tracking}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {order.status === "delivered" && (
                        reviewed ? (
                          <span className="px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-xs font-semibold flex items-center gap-1">
                            <FiCheck className="w-3.5 h-3.5" /> Reviewed
                          </span>
                        ) : (
                          <button
                            onClick={() => openReview(order)}
                            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1"
                          >
                            <FiStar className="w-3.5 h-3.5" /> Leave Review
                          </button>
                        )
                      )}
                      {order.status === "shipped" && (
                        <Link
                          to="/dashboard/customer/tracking"
                          className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition-colors flex items-center gap-1"
                        >
                          Track <FiArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Review Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {reviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setReviewModal(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-glass-lg overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100">
                <h3 className="font-display text-lg font-bold text-gray-800">Leave a Review</h3>
                <button
                  onClick={() => setReviewModal(null)}
                  className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                {/* Product snippet */}
                <div className="flex items-center gap-3 p-3 bg-pink-50/60 rounded-2xl">
                  <img
                    src={reviewModal.productImage}
                    alt={reviewModal.productTitle}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{reviewModal.productTitle}</p>
                    <p className="text-xs text-gray-400">by {reviewModal.artisanName}</p>
                  </div>
                </div>

                {/* Star rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => setRating(s)}
                        className="transition-transform hover:scale-110"
                      >
                        <FiStar
                          className={`w-7 h-7 transition-colors ${
                            s <= rating ? "text-amber-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-600">
                      {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Review Title
                  </label>
                  <input
                    className="input-field"
                    placeholder="Summarize your experience"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    maxLength={80}
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Review
                  </label>
                  <textarea
                    className="input-field resize-none h-24"
                    placeholder="Describe the product quality, packaging, and artisan communication…"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-400 text-right mt-1">{reviewText.length}/500</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-pink-100 bg-gray-50/50">
                <button
                  onClick={() => setReviewModal(null)}
                  className="btn-secondary text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  disabled={!reviewTitle.trim() || !reviewText.trim()}
                  className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheck className="w-4 h-4" /> Submit Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
