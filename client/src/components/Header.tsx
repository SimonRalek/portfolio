import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { headerItem } from "@/lib/framer-animations";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
];

export default function Header() {
  // Control header transparency based on scroll position
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const [activeSection, setActiveSection] = useState("home");

  // Animation variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  // Animation for the logo
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Update scroll state and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update header transparency
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "resume", "projects"];
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial animation
    controls.start("visible");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/90 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Jane Doe
          </motion.a>

          <div className="flex items-center space-x-1 md:space-x-4">
            <motion.nav
              className="hidden md:flex items-center space-x-1"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    }`}
                    variants={navItemVariants}
                    whileHover="hover"
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 w-full rounded-full"
                        layoutId="activeSection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </motion.nav>

            <motion.div
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="ml-2"
            >
              <ThemeToggle />
            </motion.div>

            <motion.div
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              className="md:hidden"
            >
              <MobileMenu links={navLinks} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
