import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfo, technicalSkills, softSkills } from "@/data/portfolio-data";
import { fadeInUp, staggerContainer, skillTagVariants } from "@/lib/framer-animations";
import AnimatedSection from "./AnimatedSection";
import { FaUsers, FaComments, FaTasks, FaLightbulb, FaClock, FaBrain } from "react-icons/fa";

// Map for soft skill icons
const skillIconMap: Record<string, React.ReactNode> = {
  users: <FaUsers />,
  comments: <FaComments />,
  tasks: <FaTasks />,
  lightbulb: <FaLightbulb />,
  clock: <FaClock />,
  brain: <FaBrain />
};

export default function AboutSection() {
  return (
    <AnimatedSection 
      id="about" 
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            About Me
            <span className="block w-24 h-1 bg-primary dark:bg-blue-400 mx-auto mt-4"></span>
          </motion.h2>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-blue-400">Background</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {personalInfo.about.background}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {personalInfo.about.additional}
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-blue-400">Technical Skills</h3>
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {technicalSkills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full font-medium text-sm"
                  variants={skillTagVariants}
                  whileHover="hover"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-blue-400">Soft Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-primary dark:text-blue-400 text-xl w-8">
                    {skillIconMap[skill.icon]}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
