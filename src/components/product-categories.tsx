"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { ProductDetail } from "@/components/product-detail";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { categories, getProductsByCategory, type Product } from "@/data/products";
import { useProducts } from "@/context/products-context";

export function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const { addItem } = useCart();
  const { products } = useProducts();

  const getSelectedSize = (productName: string, sizes: readonly string[]) => {
    return selectedSizes[productName] || sizes[0];
  };

  const setSelectedSize = (productName: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productName]: size }));
  };

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
            {products.filter(product => {
              if (activeCategory === "all") return true;
              return product.category === activeCategory;
            }).slice(0, showAll ? undefined : 6).map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  {/* Product Image Area */}
                  <div className="aspect-square bg-stone-100 relative overflow-hidden">
                    {/* Stock Status Indicator */}
                    {product.inStock ? (
                      <p className="absolute top-3 left-3 text-sm text-green-700 font-medium bg-green-100 inline-block px-3 py-1 rounded-full shadow-sm">
                        In Stock
                      </p>
                    ) : (
                      <p className="absolute top-3 left-3 text-sm text-red-700 font-medium bg-red-100 inline-block px-3 py-1 rounded-full shadow-sm">
                        Out of Stock
                      </p>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-stone-800 mb-2 group-hover:text-stone-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Size Selection - Fixed height container */}
                    <div className="mb-4 min-h-[60px]">
                      <label className="text-xs font-medium text-stone-600 mb-2 block">
                        Size:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSize(product.name, size);
                            }}
                            className={`px-3 py-1 text-xs font-medium rounded-md border transition-all whitespace-nowrap ${
                              getSelectedSize(product.name, product.sizes) === size
                                ? 'border-stone-700 bg-stone-700 text-white'
                                : 'border-stone-300 bg-white text-stone-600 hover:border-stone-400'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Spacer to push buttons to bottom */}
                    <div className="flex-grow"></div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-medium text-stone-800">
                        ₹{product.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
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
                          id: `${product.name}-${getSelectedSize(product.name, product.sizes)}`,
                          name: product.name,
                          description: product.description,
                          price: product.price,
                          category: product.category,
                          size: getSelectedSize(product.name, product.sizes),
                          image: product.image
                        });
                      }}
                      disabled={!product.inStock}
                      className={`w-full transition-colors ${
                        product.inStock 
                          ? "bg-primary text-white hover:bg-primary/90" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {(() => {
            const totalProducts = products.filter(product => {
              if (activeCategory === "all") return true;
              return product.category === activeCategory;
            }).length;
            
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
          product={selectedProduct || { name: "", description: "", price: 0, image: "", category: "", sizes: [] }}
        />
      </div>
    </section>
  );
}
