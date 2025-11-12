"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Market {
  id: string;
  title: string;
  subtitle: string;
  percentage: string;
  description: string;
  backgroundImage: string;
  cta: string;
  recommendedProducts: string[];
}

const markets: Market[] = [
  {
    id: "healthcare",
    title: "Healthcare Facilities",
    subtitle: "Hospitals, Clinics, Labs",
    percentage: "40%",
    description: "Trusted by over 1000+ healthcare institutions for critical emergency preparedness and patient safety.",
    backgroundImage: "/assets/static/healthcare-bg.jpg",
    cta: "See Recommended Kits",
    recommendedProducts: ["Sterile Gauze", "Antiseptic Wipes", "Plastic First Aid Box"]
  },
  {
    id: "education",
    title: "Educational Institutions", 
    subtitle: "Schools, Colleges, Sports",
    percentage: "25%",
    description: "Comprehensive safety solutions for educational environments, sports facilities, and student activities.",
    backgroundImage: "/assets/static/education-bg.jpg",
    cta: "See Recommended Kits",
    recommendedProducts: ["Family First Aid Kit", "Adhesive Bandages", "Disposable Gloves"]
  },
  {
    id: "corporate",
    title: "Corporate Sector",
    subtitle: "IT Parks, Factories, Construction",
    percentage: "20%",
    description: "Industrial-grade first aid solutions for workplace safety compliance and employee protection.",
    backgroundImage: "/assets/static/corporate-bg.jpg", 
    cta: "See Recommended Kits",
    recommendedProducts: ["Transparent First Aid Box", "Pain Relievers", "Antibiotic Ointment"]
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
  const router = useRouter();

  const handleSectorClick = (sectorId: string) => {
    router.push(`/products?sector=${sectorId}`);
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4 text-foreground px-4">
            Trusted Across <span className="emboss text-primary">Industries</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From critical healthcare environments to educational institutions and corporate workplaces, 
            Anuraag delivers tailored first aid solutions for every industry.
          </p>
        </motion.div>

        {/* Market Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {markets.map((market) => (
            <motion.div
              key={market.id}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="group overflow-hidden h-full cursor-pointer transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={market.backgroundImage}
                    alt={`${market.title} background`}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 sm:p-5 md:p-6 flex flex-col justify-end text-white">
                    <div className="mb-2">
                      <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">
                        {market.percentage}
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">Market Share</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold mb-1 text-white">
                      {market.title}
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">
                      {market.subtitle}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    {market.description}
                  </p>
                  <Button 
                    onClick={() => handleSectorClick(market.id)}
                    className="w-full transition-all duration-200 focus:ring-0 focus:outline-none active:scale-95"
                    style={{
                      backgroundColor: '#C89B3C',
                      color: '#000000',
                      border: '1px solid #C89B3C'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#B8872F';
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#C89B3C';
                      e.currentTarget.style.color = '#000000';
                    }}
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
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">1000+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Healthcare Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Educational Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">300+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Corporate Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
