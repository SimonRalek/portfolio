import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio-data";
import { 
  ExternalLink, 
  Github, 
  Code, 
  MonitorSmartphone, 
  ChevronRight, 
  Sparkles, 
  Star, 
  Calendar, 
  Layers, 
  Info
} from "lucide-react";
import { fadeInUp, staggerContainer, cardVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";
import { useState } from "react";

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -12,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
  };

  const imageVariants = {
    hidden: { scale: 1.05, opacity: 0.8 },
    hover: { 
      scale: 1.15,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0.8,
      scale: 1
    },
    hover: { 
      scale: 1.05, 
      opacity: 1,
      transition: { 
        duration: 0.2,
        yoyo: Infinity,
        ease: "easeInOut"
      } 
    }
  };
  
  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.05, 
        duration: 0.3 
      } 
    })
  };

  return (
    <AnimatedSection 
      id="projects" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 bg-dot-pattern relative"
    >
      {/* Background gradient circles */}
      <div className="gradient-blur-circle top-[20%] left-[5%]"></div>
      <div className="gradient-blur-circle bottom-[10%] right-[5%]"></div>
      <div className="gradient-blur-circle top-[60%] left-[35%]"></div>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="inline-flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">My Latest Work</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Check out some of my latest projects showcasing my expertise in frontend and backend development
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {projects.map((project, index) => {
            // Pre-initialize motion values outside the render loop
            // to avoid React hooks rules violation
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);
            
            // Function to handle mouse movement for the glow effect
            function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
              const { left, top } = currentTarget.getBoundingClientRect();
              mouseX.set(clientX - left);
              mouseY.set(clientY - top);
            }
            
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full transform-gpu relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition duration-300"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(59, 130, 246, 0.15),
                        transparent
                      )
                    `,
                  }}
                />
                
                <div className="relative overflow-hidden h-52">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    initial="hidden"
                    whileHover="hover"
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                  
                  {/* Project tags */}
                  <motion.div 
                    className="absolute top-3 right-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 bg-blue-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </motion.div>
                  
                  {/* Technology badges */}
                  <div className="absolute bottom-3 left-4 flex flex-wrap gap-2 max-w-[90%]">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        custom={techIndex}
                        variants={badgeVariants}
                        initial="initial"
                        animate={activeIndex === index ? "animate" : "initial"}
                      >
                        <Badge 
                          className="bg-white/90 hover:bg-white text-gray-800 text-xs font-medium transition-colors"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="relative p-6 flex-1 flex flex-col z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <motion.div 
                      className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full"
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto space-y-5">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-blue-500" />
                        <span>{project.technologies.length} Technologies</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>2023</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2.5 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium text-sm transition-colors"
                        whileHover="hover"
                        variants={buttonVariants}
                      >
                        <Github className="mr-2 h-4 w-4" /> 
                        Code
                      </motion.a>
                      <motion.a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium text-sm transition-colors"
                        whileHover="hover"
                        variants={buttonVariants}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> 
                        Demo
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
        >
          <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              View More Projects
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
