import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiCreditCard, FiMapPin, FiPackage } from "react-icons/fi";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({ name: "", street: "", city: "", state: "", zip: "", country: "United States" });
  const [payment, setPayment] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const placeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-12 max-w-md w-full text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 text-sm mb-6">Your order has been confirmed and will be shipped within 2-3 business days.</p>
          <div className="bg-pink-50 rounded-2xl p-4 mb-6 text-left">
            <p className="text-xs text-gray-500 mb-1">Order ID</p>
            <p className="font-bold text-gray-800">ORD-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          </div>
          <button onClick={() => navigate("/dashboard/customer/orders")} className="btn-primary w-full">View My Orders</button>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { n: 1, label: "Shipping", icon: FiMapPin },
    { n: 2, label: "Payment", icon: FiCreditCard },
    { n: 3, label: "Review", icon: FiPackage },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Checkout</h1>
        <p className="text-sm text-gray-500">Complete your order</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {steps.map(({ n, label, icon: Icon }) => (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${step >= n ? "bg-primary/20 text-primary-700" : "bg-gray-100 text-gray-400"}`}>
              <Icon className="w-4 h-4" /> {label}
            </div>
            {n < 3 && <div className={`flex-1 h-0.5 ${step > n ? "bg-primary" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6">
                <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Shipping Address</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", key: "name", sm: 2 },
                    { label: "Street Address", key: "street", sm: 2 },
                    { label: "City", key: "city" },
                    { label: "State", key: "state" },
                    { label: "ZIP Code", key: "zip" },
                    { label: "Country", key: "country" },
                  ].map(({ label, key, sm }) => (
                    <div key={key} className={sm === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input type="text" value={(shipping as any)[key]} onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })} placeholder={label} className="input-field" />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-6 flex items-center gap-2">Continue to Payment</button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6">
                <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Payment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name</label>
                    <input type="text" placeholder="Full name on card" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className="input-field" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                      <input type="text" placeholder="123" maxLength={3} className="input-field" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-secondary text-sm">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">Review Order</button>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6">
                <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Order Review</h3>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 p-3 bg-pink-50/50 rounded-2xl">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.product.title}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-primary-600">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary text-sm">Back</button>
                  <button onClick={placeOrder} disabled={loading} className="btn-primary flex items-center gap-2 flex-1 justify-center">
                    {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : <>Place Order · {formatPrice(getTotal() * 1.08)}</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="glass-card p-5 h-fit">
          <h3 className="font-display font-bold text-gray-800 mb-4">Summary</h3>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between"><span>Items ({items.length})</span><span>{formatPrice(getTotal())}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-green-600">Free</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatPrice(getTotal() * 0.08)}</span></div>
            <div className="h-px bg-pink-100 my-2" />
            <div className="flex justify-between font-bold text-gray-800 text-base"><span>Total</span><span className="text-primary-600">{formatPrice(getTotal() * 1.08)}</span></div>
          </div>
          <div className="text-xs text-gray-400 text-center">🔒 Secured by 256-bit SSL encryption</div>
        </div>
      </div>
    </div>
  );
}
