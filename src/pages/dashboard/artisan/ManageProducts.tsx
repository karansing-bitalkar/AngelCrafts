import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, FiImage, FiDollarSign, FiPackage } from "react-icons/fi";
import Modal from "@/components/features/Modal";
import Pagination from "@/components/features/Pagination";
import ConfirmModal from "@/components/features/ConfirmModal";
import ToastContainer from "@/components/features/ToastContainer";
import { useToast } from "@/hooks/useToast";
import { formatPrice } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "sold_out";
  image: string;
  description: string;
  sales: number;
  rating: number;
}

const statusColors = {
  active: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  sold_out: "bg-red-100 text-red-700",
};

const initialProducts: Product[] = [
  { id: "p1", title: "Rose Quartz Crystal Necklace", category: "Jewelry", price: 48, stock: 15, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Handcrafted rose quartz pendant on sterling silver chain.", sales: 128, rating: 4.9 },
  { id: "p2", title: "Amethyst Drop Earrings", category: "Jewelry", price: 38, stock: 9, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Raw amethyst crystal drops on 14K gold-filled ear wires.", sales: 74, rating: 4.8 },
  { id: "p3", title: "Crystal Healing Kit", category: "Wellness", price: 65, stock: 12, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Curated set of 7 healing crystals with velvet pouch.", sales: 56, rating: 4.7 },
  { id: "p4", title: "Moonstone Ring", category: "Jewelry", price: 55, stock: 6, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Sterling silver moonstone ring with ethically sourced stone.", sales: 43, rating: 4.9 },
  { id: "p5", title: "Labradorite Bracelet", category: "Jewelry", price: 42, stock: 0, status: "sold_out", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Hand-beaded labradorite bracelet with gold fill clasp.", sales: 88, rating: 4.6 },
  { id: "p6", title: "Citrine Sunburst Pendant", category: "Jewelry", price: 58, stock: 4, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Golden citrine crystal wrapped in 14K gold-filled wire.", sales: 31, rating: 4.8 },
  { id: "p7", title: "Crystal Grid Set", category: "Wellness", price: 89, stock: 8, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Complete crystal grid with selenite board and 12 stones.", sales: 22, rating: 4.9 },
  { id: "p8", title: "Lapis Lazuli Pendant", category: "Jewelry", price: 44, stock: 7, status: "draft", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop", description: "Deep blue lapis lazuli set in oxidized sterling silver.", sales: 0, rating: 0 },
];

const emptyForm = { title: "", category: "Jewelry", price: "", stock: "", description: "", status: "active" as Product["status"] };
const CATEGORIES = ["Jewelry", "Wellness", "Accessories", "Art", "Home Decor"];

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = useMemo(() =>
    products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAdd = () => {
    setProducts(prev => [{
      id: `p${Date.now()}`, ...form,
      price: Number(form.price), stock: Number(form.stock),
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      sales: 0, rating: 0,
    }, ...prev]);
    setAddModal(false);
    setForm(emptyForm);
    addToast("Product added successfully! ✅");
  };

  const handleEdit = () => {
    if (!selected) return;
    setProducts(prev => prev.map(p => p.id === selected.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    setEditModal(false);
    addToast("Product updated! ✅");
  };

  const handleDelete = () => {
    if (!selected) return;
    setProducts(prev => prev.filter(p => p.id !== selected.id));
    setDeleteModal(false);
    addToast("Product deleted! 🗑️");
  };

  const openEdit = (p: Product) => {
    setSelected(p);
    setForm({ title: p.title, category: p.category, price: String(p.price), stock: String(p.stock), description: p.description, status: p.status });
    setEditModal(true);
  };

  const ProductForm = () => (
    <div className="space-y-4">
      {/* Image Upload UI */}
      <div className="border-2 border-dashed border-pink-200 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <FiImage className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Drop image here or <span className="text-primary-600 font-medium">browse</span></p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Title</label>
        <input className="input-field" placeholder="Beautiful Handmade Item" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
        <textarea className="input-field resize-none h-20" placeholder="Describe your product..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
          <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
          <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Product["status"] }))}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price ($)</label>
          <div className="relative">
            <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input-field pl-9" type="number" placeholder="0.00" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock</label>
          <div className="relative">
            <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input-field pl-9" type="number" placeholder="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">Manage Products</h1>
          <p className="text-sm text-gray-500">{products.length} products in your shop</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setAddModal(true); }} className="btn-primary flex items-center gap-2">
          <FiPlus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active", value: products.filter(p => p.status === "active").length, color: "text-green-600 bg-green-50" },
          { label: "Draft", value: products.filter(p => p.status === "draft").length, color: "text-gray-600 bg-gray-50" },
          { label: "Sold Out", value: products.filter(p => p.status === "sold_out").length, color: "text-red-500 bg-red-50" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-3 text-center ${color}`}>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-xs font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input className="input-field pl-11" placeholder="Search products..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paged.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-card overflow-hidden group">
            <div className="relative aspect-square overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-lg text-xs font-semibold ${statusColors[p.status]}`}>{p.status.replace("_", " ")}</span>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-400 mb-0.5">{p.category}</p>
              <p className="text-sm font-semibold text-gray-800 truncate mb-2">{p.title}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span>{formatPrice(p.price)} · {p.stock} left</span>
                <span>{p.sales} sold</span>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => { setSelected(p); setViewModal(true); }} className="flex-1 py-1.5 rounded-xl text-xs font-medium border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
                  <FiEye className="w-3.5 h-3.5" /> View
                </button>
                <button onClick={() => openEdit(p)} className="flex-1 py-1.5 rounded-xl text-xs font-medium border border-amber-200 text-amber-500 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1">
                  <FiEdit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => { setSelected(p); setDeleteModal(true); }} className="p-1.5 rounded-xl border border-red-200 text-red-400 hover:bg-red-50 transition-colors">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {paged.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">🛍️</div>
          <h3 className="font-display text-xl font-bold text-gray-700">No products found</h3>
          <button onClick={() => { setForm(emptyForm); setAddModal(true); }} className="btn-primary mt-4 inline-flex items-center gap-2">
            <FiPlus className="w-4 h-4" /> Add your first product
          </button>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Modals */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New Product" size="lg"
        footer={<>
          <button onClick={() => setAddModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleAdd} className="btn-primary">Add Product</button>
        </>}
      >
        <ProductForm />
      </Modal>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Product" size="lg"
        footer={<>
          <button onClick={() => setEditModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleEdit} className="btn-primary">Save Changes</button>
        </>}
      >
        <ProductForm />
      </Modal>

      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Product Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover rounded-2xl" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-xl font-bold text-gray-800">{selected.title}</h3>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[selected.status]}`}>{selected.status}</span>
              </div>
              <p className="text-sm text-gray-500">{selected.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "Category", value: selected.category },
                { label: "Price", value: formatPrice(selected.price) },
                { label: "Stock", value: `${selected.stock} units` },
                { label: "Total Sales", value: `${selected.sales} sold` },
                { label: "Rating", value: selected.rating > 0 ? `${selected.rating}/5 ⭐` : "No ratings yet" },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 bg-pink-50/50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Product"
        message={`Remove "${selected?.title}" from your shop? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
}
