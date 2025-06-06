import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfo, technicalSkills, softSkills } from "@/data/portfolio-data";
import { fadeInUp, staggerContainer, skillTagVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";
import { FaUsers, FaComments, FaTasks, FaLightbulb, FaClock, FaBrain } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { 
  Sparkles, 
  Code, 
  ArrowRight, 
  Database, 
  Cloud, 
  Box, 
  FileJson, 
  Network
} from "lucide-react";
import { 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiTypescript, 
  SiGraphql, 
  SiMongodb, 
  SiDocker, 
  SiAmazon
} from "react-icons/si";

// Map for soft skill icons
const skillIconMap: Record<string, React.ReactNode> = {
  users: <FaUsers />,
  comments: <FaComments />,
  tasks: <FaTasks />,
  lightbulb: <FaLightbulb />,
  clock: <FaClock />,
  brain: <FaBrain />
};

// Map for technical skill icons
const techIconMap: Record<string, React.ReactNode> = {
  javascript: <SiJavascript className="text-yellow-400" />,
  react: <SiReact className="text-blue-400" />,
  nodejs: <SiNodedotjs className="text-green-600" />,
  python: <SiPython className="text-blue-500" />,
  database: <Database className="text-purple-500" />,
  cloud: <Cloud className="text-orange-500" />,
  container: <SiDocker className="text-blue-500" />,
  api: <SiGraphql className="text-pink-600" />,
  typescript: <SiTypescript className="text-blue-600" />
};

export default function AboutSection() {
  return (
    <AnimatedSection 
      id="about" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 bg-gradient-blue relative"
    >
      {/* Background gradient circles */}
      <div className="gradient-blur-circle top-[5%] right-[10%]"></div>
      <div className="gradient-blur-circle bottom-[15%] left-[5%]"></div>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            About Me
            <motion.span 
              className="block w-32 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mx-auto mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform-gpu"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ 
                y: { type: "spring", stiffness: 300 },
                boxShadow: { duration: 0.2 }
              }}
            >
              <div className="flex items-center mb-6">
                <Sparkles className="text-indigo-500 dark:text-indigo-400 mr-4 h-8 w-8" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Background</h3>
              </div>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {personalInfo.about.background}
              </motion.p>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {personalInfo.about.additional}
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform-gpu"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ 
                y: { type: "spring", stiffness: 300 },
                boxShadow: { duration: 0.2 }
              }}
            >
              <div className="flex items-center mb-6">
                <Code className="text-indigo-500 dark:text-indigo-400 mr-4 h-8 w-8" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">What I Do</h3>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Develop responsive web applications with modern frameworks",
                  "Design intuitive and accessible user interfaces",
                  "Optimize database queries and application performance",
                  "Implement secure authentication and data protection",
                  "Collaborate with teams using agile methodologies"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="text-primary dark:text-blue-400 mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12 transform-gpu"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ 
              y: { type: "spring", stiffness: 300 },
              boxShadow: { duration: 0.2 }
            }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Technical Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-8">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-800 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:transform">
                    {techIconMap[skill.icon]}
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform-gpu"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ 
              y: { type: "spring", stiffness: 300 },
              boxShadow: { duration: 0.2 }
            }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Soft Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-primary dark:text-blue-400 text-xl mb-3">
                    {skillIconMap[skill.icon]}
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-white">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
