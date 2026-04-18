import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiBriefcase } from "react-icons/fi";

const jobs = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Remote", type: "Full-time", desc: "Build and scale the AngelCrafts marketplace platform using React, Node.js, and PostgreSQL." },
  { title: "Product Designer (UI/UX)", dept: "Design", location: "New York or Remote", type: "Full-time", desc: "Design beautiful, intuitive experiences for our artisans and buyers across web and mobile." },
  { title: "Community Manager", dept: "Community", location: "Remote", type: "Full-time", desc: "Build and nurture our growing community of 50K+ artisans and craft enthusiasts worldwide." },
  { title: "Artisan Success Manager", dept: "Operations", location: "Remote", type: "Full-time", desc: "Help onboard, support, and grow the business of artisans on the AngelCrafts platform." },
  { title: "Marketing Lead", dept: "Marketing", location: "New York or Remote", type: "Full-time", desc: "Drive user acquisition and brand awareness through creative campaigns and partnerships." },
  { title: "Data Analyst", dept: "Analytics", location: "Remote", type: "Full-time", desc: "Turn marketplace data into actionable insights that help artisans and shape product strategy." },
];

export default function Careers() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative py-20 bg-gradient-hero overflow-hidden text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4">
          <span className="tag-badge mb-4">💼 Careers</span>
          <h1 className="section-title mb-5">Build the Future of Handmade Commerce</h1>
          <p className="section-subtitle">Join a passionate team dedicated to empowering artisans and celebrating craftsmanship worldwide.</p>
        </motion.div>
      </div>

      {/* Why Join */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-10">Why Work at AngelCrafts?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "🌿", title: "Remote-First", desc: "Work from anywhere in the world with flexible hours and async communication." },
            { icon: "📈", title: "Real Impact", desc: "Every feature you build directly impacts thousands of artisan livelihoods." },
            { icon: "❤️", title: "Mission-Driven", desc: "We're more than a company — we're a movement for handmade culture." },
            { icon: "💰", title: "Great Benefits", desc: "Competitive pay, equity, health coverage, and annual craft stipend." },
          ].map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="font-display font-bold text-gray-800 mb-2">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-gradient-soft py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title text-center mb-10">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="glass-card p-6 hover:shadow-glass-lg transition-all group cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="tag-badge text-xs">{job.dept}</span>
                    </div>
                    <h3 className="font-display font-bold text-gray-800 text-lg group-hover:text-primary-700 transition-colors">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{job.desc}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{job.type}</span>
                      <span className="flex items-center gap-1"><FiBriefcase className="w-3 h-3" />{job.dept}</span>
                    </div>
                  </div>
                  <button className="btn-primary text-sm flex-shrink-0">Apply Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
