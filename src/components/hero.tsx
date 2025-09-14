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

      {/* Hero background with product showcase */}
      <motion.div style={{ y: translateY }} className="absolute inset-0 z-0 will-change-transform">
        {/* Background base */}
        <Image
          src="/assets/static/hero.png"
          alt="Premium first aid kit in medical workspace"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
        
        {/* Floating product images */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            animate={{ opacity: 0.6, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute top-20 left-10 w-32 h-32 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/assets/static/Scissors.png"
              alt="Medical Scissors"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 0.6, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="absolute top-32 right-16 w-28 h-28 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/assets/static/Sterilegauze.png"
              alt="Sterile Gauze"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: -5 }}
            animate={{ opacity: 0.6, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="absolute bottom-40 left-20 w-36 h-36 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/assets/static/Vinylgloves.png"
              alt="Vinyl Gloves"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -100, rotate: 8 }}
            animate={{ opacity: 0.6, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="absolute bottom-32 right-12 w-30 h-30 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/assets/static/Antisepticwipes.png"
              alt="Antiseptic Wipes"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/assets/static/Tweezers.png"
              alt="Medical Tweezers"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
        </div>
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
