import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/constants";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import ProductCard from "@/components/features/ProductCard";

export default function BrowseProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { toasts, addToast, removeToast } = useToast();

  const filtered = SAMPLE_PRODUCTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Browse Products</h1>
        <p className="text-sm text-gray-500">Discover unique handmade items</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-11" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field sm:w-48">
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p as any} onAddToCart={() => addToast(`${p.title} added to cart! 🛍️`)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">🔍</div>
          <h3 className="font-display text-xl font-bold text-gray-700">No products found</h3>
          <p className="text-gray-500 text-sm mt-1">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}
