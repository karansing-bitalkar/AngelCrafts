import { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiPlus, FiX, FiCheck, FiZap } from "react-icons/fi";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import { CATEGORIES } from "@/constants";
import { supabase } from "@/lib/supabase";
import { FunctionsHttpError } from "@supabase/supabase-js";

export default function AddProduct() {
  const { toasts, addToast, removeToast } = useToast();
  const [form, setForm] = useState({
    title: "", description: "", price: "", originalPrice: "", category: "",
    stockCount: "", tags: "", isCustomizable: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleImageUpload = () => {
    const demoImages = [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=400&h=400&fit=crop",
    ];
    setImages((prev) => [...prev, demoImages[prev.length % 2]]);
  };

  /** Call OnSpace AI edge function to generate a product description */
  const handleAIGenerate = async () => {
    if (!form.title.trim()) {
      addToast("Please enter a product title first ✍️");
      return;
    }
    setAiLoading(true);
    const categoryName =
      CATEGORIES.find((c) => c.id === form.category)?.name ?? form.category ?? "handmade craft";

    const { data, error } = await supabase.functions.invoke("generate-product-description", {
      body: { title: form.title, category: categoryName },
    });

    if (error) {
      let msg = error.message;
      if (error instanceof FunctionsHttpError) {
        try {
          const statusCode = error.context?.status ?? 500;
          const text = await error.context?.text();
          msg = `[${statusCode}] ${text || error.message}`;
        } catch {
          msg = error.message;
        }
      }
      console.error("AI generate error:", msg);
      addToast("AI generation failed. Please try again.");
    } else if (data?.description) {
      setForm((prev) => ({ ...prev, description: data.description }));
      addToast("AI description generated! ✨");
    }
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Product listed successfully! 🎉");
    setForm({ title: "", description: "", price: "", originalPrice: "", category: "", stockCount: "", tags: "", isCustomizable: false });
    setImages([]);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-sm text-gray-500">List a new handmade item in your shop</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="font-display text-base font-bold text-gray-800 mb-4">Product Images</h3>
          <div className="flex flex-wrap gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group">
                <img src={img} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <FiX className="w-5 h-5 text-white" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                type="button"
                onClick={handleImageUpload}
                className="w-24 h-24 rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-pink-50 transition-all text-gray-400 hover:text-primary-600"
              >
                <FiUpload className="w-5 h-5" />
                <span className="text-xs">Upload</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="font-display text-base font-bold text-gray-800 mb-4">Product Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Handcrafted Rose Quartz Necklace"
                className="input-field"
                required
              />
            </div>

            {/* Description with AI button */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <motion.button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={aiLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {aiLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <FiZap className="w-3.5 h-3.5" />
                      AI Generate
                    </>
                  )}
                </motion.button>
              </div>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
                placeholder="Describe your product in detail, or click 'AI Generate' to auto-fill from title & category…"
                className="input-field resize-none"
                required
              />
              {aiLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mt-2 text-xs text-purple-600"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-purple-500"
                      />
                    ))}
                  </div>
                  OnSpace AI is writing your description…
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (USD) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className="input-field"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (optional)</label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                placeholder="0.00"
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Count *</label>
              <input
                type="number"
                value={form.stockCount}
                onChange={(e) => setForm({ ...form, stockCount: e.target.value })}
                placeholder="10"
                className="input-field"
                required
                min="0"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="jewelry, necklace, crystal, handmade"
                className="input-field"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${form.isCustomizable ? "bg-primary" : "bg-gray-200"} relative`}
                  onClick={() => setForm({ ...form, isCustomizable: !form.isCustomizable })}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isCustomizable ? "translate-x-7" : "translate-x-1"}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">Accept Custom Orders</span>
              </label>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-gold flex items-center gap-2 px-8">
            {submitted ? <><FiCheck className="w-5 h-5" /> Listed!</> : <><FiPlus className="w-5 h-5" /> List Product</>}
          </button>
          <p className="text-xs text-gray-400">
            💡 Tip: Use the <strong>AI Generate</strong> button to write a compelling description instantly
          </p>
        </div>
      </form>
    </div>
  );
}
