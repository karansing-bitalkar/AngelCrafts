import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiShield, FiBell, FiGlobe, FiCreditCard } from "react-icons/fi";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";

export default function AdminSettings() {
  const { toasts, addToast, removeToast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "AngelCrafts",
    commissionRate: 15,
    minPayout: 25,
    allowCustomOrders: true,
    requirePhoneVerification: false,
    maintenanceMode: false,
    emailNotifications: true,
    newUserNotifications: true,
    orderNotifications: true,
  });

  const handleSave = () => {
    addToast("Settings saved successfully! ✅");
  };

  const Toggle = ({ label, desc, value, onChange }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-pink-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <button onClick={() => onChange(!value)} className={`w-12 h-6 rounded-full relative transition-colors ${value ? "bg-primary" : "bg-gray-200"}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-7" : "translate-x-1"}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Platform Settings</h1>
        <p className="text-sm text-gray-500">Configure global platform behavior</p>
      </div>

      {/* General */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <h3 className="font-display text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><FiGlobe className="w-4 h-4 text-primary-500" />General Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform Name</label>
            <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Commission Rate (%)</label>
            <input type="number" value={settings.commissionRate} onChange={(e) => setSettings({ ...settings, commissionRate: Number(e.target.value) })} className="input-field" min="0" max="50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Payout ($)</label>
            <input type="number" value={settings.minPayout} onChange={(e) => setSettings({ ...settings, minPayout: Number(e.target.value) })} className="input-field" min="0" />
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="font-display text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><FiShield className="w-4 h-4 text-primary-500" />Platform Features</h3>
        <Toggle label="Allow Custom Orders" desc="Artisans can receive personalized requests" value={settings.allowCustomOrders} onChange={(v: boolean) => setSettings({ ...settings, allowCustomOrders: v })} />
        <Toggle label="Require Phone Verification" desc="New users must verify phone number" value={settings.requirePhoneVerification} onChange={(v: boolean) => setSettings({ ...settings, requirePhoneVerification: v })} />
        <Toggle label="Maintenance Mode" desc="Platform inaccessible to regular users" value={settings.maintenanceMode} onChange={(v: boolean) => setSettings({ ...settings, maintenanceMode: v })} />
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <h3 className="font-display text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><FiBell className="w-4 h-4 text-primary-500" />Notification Settings</h3>
        <Toggle label="Email Notifications" desc="Admin receives email for important events" value={settings.emailNotifications} onChange={(v: boolean) => setSettings({ ...settings, emailNotifications: v })} />
        <Toggle label="New User Alerts" desc="Notify admin when new users register" value={settings.newUserNotifications} onChange={(v: boolean) => setSettings({ ...settings, newUserNotifications: v })} />
        <Toggle label="Order Notifications" desc="Notify admin for large or suspicious orders" value={settings.orderNotifications} onChange={(v: boolean) => setSettings({ ...settings, orderNotifications: v })} />
      </motion.div>

      <button onClick={handleSave} className="btn-primary flex items-center gap-2">
        <FiSave className="w-4 h-4" /> Save All Settings
      </button>
    </div>
  );
}
