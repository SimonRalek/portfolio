import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-900 text-white py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Jane Doe</h2>
            <p className="text-gray-400">Software Developer</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">&copy; {year} Jane Doe. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-1">Built with React & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
