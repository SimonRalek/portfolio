import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { education, experience } from "@/data/portfolio-data";
import { Download, GraduationCap, Briefcase } from "lucide-react";
import { fadeInUp, staggerContainer, cardVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";

export default function ResumeSection() {
  return (
    <AnimatedSection 
      id="resume" 
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Resume
          <span className="block w-24 h-1 bg-primary dark:bg-blue-400 mx-auto mt-4"></span>
        </motion.h2>
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="flex justify-end mb-8"
            variants={fadeInUp}
          >
            <Button 
              asChild
              className="inline-flex items-center px-4 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </motion.div>
          
          {/* Education Section */}
          <motion.div 
            className="mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-800 dark:text-gray-100">
              <GraduationCap className="text-primary dark:text-blue-400 mr-3 h-6 w-6" /> Education
            </h3>
            
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md transition-transform hover:scale-[1.01]"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{item.degree}</h4>
                    <div className="text-gray-600 dark:text-gray-300 md:text-right">
                      <div className="font-medium text-primary dark:text-blue-400">{item.period}</div>
                      <div>GPA: {item.gpa}</div>
                    </div>
                  </div>
                  <p className="text-lg mb-2 text-gray-800 dark:text-white">{item.school}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Experience Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center text-gray-800 dark:text-gray-100">
              <Briefcase className="text-primary dark:text-blue-400 mr-3 h-6 w-6" /> Experience
            </h3>
            
            <div className="space-y-8">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md transition-transform hover:scale-[1.01]"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{item.position}</h4>
                    <div className="text-gray-600 dark:text-gray-300 md:text-right">
                      <div className="font-medium text-primary dark:text-blue-400">{item.period}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>
                  <p className="text-lg mb-4 text-gray-800 dark:text-white">{item.company}</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {item.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
