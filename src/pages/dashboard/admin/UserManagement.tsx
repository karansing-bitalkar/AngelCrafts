import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiUser,
  FiMail, FiPhone, FiMapPin, FiShield
} from "react-icons/fi";
import Modal from "@/components/features/Modal";
import Pagination from "@/components/features/Pagination";
import ConfirmModal from "@/components/features/ConfirmModal";
import ToastContainer from "@/components/features/ToastContainer";
import { useToast } from "@/hooks/useToast";

const ITEMS_PER_PAGE = 12;

type Role = "customer" | "artisan" | "admin";
type Status = "active" | "suspended" | "pending";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: Role;
  status: Status;
  joined: string;
  orders: number;
  avatar: string;
}

const initialUsers: UserRecord[] = [
  { id: "u1", name: "Emma Thompson", email: "emma@example.com", phone: "+1 555-0101", location: "New York, USA", role: "customer", status: "active", joined: "Jan 2024", orders: 12, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces" },
  { id: "u2", name: "Luna Craft", email: "luna@example.com", phone: "+1 555-0102", location: "Austin, TX", role: "artisan", status: "active", joined: "Mar 2023", orders: 84, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
  { id: "u3", name: "James Wilson", email: "james@example.com", phone: "+1 555-0103", location: "Seattle, WA", role: "customer", status: "active", joined: "Feb 2024", orders: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
  { id: "u4", name: "Bloom & Brush", email: "bloom@example.com", phone: "+1 555-0104", location: "Portland, OR", role: "artisan", status: "active", joined: "Jun 2023", orders: 52, avatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=80&h=80&fit=crop&crop=faces" },
  { id: "u5", name: "Sophia Lee", email: "sophia@example.com", phone: "+1 555-0105", location: "Chicago, IL", role: "customer", status: "suspended", joined: "Sep 2023", orders: 2, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=faces" },
  { id: "u6", name: "Clay & Canvas", email: "clay@example.com", phone: "+1 555-0106", location: "Denver, CO", role: "artisan", status: "pending", joined: "Apr 2024", orders: 0, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces" },
  { id: "u7", name: "Rachel Green", email: "rachel@example.com", phone: "+1 555-0107", location: "Miami, FL", role: "customer", status: "active", joined: "Dec 2023", orders: 8, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces" },
  { id: "u8", name: "Glow & Scent Co", email: "glow@example.com", phone: "+1 555-0108", location: "Nashville, TN", role: "artisan", status: "active", joined: "Nov 2022", orders: 41, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
  { id: "u9", name: "Marcus Davis", email: "marcus@example.com", phone: "+1 555-0109", location: "Phoenix, AZ", role: "customer", status: "active", joined: "Feb 2024", orders: 3, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
  { id: "u10", name: "Woven Wonders", email: "woven@example.com", phone: "+1 555-0110", location: "Burlington, VT", role: "artisan", status: "active", joined: "Jul 2023", orders: 27, avatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=80&h=80&fit=crop&crop=faces" },
  { id: "u11", name: "Priya Patel", email: "priya@example.com", phone: "+1 555-0111", location: "San Jose, CA", role: "customer", status: "active", joined: "Jan 2024", orders: 15, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=faces" },
  { id: "u12", name: "Alex Jordan", email: "alex@example.com", phone: "+1 555-0112", location: "Boston, MA", role: "admin", status: "active", joined: "Jan 2023", orders: 0, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces" },
  { id: "u13", name: "Diana Prince", email: "diana@example.com", phone: "+1 555-0113", location: "LA, CA", role: "customer", status: "active", joined: "Mar 2024", orders: 6, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces" },
  { id: "u14", name: "Herb & Soul", email: "herb@example.com", phone: "+1 555-0114", location: "Santa Fe, NM", role: "artisan", status: "active", joined: "Aug 2023", orders: 33, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
];

const emptyForm = { name: "", email: "", phone: "", location: "", role: "customer" as Role, status: "active" as Status };

const statusColors: Record<Status, string> = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

const roleColors: Record<Role, string> = {
  customer: "bg-blue-100 text-blue-700",
  artisan: "bg-purple-100 text-purple-700",
  admin: "bg-pink-100 text-pink-700",
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = useMemo(() => users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  }), [users, search, roleFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAdd = () => {
    const newUser: UserRecord = {
      id: `u${Date.now()}`,
      ...form,
      joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      orders: 0,
      avatar: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces`,
    };
    setUsers(prev => [newUser, ...prev]);
    setAddModal(false);
    setForm(emptyForm);
    addToast("User added successfully! ✅");
  };

  const handleEdit = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...form } : u));
    setEditModal(false);
    addToast("User updated successfully! ✅");
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    setDeleteModal(false);
    addToast("User deleted successfully! 🗑️");
  };

  const openEdit = (u: UserRecord) => {
    setSelectedUser(u);
    setForm({ name: u.name, email: u.email, phone: u.phone, location: u.location, role: u.role, status: u.status });
    setEditModal(true);
  };

  const openView = (u: UserRecord) => { setSelectedUser(u); setViewModal(true); };
  const openDelete = (u: UserRecord) => { setSelectedUser(u); setDeleteModal(true); };

  const UserForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-10" placeholder="Jane Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-10" type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone</label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-10" placeholder="+1 555-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location</label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-10" placeholder="City, State" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Role</label>
          <select className="input-field" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as Role }))}>
            <option value="customer">Customer</option>
            <option value="artisan">Artisan</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
          <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">{filtered.length} users found</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setAddModal(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="input-field pl-11" placeholder="Search by name or email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="input-field sm:w-40" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="artisan">Artisan</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pink-100 bg-pink-50/50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Joined</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {paged.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-pink-50/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-xl object-cover flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">{u.name}</p>
                        <p className="text-xs text-gray-400 md:hidden">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-gray-700">{u.email}</p>
                    <p className="text-xs text-gray-400">{u.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${roleColors[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${statusColors[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{u.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => openView(u)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors" title="View">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-400 hover:text-amber-600 transition-colors" title="Edit">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => openDelete(u)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors" title="Delete">
                        <FiTrash2 className="w-4 h-4" />
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
            <div className="text-4xl mb-2">👤</div>
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Add Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New User" size="md"
        footer={<>
          <button onClick={() => setAddModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleAdd} className="btn-primary">Add User</button>
        </>}
      >
        <UserForm />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit User" size="md"
        footer={<>
          <button onClick={() => setEditModal(false)} className="btn-secondary">Cancel</button>
          <button onClick={handleEdit} className="btn-primary">Save Changes</button>
        </>}
      >
        <UserForm />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="User Details" size="md">
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-soft rounded-2xl">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-pink-200" />
              <div>
                <h3 className="font-display text-lg font-bold text-gray-800">{selectedUser.name}</h3>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${roleColors[selectedUser.role]}`}>{selectedUser.role}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: FiMail, label: "Email", value: selectedUser.email },
                { icon: FiPhone, label: "Phone", value: selectedUser.phone },
                { icon: FiMapPin, label: "Location", value: selectedUser.location },
                { icon: FiShield, label: "Status", value: selectedUser.status },
                { icon: FiUser, label: "Joined", value: selectedUser.joined },
                { icon: FiShield, label: "Orders", value: String(selectedUser.orders) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-3 bg-pink-50/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-xs text-gray-400 font-medium">{label}</span>
                  </div>
                  <p className="font-semibold text-gray-800 capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={deleteModal}
        title="Delete User"
        message={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
}
