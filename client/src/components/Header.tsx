import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { headerItem } from "@/lib/framer-animations";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  // Control header transparency based on scroll position
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-xl font-bold text-primary dark:text-blue-400"
            variants={headerItem}
            initial="hidden"
            animate="visible"
          >
            Jane Doe
          </motion.a>

          <div className="flex items-center space-x-1 md:space-x-4">
            <motion.nav
              className="hidden md:flex space-x-8"
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
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  variants={headerItem}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              variants={headerItem}
              initial="hidden"
              animate="visible"
            >
              <ThemeToggle />
            </motion.div>

            <motion.div
              variants={headerItem}
              initial="hidden"
              animate="visible"
            >
              <MobileMenu links={navLinks} />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
