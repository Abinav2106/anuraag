"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
    sizes: string[];
  };
}

const features = [
  { icon: "🌿", label: "100% Natural" },
  { icon: "🐰", label: "Cruelty Free" },
  { icon: "♻️", label: "Eco Friendly" },
  { icon: "✓", label: "Expert Approved" },
];

const accordionSections = [
  {
    title: "Details",
    content: "Comprehensive details about this premium first aid product. Made with the highest quality materials and tested for safety and effectiveness. Suitable for professional medical use and home care."
  },
  {
    title: "How to Use",
    content: "1. Clean the affected area gently\n2. Apply the product as directed\n3. Cover with appropriate dressing if needed\n4. Monitor for any adverse reactions\n5. Replace dressing as recommended"
  },
  {
    title: "Ingredients",
    content: "Active ingredients: Medical grade components\nInactive ingredients: Stabilizers, preservatives\nAll ingredients are tested and approved for medical use according to Indian standards."
  }
];

export function ProductDetail({ isOpen, onClose, product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-stone-50 w-full max-w-6xl h-[90vh] overflow-y-auto rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-stone-50 border-b border-stone-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <span>Home</span>
              <span>›</span>
              <span>Shop</span>
              <span>›</span>
              <span className="text-stone-800 underline">{product.name}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Side - Product Image */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-stone-100 rounded-lg relative overflow-hidden">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-stone-400 hover:text-red-400 transition-colors text-lg">♡</span>
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-stone-200 rounded-lg flex items-center justify-center border-2 border-stone-300">
                  <span className="text-lg">📦</span>
                </div>
                <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-6">
              {/* Price and Title */}
              <div>
                <div className="text-lg font-medium text-stone-800 mb-2">₹{product.price}</div>
                <h1 className="text-3xl font-medium text-stone-900 mb-4">{product.name}</h1>
                <p className="text-stone-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm rounded-full border border-gold text-black hover:bg-gold hover:text-white transition-colors ${
                        selectedSize === size
                          ? "bg-gold text-white"
                          : "hover:bg-gold hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-stone-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button className="flex-1 bg-stone-800 hover:bg-stone-900 text-white">
                  Select Size
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-6 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 flex items-center justify-center">🚚</span>
                  <span>Free Shipping over ₹50</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 flex items-center justify-center">↩️</span>
                  <span>14 Days Returns</span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-3 bg-stone-100 rounded-lg">
                    <span className="text-lg mb-1">{feature.icon}</span>
                    <span className="text-xs text-stone-600">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion Sections */}
              <div className="space-y-3">
                {accordionSections.map((section) => (
                  <div key={section.title} className="border border-stone-200 rounded-lg">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === section.title ? null : section.title)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-medium text-stone-800">{section.title}</span>
                      {openAccordion === section.title ? (
                        <ChevronUp className="w-5 h-5 text-stone-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-600" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openAccordion === section.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
