"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-secondary/60 z-10" />
      
      {/* Soft pulsing glow behind hero image */}
      <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center">
        <motion.div
          aria-hidden
          initial={{ scale: 1, opacity: 0.15 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full blur-3xl bg-primary/30 w-[60vw] max-w-[900px] aspect-square"
        />
      </div>

      {/* Hero background image with subtle parallax */}
      <motion.div style={{ y: translateY }} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src="/assets/static/hero.png"
          alt="Premium first aid kit in medical workspace"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Animated headline */}
        <motion.h1
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-foreground leading-tight"
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-3 md:mr-4"
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
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Since 2001 — <span className="emboss text-primary font-medium">Premium</span> first aid kits for Healthcare, Education & Corporate safety.
        </motion.p>

        {/* Badges */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>ISO Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>1000+ Hospitals</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Sterile QC</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-primary hover:text-foreground transition-all duration-200 px-8 py-3 text-base font-medium"
            >
              Explore Premium Kits
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-background transition-all duration-200 px-8 py-3 text-base font-medium"
            >
              Get Corporate Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
