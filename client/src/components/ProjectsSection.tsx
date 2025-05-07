import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/portfolio-data";
import { ExternalLink, Github } from "lucide-react";
import { fadeInUp, staggerContainer, cardVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";

export default function ProjectsSection() {
  return (
    <AnimatedSection 
      id="projects" 
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Projects
          <span className="block w-24 h-1 bg-primary dark:bg-blue-400 mx-auto mt-4"></span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
