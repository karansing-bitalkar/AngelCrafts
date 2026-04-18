import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiClock, FiSend, FiCheck } from "react-icons/fi";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 600);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-hero py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4">
          <span className="tag-badge mb-4">📬 Get In Touch</span>
          <h1 className="section-title mb-4">We'd Love to Hear From You</h1>
          <p className="section-subtitle">Have a question, feedback, or partnership idea? Our team is here to help.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              { icon: FiMail, title: "Email Us", value: "hello@angelcrafts.com", desc: "We reply within 24 hours" },
              { icon: FiPhone, title: "Call Us", value: "+1 (555) 123-4567", desc: "Mon–Fri, 9am–6pm EST" },
              { icon: FiMapPin, title: "Visit Us", value: "123 Craft Lane, NY 10001", desc: "By appointment only" },
              { icon: FiClock, title: "Support Hours", value: "Mon–Sat 8am–8pm", desc: "Sunday: 10am–4pm EST" },
            ].map(({ icon: Icon, title, value, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{title}</p>
                  <p className="text-sm text-gray-700">{value}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              </motion.div>
            ))}

            {/* FAQ */}
            <div className="glass-card-pink p-5">
              <h3 className="font-display font-bold text-gray-800 mb-3">Quick FAQ</h3>
              <div className="space-y-3 text-sm">
                {[
                  ["How do I become an artisan?", "Register and select 'Artisan' as your role."],
                  ["What payment methods do you accept?", "All major credit cards, PayPal, Apple Pay."],
                  ["How long does shipping take?", "Typically 3–7 business days within the US."],
                ].map(([q, a]) => (
                  <div key={q}>
                    <p className="font-medium text-gray-700">{q}</p>
                    <p className="text-gray-500 mt-0.5">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <FiCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 btn-primary">Send Another Message</button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="input-field" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" required>
                        <option value="">Select a topic</option>
                        <option>Order Issue</option>
                        <option>Artisan Support</option>
                        <option>Technical Problem</option>
                        <option>Partnership Inquiry</option>
                        <option>General Question</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help you..." rows={6} className="input-field resize-none" required />
                    </div>
                    <button type="submit" className="btn-primary flex items-center gap-2 px-8">
                      <FiSend className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
