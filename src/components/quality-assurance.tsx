"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Package, Feather, Settings } from "lucide-react";

interface QualityFeature {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const qualityFeatures: QualityFeature[] = [
  {
    id: "sterile",
    title: "Sterile & Pure",
    icon: <Shield className="w-8 h-8" />
  },
  {
    id: "ready",
    title: "Ready-to-Use",
    icon: <Package className="w-8 h-8" />
  },
  {
    id: "lightweight",
    title: "Lightweight & Portable",
    icon: <Feather className="w-8 h-8" />
  },
  {
    id: "customizable",
    title: "Customizable for Compliance",
    icon: <Settings className="w-8 h-8" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1
  }
};

export function QualityAssurance() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-secondary/20 via-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            <span className="emboss text-primary">Premium</span> Quality Standards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every Anuraag first aid kit meets the highest standards of quality, safety, and compliance.
          </p>
        </motion.div>

        {/* Quality Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {qualityFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              {/* Gold Circle Icon */}
              <div className="relative mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                >
                  {feature.icon}
                </motion.div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 w-20 h-20 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Feature Title */}
              <h3 className="text-lg font-medium text-foreground leading-tight">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mt-12 rounded-full origin-center"
        />
      </div>
    </section>
  );
}
