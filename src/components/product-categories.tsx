"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: "all", label: "All Products", active: true },
  { id: "kits", label: "First Aid Kits", active: false },
  { id: "consumables", label: "Consumables", active: false },
  { id: "specialty", label: "Specialty Items", active: false },
];

const products = {
  kits: [
    { name: "Plastic First Aid Box", description: "Durable plastic construction for basic first aid needs" },
    { name: "Vinyl First Aid Kit", description: "Portable vinyl case with essential medical supplies" },
    { name: "Transparent First Aid Box", description: "Clear visibility for quick item identification" },
    { name: "Family First Aid Kit", description: "Comprehensive kit for household emergency care" },
  ],
  consumables: [
    { name: "Sterile Gauze", description: "Medical-grade sterile gauze pads and rolls" },
    { name: "Adhesive Bandages", description: "Various sizes of adhesive bandages" },
    { name: "Antiseptic Wipes", description: "Alcohol-based antiseptic cleaning wipes" },
    { name: "Disposable Gloves", description: "Latex-free disposable examination gloves" },
    { name: "Adhesive Tape", description: "Medical adhesive tape for securing bandages" },
    { name: "Triangular Bandages", description: "Multi-purpose triangular bandages for slings" },
  ],
  specialty: [
    { name: "Scissors and Tweezers", description: "Precision medical instruments" },
    { name: "Antibiotic Ointment", description: "Topical antibiotic for wound care" },
    { name: "Pain Relievers", description: "Over-the-counter pain medication" },
  ],
};

export function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            Choose Your <span className="emboss text-primary">Premium</span> Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From comprehensive first aid kits to specialized medical supplies, explore our complete range of safety solutions.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setShowAll(false); // Reset to show only 2 rows when switching categories
              }}
              className={`
                px-8 py-4 rounded-full text-base font-medium transition-all duration-200
                ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-foreground border border-border hover:border-primary hover:bg-primary/5"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "all" 
              ? [...products.kits, ...products.consumables, ...products.specialty]
              : products[activeCategory as keyof typeof products] || []
            ).slice(0, showAll ? undefined : 6).map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">📦</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-primary hover:text-primary/80 text-sm font-medium border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition-all"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {(() => {
            const totalProducts = activeCategory === "all" 
              ? [...products.kits, ...products.consumables, ...products.specialty].length
              : (products[activeCategory as keyof typeof products] || []).length;
            
            return totalProducts > 6 && (
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(!showAll)}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {showAll ? "Show Less" : `Show More (${totalProducts - 6} more)`}
                </motion.button>
              </div>
            );
          })()}
        </motion.div>
      </div>
    </section>
  );
}
