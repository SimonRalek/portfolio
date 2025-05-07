import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: personalInfo.social.github, label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: personalInfo.social.twitter, label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        {/* Top section with logo and social links */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-12"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-8 md:mb-0 text-center md:text-left"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
              Jane Doe
            </h2>
            <p className="text-gray-300">Software Developer</p>
          </motion.div>
          
          <motion.div
            className="flex space-x-4"
            variants={containerVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors duration-300"
                variants={socialIconVariants}
                whileHover="hover"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        
        {/* Bottom section with copyright */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 md:mb-0"
          >
            &copy; {year} Jane Doe. All rights reserved.
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="flex items-center"
          >
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using React & Tailwind CSS
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
