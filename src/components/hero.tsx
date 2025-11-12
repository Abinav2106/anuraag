"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Award, Shield } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

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


export function Hero() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const headlineWords = ["Crafted", "for", "Care.", "Trusted", "for", "Lifesaving."];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Hero background with product showcase */}
      <motion.div style={{ y: translateY }} className="absolute inset-0 z-0 will-change-transform">
        {/* Background base */}
        <Image
          src="/hero.png"
          alt="Premium first aid kit in medical workspace"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Semi-transparent white gradient overlay for better text readability */}
      <div className="absolute inset-0 hero-gradient-overlay z-10" />
      
      {/* Soft pulsing glow behind hero image */}
      <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center">
        <motion.div
          aria-hidden
          initial={{ scale: 1, opacity: 0.08 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full blur-3xl bg-amber-400/20 w-[60vw] max-w-[900px] aspect-square"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Animated headline */}
        <motion.h1
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight px-2"
          style={{ color: '#2C2C2C' }}
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-2 sm:mr-3 md:mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
          style={{ color: '#5E5E5E' }}
        >
          Since 2001 — <span className="font-medium" style={{ color: '#C89B3C' }}>Premium</span> first aid kits for Healthcare, Education & Corporate safety.
        </motion.p>

        {/* Badges */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 text-xs sm:text-sm px-4"
          style={{ color: '#5E5E5E' }}
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: '#C89B3C' }} />
            <span>ISO Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" style={{ color: '#C89B3C' }} />
            <span>1000+ Hospitals</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: '#C89B3C' }} />
            <span>Sterile QC</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
