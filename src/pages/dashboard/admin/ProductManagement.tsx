import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye,
  FiTag, FiDollarSign, FiGrid, FiPackage
} from "react-icons/fi";
import Modal from "@/components/features/Modal";
import Pagination from "@/components/features/Pagination";
import ConfirmModal from "@/components/features/ConfirmModal";
import ToastContainer from "@/components/features/ToastContainer";
import { useToast } from "@/hooks/useToast";
import { formatPrice } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

type ProductStatus = "active" | "pending" | "rejected" | "sold_out";

interface AdminProduct {
  id: string;
  title: string;
  artisan: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  description: string;
  rating: number;
  sales: number;
}

const statusColors: Record<ProductStatus, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  sold_out: "bg-gray-100 text-gray-700",
};

const initialProducts: AdminProduct[] = [
  { id: "p1", title: "Rose Quartz Crystal Necklace", artisan: "Luna's Jewelry", category: "Jewelry", price: 48, stock: 15, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop", description: "Handcrafted rose quartz pendant on sterling silver chain.", rating: 4.9, sales: 128 },
  { id: "p2", title: "Macrame Wall Hanging", artisan: "Woven Wonders", category: "Home Decor", price: 72, stock: 8, status: "active", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop", description: "Large boho macrame wall art, hand-knotted from natural cotton.", rating: 4.7, sales: 64 },
  { id: "p3", title: "Lavender Soy Candle Set", artisan: "Glow & Scent Co", category: "Home Decor", price: 34, stock: 30, status: "active", image: "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=80&h=80&fit=crop", description: "Set of 3 hand-poured lavender soy candles in apothecary jars.", rating: 4.8, sales: 215 },
  { id: "p4", title: "Handmade Ceramic Mug", artisan: "Clay & Canvas", category: "Kitchen", price: 28, stock: 20, status: "active", image: "https://images.unsplash.com/photo-1510706019793-fd0ea8ba6090?w=80&h=80&fit=crop", description: "Wheel-thrown ceramic mug with speckled glaze finish.", rating: 4.6, sales: 91 },
  { id: "p5", title: "Pressed Flower Art Print", artisan: "Bloom & Brush", category: "Art", price: 36, stock: 0, status: "sold_out", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=80&h=80&fit=crop", description: "Real pressed botanical flowers under glass in a pine wood frame.", rating: 4.9, sales: 77 },
  { id: "p6", title: "Hand-knitted Throw Blanket", artisan: "Woven Wonders", category: "Home Decor", price: 95, stock: 5, status: "active", image: "https://images.unsplash.com/photo-1576037728058-fe432b654d37?w=80&h=80&fit=crop", description: "Extra-chunky merino wool throw in cream and blush tones.", rating: 4.8, sales: 43 },
  { id: "p7", title: "Crystal Healing Kit", artisan: "Luna's Jewelry", category: "Wellness", price: 65, stock: 12, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop", description: "Curated set of 7 healing crystals with velvet pouch.", rating: 4.7, sales: 56 },
  { id: "p8", title: "Wooden Serving Board", artisan: "Craft & Grain", category: "Kitchen", price: 55, stock: 7, status: "pending", image: "https://images.unsplash.com/photo-1567769541715-8a2f2e847a93?w=80&h=80&fit=crop", description: "Hand-carved walnut serving board with natural oil finish.", rating: 0, sales: 0 },
  { id: "p9", title: "Watercolor Moon Print", artisan: "Bloom & Brush", category: "Art", price: 22, stock: 25, status: "active", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=80&h=80&fit=crop", description: "Ethereal watercolor moon phases art print, A4 size.", rating: 4.5, sales: 112 },
  { id: "p10", title: "Herb-Infused Bath Salts", artisan: "Glow & Scent Co", category: "Wellness", price: 18, stock: 40, status: "active", image: "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=80&h=80&fit=crop", description: "Himalayan pink salt infused with dried lavender and rosemary.", rating: 4.8, sales: 189 },
  { id: "p11", title: "Macrame Plant Hanger", artisan: "Woven Wonders", category: "Home Decor", price: 28, stock: 18, status: "active", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop", description: "Boho-style macrame plant hanger with wooden ring, holds up to 6\" pot.", rating: 4.6, sales: 93 },
  { id: "p12", title: "Amethyst Drop Earrings", artisan: "Luna's Jewelry", category: "Jewelry", price: 38, stock: 9, status: "active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop", description: "Raw amethyst crystal drops on 14K gold-filled ear wires.", rating: 4.9, sales: 74 },
  { id: "p13", title: "Batik Print Tote Bag", artisan: "Canvas & Color", category: "Accessories", price: 42, stock: 11, status: "rejected", image: "https://images.unsplash.com/photo-1567769541715-8a2f2e847a93?w=80&h=80&fit=crop", description: "Hand-batik printed cotton canvas tote in indigo pattern.", rating: 0, sales: 0 },
];

const emptyForm = { title: "", artisan: "", category: "Jewelry", price: "", stock: "", status: "active" as ProductStatus, description: "" };
const categories = ["Jewelry", "Home Decor", "Art", "Kitchen", "Wellness", "Accessories", "Clothing", "Stationery"];

export default function ProductManagement() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = useMemo(() => products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.artisan.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || p.category === catFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  }), [products, search, catFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAdd = () => {
    const newProduct: AdminProduct = {
      id: `p${Date.now()}`,
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop",
      rating: 0,
      sales: 0,
    };
    setProducts(prev => [newProduct, ...prev]);
    setAddModal(false);
    setForm(emptyForm);
    addToast("Product added successfully! ✅");
  };

  const handleEdit = () => {
    if (!selectedProduct) return;
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    setEditModal(false);
    addToast("Product updated successfully! ✅");
  };

  const handleDelete = () => {
    if (!selectedProduct) return;
    setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
    setDeleteModal(false);
    addToast("Product removed! 🗑️");
  };

  const openEdit = (p: AdminProduct) => {
    setSelectedProduct(p);
    setForm({ title: p.title, artisan: p.artisan, category: p.category, price: String(p.price), stock: String(p.stock), status: p.status, description: p.description });
    setEditModal(true);
  };
  const openView = (p: AdminProduct) => { setSelectedProduct(p); setViewModal(true); };
  const openDelete = (p: AdminProduct) => { setSelectedProduct(p); setDeleteModal(true); };

  const ProductForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Title</label>
        <input className="input-field" placeholder="Beautiful Handmade Item" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Artisan / Shop Name</label>
        <input className="input-field" placeholder="Luna's Jewelry" value={form.artisan} onChange={e => setForm(f => ({ ...f, artisan: e.target.value }))} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
        <textarea className="input-field resize-none h-20" placeholder="Describe the product..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
          <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
          <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as ProductStatus }))}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
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

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-sm text-gray-500">{filtered.length} products found</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setAddModal(true); }} className="btn-primary flex items-center gap-2">
          <FiPlus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-11" placeholder="Search products or artisans..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="input-field sm:w-36" value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input-field sm:w-36" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="sold_out">Sold Out</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card overflow-hidden group"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[p.status]}`}>{p.status.replace("_", " ")}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 truncate text-sm">{p.title}</h3>
              <p className="text-xs text-gray-400 mb-2">{p.artisan} · {p.category}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-primary-600">{formatPrice(p.price)}</span>
                <span className="text-xs text-gray-400">{p.stock} in stock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => openView(p)} className="flex-1 py-1.5 rounded-xl border border-blue-200 text-blue-500 hover:bg-blue-50 text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                  <FiEye className="w-3.5 h-3.5" /> View
                </button>
                <button onClick={() => openEdit(p)} className="flex-1 py-1.5 rounded-xl border border-amber-200 text-amber-500 hover:bg-amber-50 text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                  <FiEdit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => openDelete(p)} className="p-1.5 rounded-xl border border-red-200 text-red-400 hover:bg-red-50 transition-colors">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {paged.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Add Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New Product" size="lg"
        footer={<>
          <button onClick={() => setAddModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleAdd} className="btn-primary">Add Product</button>
        </>}
      >
        <ProductForm />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Product" size="lg"
        footer={<>
          <button onClick={() => setEditModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleEdit} className="btn-primary">Save Changes</button>
        </>}
      >
        <ProductForm />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Product Details" size="lg">
        {selectedProduct && (
          <div className="space-y-4">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-48 object-cover rounded-2xl" />
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display text-xl font-bold text-gray-800">{selectedProduct.title}</h3>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${statusColors[selectedProduct.status]}`}>{selectedProduct.status}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{selectedProduct.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: FiTag, label: "Artisan", value: selectedProduct.artisan },
                { icon: FiGrid, label: "Category", value: selectedProduct.category },
                { icon: FiDollarSign, label: "Price", value: formatPrice(selectedProduct.price) },
                { icon: FiPackage, label: "Stock", value: `${selectedProduct.stock} units` },
                { icon: FiPackage, label: "Total Sales", value: `${selectedProduct.sales} sold` },
                { icon: FiTag, label: "Rating", value: selectedProduct.rating > 0 ? `${selectedProduct.rating}/5 ⭐` : "No ratings yet" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-3 bg-pink-50/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-xs text-gray-400 font-medium">{label}</span>
                  </div>
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
        message={`Remove "${selectedProduct?.title}" from the marketplace? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
}
