"use client";

import { motion } from "framer-motion";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const wordVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  onAnimationComplete?: () => void;
}

export function AnimatedText({ text, className = "", delay = 0, onAnimationComplete }: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.h1
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      onAnimationComplete={onAnimationComplete}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-3 md:mr-4"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
