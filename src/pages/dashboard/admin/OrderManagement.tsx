import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiSearch, FiEye, FiEdit2, FiPackage, FiTruck,
  FiUser, FiCalendar, FiMapPin, FiDollarSign
} from "react-icons/fi";
import Modal from "@/components/features/Modal";
import Pagination from "@/components/features/Pagination";
import ToastContainer from "@/components/features/ToastContainer";
import { useToast } from "@/hooks/useToast";
import { formatPrice } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface AdminOrder {
  id: string;
  customer: string;
  customerEmail: string;
  artisan: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
  address: string;
  items: number;
  tracking?: string;
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const initialOrders: AdminOrder[] = [
  { id: "ORD-0001", customer: "Emma Thompson", customerEmail: "emma@example.com", artisan: "Luna's Jewelry", product: "Rose Quartz Crystal Necklace", amount: 48, status: "delivered", date: "Apr 10, 2025", address: "123 Oak St, New York, NY", items: 1, tracking: "1Z999AA1012345678" },
  { id: "ORD-0002", customer: "James Wilson", customerEmail: "james@example.com", artisan: "Woven Wonders", product: "Macrame Wall Hanging", amount: 72, status: "shipped", date: "Apr 14, 2025", address: "456 Pine Ave, Seattle, WA", items: 1, tracking: "1Z999BB2012345679" },
  { id: "ORD-0003", customer: "Rachel Green", customerEmail: "rachel@example.com", artisan: "Glow & Scent Co", product: "Lavender Soy Candle Set + Bath Salts", amount: 52, status: "processing", date: "Apr 16, 2025", address: "789 Maple Dr, Miami, FL", items: 2 },
  { id: "ORD-0004", customer: "Sophia Lee", customerEmail: "sophia@example.com", artisan: "Clay & Canvas", product: "Handmade Ceramic Mug Set", amount: 84, status: "pending", date: "Apr 17, 2025", address: "321 Elm St, Chicago, IL", items: 3 },
  { id: "ORD-0005", customer: "Marcus Davis", customerEmail: "marcus@example.com", artisan: "Bloom & Brush", product: "Pressed Flower Art Print", amount: 36, status: "cancelled", date: "Apr 12, 2025", address: "654 Birch Ln, Phoenix, AZ", items: 1 },
  { id: "ORD-0006", customer: "Priya Patel", customerEmail: "priya@example.com", artisan: "Luna's Jewelry", product: "Amethyst Drop Earrings + Crystal Kit", amount: 103, status: "delivered", date: "Apr 8, 2025", address: "987 Cedar Ct, San Jose, CA", items: 2, tracking: "1Z999CC3012345680" },
  { id: "ORD-0007", customer: "Diana Prince", customerEmail: "diana@example.com", artisan: "Woven Wonders", product: "Macrame Plant Hanger x2", amount: 56, status: "shipped", date: "Apr 15, 2025", address: "147 Willow Way, LA, CA", items: 2, tracking: "1Z999DD4012345681" },
  { id: "ORD-0008", customer: "Emma Thompson", customerEmail: "emma@example.com", artisan: "Glow & Scent Co", product: "Herb-Infused Bath Salts x3", amount: 54, status: "processing", date: "Apr 17, 2025", address: "123 Oak St, New York, NY", items: 3 },
  { id: "ORD-0009", customer: "James Wilson", customerEmail: "james@example.com", artisan: "Bloom & Brush", product: "Watercolor Moon Print", amount: 22, status: "delivered", date: "Mar 28, 2025", address: "456 Pine Ave, Seattle, WA", items: 1, tracking: "1Z999EE5012345682" },
  { id: "ORD-0010", customer: "Rachel Green", customerEmail: "rachel@example.com", artisan: "Clay & Canvas", product: "Ceramic Mug + Candle Bundle", amount: 62, status: "delivered", date: "Mar 25, 2025", address: "789 Maple Dr, Miami, FL", items: 2, tracking: "1Z999FF6012345683" },
  { id: "ORD-0011", customer: "Marcus Davis", customerEmail: "marcus@example.com", artisan: "Woven Wonders", product: "Hand-knitted Throw Blanket", amount: 95, status: "pending", date: "Apr 18, 2025", address: "654 Birch Ln, Phoenix, AZ", items: 1 },
  { id: "ORD-0012", customer: "Priya Patel", customerEmail: "priya@example.com", artisan: "Luna's Jewelry", product: "Crystal Healing Kit", amount: 65, status: "shipped", date: "Apr 16, 2025", address: "987 Cedar Ct, San Jose, CA", items: 1, tracking: "1Z999GG7012345684" },
  { id: "ORD-0013", customer: "Sophia Lee", customerEmail: "sophia@example.com", artisan: "Bloom & Brush", product: "Watercolor Floral Print Set", amount: 108, status: "delivered", date: "Apr 5, 2025", address: "321 Elm St, Chicago, IL", items: 3, tracking: "1Z999HH8012345685" },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>("pending");
  const [editTracking, setEditTracking] = useState("");
  const { toasts, addToast, removeToast } = useToast();

  const filtered = useMemo(() => orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  }), [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openView = (o: AdminOrder) => { setSelectedOrder(o); setViewModal(true); };
  const openEdit = (o: AdminOrder) => {
    setSelectedOrder(o);
    setEditStatus(o.status);
    setEditTracking(o.tracking || "");
    setEditModal(true);
  };

  const handleUpdateOrder = () => {
    if (!selectedOrder) return;
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: editStatus, tracking: editTracking || o.tracking } : o));
    setEditModal(false);
    addToast(`Order ${selectedOrder.id} updated! ✅`);
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-sm text-gray-500">{filtered.length} orders found</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: stats.total, color: "from-blue-50 to-indigo-50", text: "text-blue-600", icon: FiPackage },
          { label: "Pending", value: stats.pending, color: "from-amber-50 to-yellow-50", text: "text-amber-600", icon: FiPackage },
          { label: "Shipped", value: stats.shipped, color: "from-purple-50 to-violet-50", text: "text-purple-600", icon: FiTruck },
          { label: "Delivered", value: stats.delivered, color: "from-green-50 to-emerald-50", text: "text-green-600", icon: FiTruck },
        ].map(({ label, value, color, text, icon: Icon }) => (
          <div key={label} className={`glass-card p-4 bg-gradient-to-br ${color}`}>
            <Icon className={`w-5 h-5 ${text} mb-2`} />
            <p className={`text-2xl font-bold ${text}`}>{value}</p>
            <p className="text-xs text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-11" placeholder="Search by order ID, customer, or product..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="input-field sm:w-40" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pink-100 bg-pink-50/50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Order ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {paged.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-pink-50/30 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-700 font-semibold">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.items} item{o.items > 1 ? "s" : ""}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[180px] hidden md:table-cell">
                    <p className="truncate">{o.product}</p>
                    <p className="text-xs text-gray-400">{o.artisan}</p>
                  </td>
                  <td className="px-4 py-3 font-bold text-primary-600">{formatPrice(o.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusColors[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{o.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => openView(o)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors" title="View">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEdit(o)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-400 hover:text-amber-600 transition-colors" title="Update Status">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Order Details" size="lg">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-soft rounded-2xl">
              <div>
                <p className="font-mono text-sm font-bold text-gray-800">{selectedOrder.id}</p>
                <p className="text-xs text-gray-500">{selectedOrder.date}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: FiUser, label: "Customer", value: selectedOrder.customer },
                { icon: FiUser, label: "Artisan", value: selectedOrder.artisan },
                { icon: FiPackage, label: "Product", value: selectedOrder.product },
                { icon: FiDollarSign, label: "Amount", value: formatPrice(selectedOrder.amount) },
                { icon: FiMapPin, label: "Ship To", value: selectedOrder.address },
                { icon: FiTruck, label: "Tracking", value: selectedOrder.tracking || "Not assigned" },
                { icon: FiCalendar, label: "Items", value: `${selectedOrder.items} item${selectedOrder.items > 1 ? "s" : ""}` },
                { icon: FiUser, label: "Email", value: selectedOrder.customerEmail },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-3 bg-pink-50/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-xs text-gray-400 font-medium">{label}</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit / Update Status Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Update Order Status" size="sm"
        footer={<>
          <button onClick={() => setEditModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleUpdateOrder} className="btn-primary">Update Order</button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Order ID</p>
            <p className="font-mono text-sm font-bold text-gray-800">{selectedOrder?.id}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Order Status</label>
            <select className="input-field" value={editStatus} onChange={e => setEditStatus(e.target.value as OrderStatus)}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tracking Number (optional)</label>
            <div className="relative">
              <FiTruck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className="input-field pl-10" placeholder="1Z999AA1012345678" value={editTracking} onChange={e => setEditTracking(e.target.value)} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
