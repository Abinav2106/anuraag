"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Market {
  id: string;
  title: string;
  subtitle: string;
  percentage: string;
  description: string;
  backgroundImage: string;
  cta: string;
}

const markets: Market[] = [
  {
    id: "healthcare",
    title: "Healthcare Facilities",
    subtitle: "Hospitals, Clinics, Labs",
    percentage: "40%",
    description: "Trusted by over 1000+ healthcare institutions for critical emergency preparedness and patient safety.",
    backgroundImage: "/assets/static/healthcare-bg.jpg",
    cta: "See Recommended Kits"
  },
  {
    id: "education",
    title: "Educational Institutions", 
    subtitle: "Schools, Colleges, Sports",
    percentage: "25%",
    description: "Comprehensive safety solutions for educational environments, sports facilities, and student activities.",
    backgroundImage: "/assets/static/education-bg.jpg",
    cta: "See Recommended Kits"
  },
  {
    id: "corporate",
    title: "Corporate Sector",
    subtitle: "IT Parks, Factories, Construction",
    percentage: "20%",
    description: "Industrial-grade first aid solutions for workplace safety compliance and employee protection.",
    backgroundImage: "/assets/static/corporate-bg.jpg", 
    cta: "See Recommended Kits"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

export function IndustryMarkets() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            Trusted Across <span className="emboss text-primary">Industries</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From critical healthcare environments to educational institutions and corporate workplaces, 
            Anuraag delivers tailored first aid solutions for every industry.
          </p>
        </motion.div>

        {/* Market Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {markets.map((market) => (
            <motion.div
              key={market.id}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="group overflow-hidden h-full cursor-pointer transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  {/* Background Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-primary/20">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                      {market.id === 'healthcare' && '🏥'}
                      {market.id === 'education' && '🎓'}
                      {market.id === 'corporate' && '🏢'}
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="mb-2">
                      <div className="text-3xl font-serif font-bold text-primary mb-1">
                        {market.percentage}
                      </div>
                      <div className="text-sm opacity-90">Market Share</div>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-1">
                      {market.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {market.subtitle}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {market.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                  >
                    {market.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Healthcare Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Educational Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-primary mb-2">300+</div>
              <div className="text-muted-foreground">Corporate Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
