import { motion } from "framer-motion";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing or using AngelCrafts, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform. These terms apply to all visitors, users, buyers, and artisans of the platform." },
  { title: "2. User Accounts", content: "When you create an account with AngelCrafts, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account." },
  { title: "3. Artisan Responsibilities", content: "Artisans agree to accurately describe all products listed on AngelCrafts, including materials, dimensions, and production time. All items must be handmade, vintage (20+ years old), or craft supplies. Mass-produced items are strictly prohibited. Artisans are responsible for fulfilling orders promptly, maintaining accurate inventory, and providing excellent customer service." },
  { title: "4. Buyer Responsibilities", content: "Buyers agree to provide accurate shipping information, complete payment for all orders placed, and communicate respectfully with artisans. Buyers are responsible for reading product descriptions carefully before purchasing. Custom order requests should be clear and detailed to ensure the best results from artisans." },
  { title: "5. Fees and Payments", content: "AngelCrafts charges artisans a commission of 15% on each sale. There are no listing fees for the first 10 products. Payment processing fees may apply. Artisan payouts are processed weekly for amounts exceeding $25. AngelCrafts reserves the right to modify its fee structure with 30 days' notice to active sellers." },
  { title: "6. Prohibited Activities", content: "Users may not engage in any activity that disrupts or interferes with the platform, circumvents security measures, uses automated tools to access the platform without permission, posts false or misleading information, infringes on intellectual property rights, harasses other users, or violates any applicable laws or regulations." },
];

export default function Terms() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-hero py-14 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-3">Terms of Service</h1>
          <p className="text-gray-500">Last updated: January 1, 2025</p>
        </motion.div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="glass-card p-8 space-y-10">
          <p className="text-gray-600 leading-relaxed">These Terms of Service ("Terms") govern your use of AngelCrafts. By using our platform, you agree to these terms. Please read them carefully.</p>
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <h2 className="font-display text-xl font-bold text-gray-800 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
