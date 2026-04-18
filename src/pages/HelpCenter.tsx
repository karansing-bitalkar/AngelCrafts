import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  { q: "How do I place an order?", a: "Browse products, add to cart, go to checkout, enter shipping info and payment details. You'll receive a confirmation email immediately." },
  { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track it in your dashboard under Order Tracking." },
  { q: "What is your return policy?", a: "Most items can be returned within 14 days of delivery. Custom and personalized items are generally non-refundable unless defective." },
  { q: "How do I contact an artisan?", a: "Visit the artisan's shop page and click the 'Message' button. You can also message them directly from any of their product pages." },
  { q: "How do I become an artisan seller?", a: "Register for a free account, select 'Artisan' as your role, set up your shop profile, and start listing your handmade products." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay." },
  { q: "How long does shipping take?", a: "Shipping times vary by artisan location. Domestic orders typically arrive in 3-7 business days. International orders may take 2-4 weeks." },
  { q: "Is it safe to shop on AngelCrafts?", a: "Yes! We use SSL encryption for all transactions and your payment information is never stored on our servers. All artisans are verified." },
];

const topics = ["Orders & Shipping", "Returns & Refunds", "Artisan Setup", "Account & Profile", "Payments", "Custom Orders"];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-hero py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4">
          <h1 className="section-title mb-4">Help Center</h1>
          <p className="section-subtitle mb-6">Find answers to your questions about shopping and selling on AngelCrafts.</p>
          <div className="flex items-center gap-3 bg-white rounded-2xl shadow-glass p-2 max-w-xl mx-auto">
            <FiSearch className="w-5 h-5 text-gray-400 ml-3" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search help articles..." className="flex-1 bg-transparent text-sm focus:outline-none py-2 text-gray-700 placeholder-gray-400" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Topics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {topics.map((topic) => (
            <button key={topic} className="glass-card p-4 text-center text-sm font-medium text-gray-700 hover:shadow-glass hover:text-primary-700 transition-all rounded-2xl">
              {topic}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
                {openFaq === i ? <FiChevronUp className="w-5 h-5 text-primary-500 flex-shrink-0" /> : <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-5 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-12 glass-card-pink p-8 text-center">
          <h3 className="font-display text-xl font-bold text-gray-800 mb-2">Still need help?</h3>
          <p className="text-gray-500 text-sm mb-5">Our support team typically responds within 2 hours during business hours.</p>
          <a href="/contact" className="btn-primary inline-flex">Contact Support</a>
        </div>
      </div>
    </div>
  );
}
