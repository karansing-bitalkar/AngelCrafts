import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email address, shipping address, payment information (processed securely), profile pictures, product listings (for artisans), messages sent through our platform, and any other information you choose to provide.

We also automatically collect certain information about your device and how you interact with AngelCrafts, including your IP address, browser type, operating system, referring URLs, device identifiers, and usage data such as pages visited and products viewed.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our services, including processing transactions, sending you technical notices and support messages, responding to your comments and questions, and sending you information about products, services, and events offered by AngelCrafts.

We may also use your information to monitor and analyze trends, usage, and activities in connection with our services, detect and prevent fraudulent transactions, personalize your experience, and communicate with you about products, services, and events.`,
  },
  {
    title: "3. Information Sharing",
    content: `We may share information about you as follows: with vendors and service providers who need access to such information to carry out work on our behalf, in response to a request for information if we believe disclosure is in accordance with applicable law, if we believe your actions are inconsistent with our user agreements, or in connection with any merger, sale of company assets, financing, or acquisition.

We never sell your personal information to third parties for their marketing purposes without your explicit consent.`,
  },
  {
    title: "4. Data Security",
    content: `AngelCrafts takes the security of your data seriously. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes SSL/TLS encryption for all data in transit, encrypted storage for sensitive data, regular security audits, and access controls limiting employee access to personal data.

However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "5. Your Rights and Choices",
    content: `You have certain rights regarding your personal information. You may access, update, or delete your account information at any time through your account settings. You may opt out of receiving promotional communications from us by following the instructions in those messages or by contacting us directly.

You may also have the right to access a portable copy of your data, request that we correct inaccurate information, object to our processing of your data, and request that we restrict our processing of your data under certain circumstances.`,
  },
  {
    title: "6. Cookies and Tracking Technologies",
    content: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our service may not function properly without cookies.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-hero py-14 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-3">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: January 1, 2025</p>
        </motion.div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="glass-card p-8 space-y-10">
          <p className="text-gray-600 leading-relaxed">
            At AngelCrafts, your privacy is a priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform. Please read this policy carefully.
          </p>
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <h2 className="font-display text-xl font-bold text-gray-800 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{s.content}</p>
            </motion.div>
          ))}
          <p className="text-gray-500 text-sm">If you have questions about this Privacy Policy, contact us at privacy@angelcrafts.com</p>
        </div>
      </div>
    </div>
  );
}
