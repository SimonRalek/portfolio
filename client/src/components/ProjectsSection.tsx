import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio-data";
import { ExternalLink, Github, Code, MonitorSmartphone, ChevronRight, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer, cardVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";

export default function ProjectsSection() {
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

  return (
    <AnimatedSection 
      id="projects" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full transform-gpu"
            >
              <div className="relative overflow-hidden h-48">
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
                <div className="absolute bottom-3 left-4 flex gap-2">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <Badge 
                      key={tech} 
                      className="bg-white/90 hover:bg-white text-gray-800 text-xs font-medium transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 2 && (
                    <Badge 
                      className="bg-white/90 hover:bg-white text-gray-800 text-xs font-medium transition-colors"
                    >
                      +{project.technologies.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex space-x-3 mt-auto">
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium text-sm transition-colors"
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
                    className="flex-1 flex items-center justify-center py-2 px-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 text-blue-700 dark:text-blue-300 rounded-lg font-medium text-sm transition-colors"
                    whileHover="hover"
                    variants={buttonVariants}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> 
                    Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
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
