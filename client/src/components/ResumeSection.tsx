import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, experience } from "@/data/portfolio-data";
import { Download, GraduationCap, Briefcase, Calendar, MapPin, Building, Award, CheckCircle } from "lucide-react";
import { fadeInUp, staggerContainer, cardVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";

export default function ResumeSection() {
  // Custom animation for timeline connector
  const timelineConnectorVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%",
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <AnimatedSection 
      id="resume" 
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Resume
          <motion.span 
            className="block w-32 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          ></motion.span>
        </motion.h2>
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="flex justify-center md:justify-end mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              asChild
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-xl"
            >
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" /> Download Complete Resume
              </a>
            </Button>
          </motion.div>
          
          {/* Education Section */}
          <motion.div 
            className="mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="flex items-center mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                <GraduationCap className="text-blue-600 dark:text-blue-400 h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Education
              </h3>
            </motion.div>
            
            <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800 ml-6 space-y-12">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform-gpu"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      borderColor: "rgba(59, 130, 246, 0.5)"
                    }}
                    transition={{ 
                      y: { type: "spring", stiffness: 300 },
                      boxShadow: { duration: 0.2 }
                    }}
                  >
                    <div className="mb-4">
                      <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 font-medium text-xs px-3 py-1 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.period}
                      </Badge>
                      
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{item.degree}</h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                        <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-lg">{item.school}</span>
                      </div>
                      <div className="mb-4 flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                        <Award className="h-4 w-4 mr-2" />
                        <span>GPA: {item.gpa}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-gray-600 dark:text-gray-300">
                      {item.description}
                    </div>
                  </motion.div>
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
            <motion.div 
              className="flex items-center mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                <Briefcase className="text-blue-600 dark:text-blue-400 h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Experience
              </h3>
            </motion.div>
            
            <div className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800 ml-6 space-y-12">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform-gpu"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      borderColor: "rgba(59, 130, 246, 0.5)"
                    }}
                    transition={{ 
                      y: { type: "spring", stiffness: 300 },
                      boxShadow: { duration: 0.2 }
                    }}
                  >
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 font-medium text-xs px-3 py-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.period}
                        </Badge>
                        
                        <Badge variant="outline" className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 font-medium text-xs px-3 py-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.location}
                        </Badge>
                      </div>
                      
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{item.position}</h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-6">
                        <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-lg">{item.company}</span>
                      </div>
                    </div>
                    
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Responsibilities:</h5>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      {item.responsibilities.map((responsibility, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * (i + 1), duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="text-emerald-500 dark:text-emerald-400 h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{responsibility}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
