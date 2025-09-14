"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { ProductDetail } from "@/components/product-detail";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All Products", active: true },
  { id: "kits", label: "First Aid Kits", active: false },
  { id: "consumables", label: "Consumables", active: false },
  { id: "specialty", label: "Specialty Items", active: false },
];

const products = {
  kits: [
    { name: "Plastic First Aid Box", description: "Durable plastic construction for basic first aid needs", price: 299 },
    { name: "Vinyl First Aid Kit", description: "Portable vinyl case with essential medical supplies", price: 399 },
    { name: "Transparent First Aid Box", description: "Clear visibility for quick item identification", price: 349 },
    { name: "Family First Aid Kit", description: "Comprehensive kit for household emergency care", price: 599 },
  ],
  consumables: [
    { name: "Sterile Gauze", description: "Medical-grade sterile gauze pads and rolls", price: 149 },
    { name: "Adhesive Bandages", description: "Various sizes of adhesive bandages", price: 89 },
    { name: "Antiseptic Wipes", description: "Alcohol-based antiseptic cleaning wipes", price: 129 },
    { name: "Disposable Gloves", description: "Latex-free disposable examination gloves", price: 199 },
    { name: "Adhesive Tape", description: "Medical adhesive tape for securing bandages", price: 79 },
    { name: "Triangular Bandages", description: "Multi-purpose triangular bandages for slings", price: 159 },
  ],
  specialty: [
    { name: "Scissors and Tweezers", description: "Precision medical instruments", price: 249 },
    { name: "Antibiotic Ointment", description: "Topical antibiotic for wound care", price: 189 },
    { name: "Pain Relievers", description: "Over-the-counter pain medication", price: 99 },
  ],
};

export function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | {
    name: string;
    description: string;
    price: number;
  }>(null);
  const { addItem } = useCart();

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4 emboss">
            Choose Your <span className="text-primary">Premium</span> Kit
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From basic household needs to comprehensive emergency care, find the perfect first aid solution for your requirements.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center gap-3 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setShowAll(false);
              }}
              className={`
                px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg
                ${
                  activeCategory === category.id
                    ? "bg-stone-700 text-white"
                    : "bg-transparent text-stone-600 hover:bg-stone-200"
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
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === "all" 
              ? [...products.kits, ...products.consumables, ...products.specialty]
              : products[activeCategory as keyof typeof products] || []
            ).slice(0, showAll ? undefined : 6).map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct({
                  name: product.name,
                  description: product.description,
                  price: product.price
                })}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Product Image Area */}
                  <div className="aspect-square bg-stone-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-stone-200 rounded-lg flex items-center justify-center">
                        <span className="text-4xl text-stone-400">📦</span>
                      </div>
                    </div>
                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-stone-400 hover:text-red-400 transition-colors">♡</span>
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-stone-800 mb-2 group-hover:text-stone-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-medium text-stone-800">
                        ₹{product.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct({
                            name: product.name,
                            description: product.description,
                            price: product.price
                          });
                        }}
                        className="text-sm text-stone-600 hover:text-stone-800 border border-stone-300 hover:border-stone-400 px-3 py-1.5 rounded-md transition-all"
                      >
                        View Details
                      </motion.button>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          id: `${activeCategory}-${product.name}`,
                          name: product.name,
                          description: product.description,
                          price: product.price,
                          category: activeCategory === "all" ? "kits" : activeCategory
                        });
                      }}
                      className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {(() => {
            const totalProducts = activeCategory === "all" 
              ? [...products.kits, ...products.consumables, ...products.specialty].length
              : (products[activeCategory as keyof typeof products] || []).length;
            
            return totalProducts > 6 && (
              <div className="text-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(!showAll)}
                  className="bg-stone-700 text-white px-8 py-3 rounded-md font-medium hover:bg-stone-800 transition-colors"
                >
                  {showAll ? "Show Less" : `Show More (${totalProducts - 6} more)`}
                </motion.button>
              </div>
            );
          })()}
        </motion.div>

        {/* Product Detail Modal */}
        <ProductDetail
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct || { name: "", description: "", price: 0 }}
        />
      </div>
    </section>
  );
}
