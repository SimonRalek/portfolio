import { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
}

// Default animation variants
const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedSection({
  children,
  className = "",
  id,
  variants = defaultVariants,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.section>
  );
}
