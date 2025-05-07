import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { heroTextVariants, heroImageVariants, scrollIndicatorVariants } from "@/lib/framer-animations";

export default function HomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set isLoaded to true once the component is mounted
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              variants={heroTextVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              Hello, I'm <span className="text-primary dark:text-blue-400">{personalInfo.name}</span>
            </motion.h1>
            
            <motion.h2
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6"
              variants={heroTextVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              {personalInfo.title}
            </motion.h2>
            
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-lg mx-auto md:mx-0"
              variants={heroTextVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
            >
              {personalInfo.bio}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.6,
                  }
                }
              }}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Button 
                  asChild
                  className="px-6 py-6 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <a href="#projects">View Projects</a>
                </Button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Button 
                  asChild
                  variant="outline"
                  className="px-6 py-6 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Button 
                  asChild
                  variant="outline"
                  className="px-6 py-6 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <a href="/resume.pdf" download>
                    Download Resume <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            className="md:w-2/5"
            variants={heroImageVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <img 
              src={personalInfo.profileImage}
              alt={`${personalInfo.name} - ${personalInfo.title}`}
              className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover mx-auto shadow-xl border-4 border-white dark:border-gray-800"
            />
          </motion.div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <motion.div
            variants={scrollIndicatorVariants}
            initial="initial"
            animate="animate"
          >
            <a 
              href="#about" 
              className="text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
              aria-label="Scroll to About section"
            >
              <ChevronDown className="h-8 w-8" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
