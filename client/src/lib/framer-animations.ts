import { Variants } from "framer-motion";

// Animation variants for sections to fade in when scrolled into view
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation variants for staggered children elements
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Animation variants for header items
export const headerItem: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

// Animation variants for hero section elements
export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    }
  },
};

export const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2,
    }
  },
};

// Animation variants for card items
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  }
};

// Animation variants for button hover
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
    }
  }
};

// Animation variants for skill tags
export const skillTagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    }
  }
};

// Bounce animation for scroll indicator
export const scrollIndicatorVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};
