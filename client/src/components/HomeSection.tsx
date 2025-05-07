import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, ArrowDown, ExternalLink, Github, Sparkles, Code } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { heroTextVariants, heroImageVariants, scrollIndicatorVariants } from "@/lib/framer-animations";

export default function HomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const heroImageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.8,
        damping: 12,
        delay: 0.2,
      }
    }
  };

  const boxShadowVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 1.2
      }
    }
  };

  const profileImageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7 + (i * 0.1),
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Background floating elements
  const backgroundElements = [
    { icon: <Code className="text-blue-500/30 dark:text-blue-400/20" />, size: "w-12 h-12", position: "top-1/4 left-1/4" },
    { icon: <Sparkles className="text-indigo-500/30 dark:text-indigo-400/20" />, size: "w-10 h-10", position: "top-1/3 right-1/4" },
    { icon: <Github className="text-gray-400/20 dark:text-gray-400/10" />, size: "w-16 h-16", position: "bottom-1/4 left-1/5" },
    { icon: <ExternalLink className="text-purple-500/20 dark:text-purple-400/10" />, size: "w-8 h-8", position: "bottom-1/3 right-1/5" },
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Floating background elements */}
      {backgroundElements.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} ${item.position} hidden md:block opacity-50 pointer-events-none`}
          initial={{ y: 0 }}
          animate={isLoaded ? 
            { 
              y: [0, -10, 0],
              transition: {
                delay: i * 0.2,
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop" as const
              }
            } : { y: 0 }
          }
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div 
                className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full px-4 py-1.5 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Software Developer</span>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Hello, I'm <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent">{personalInfo.name}</span>
            </motion.h1>
            
            <motion.h2
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {personalInfo.title}
            </motion.h2>
            
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-lg mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {personalInfo.bio}
            </motion.p>
            
            <div className="flex flex-wrap gap-5 justify-center md:justify-start">
              <motion.div
                custom={0}
                variants={buttonVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                whileHover="hover"
              >
                <Button 
                  asChild
                  className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <a href="#projects" className="flex items-center">
                    View My Work
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                custom={1}
                variants={buttonVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                whileHover="hover"
              >
                <Button 
                  asChild
                  variant="outline"
                  className="px-6 py-6 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg border border-gray-200 dark:border-gray-700 transition-all shadow-md hover:shadow-xl"
                >
                  <a href="/resume.pdf" download className="flex items-center">
                    Download Resume <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="hidden md:flex mt-16 space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="text-gray-500 dark:text-gray-400 text-sm">Find me on:</span>
              {[
                { href: personalInfo.social.github, icon: <Github className="w-5 h-5" />, label: "GitHub" },
                { href: personalInfo.social.linkedin, icon: <Code className="w-5 h-5" />, label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            className="w-full md:w-2/5 relative"
            variants={heroImageContainerVariants}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-full blur-3xl opacity-20 dark:opacity-30 transform scale-110"
              variants={boxShadowVariants}
            />
            
            <motion.div
              className="relative z-10"
              variants={profileImageVariants}
            >
              <div className="w-72 h-72 md:w-96 md:h-96 mx-auto relative">
                <img 
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} - ${personalInfo.title}`}
                  className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                />
                <motion.div
                  className="absolute -bottom-3 -right-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-lg font-bold py-3 px-6 rounded-full shadow-lg border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4, type: "spring" }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    10+ Projects
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <div className="mt-16 flex justify-center">
          <motion.div
            variants={scrollIndicatorVariants}
            initial="initial"
            animate="animate"
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <a 
              href="#about" 
              className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors block"
              aria-label="Scroll to About section"
            >
              <ChevronDown className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
