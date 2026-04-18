import { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiPlus, FiX, FiCheck } from "react-icons/fi";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import { CATEGORIES } from "@/constants";

export default function AddProduct() {
  const { toasts, addToast, removeToast } = useToast();
  const [form, setForm] = useState({
    title: "", description: "", price: "", originalPrice: "", category: "",
    stockCount: "", tags: "", isCustomizable: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = () => {
    const demoImages = [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=400&h=400&fit=crop",
    ];
    setImages((prev) => [...prev, demoImages[prev.length % 2]]);
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
                <img src={img} alt={`Upload ${i+1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <FiX className="w-5 h-5 text-white" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button type="button" onClick={handleImageUpload} className="w-24 h-24 rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-pink-50 transition-all text-gray-400 hover:text-primary-600">
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
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Handcrafted Rose Quartz Necklace" className="input-field" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Describe your product in detail..." className="input-field resize-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (USD) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" className="input-field" required min="0" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (optional)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="0.00" className="input-field" min="0" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Stock Count *</label>
              <input type="number" value={form.stockCount} onChange={(e) => setForm({ ...form, stockCount: e.target.value })} placeholder="10" className="input-field" required min="0" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="jewelry, necklace, crystal, handmade" className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-12 h-6 rounded-full transition-colors ${form.isCustomizable ? "bg-primary" : "bg-gray-200"} relative`} onClick={() => setForm({ ...form, isCustomizable: !form.isCustomizable })}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isCustomizable ? "translate-x-7" : "translate-x-1"}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">Accept Custom Orders</span>
              </label>
            </div>
          </div>
        </motion.div>

        <button type="submit" className="btn-gold flex items-center gap-2 px-8">
          <FiPlus className="w-5 h-5" /> List Product
        </button>
      </form>
    </div>
  );
}
