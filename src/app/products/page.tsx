"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { ProductDetail } from "@/components/product-detail";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { categories, getProductsByCategory, getAllProducts, type Product } from "@/data/products";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Sector to product mapping
const sectorProductMapping = {
  healthcare: ["Sterile Gauze", "Antiseptic Wipes", "Plastic First Aid Box"],
  education: ["Family First Aid Kit", "Adhesive Bandages", "Disposable Gloves"],
  corporate: ["Transparent First Aid Box", "Pain Relievers", "Antibiotic Ointment"]
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const sector = searchParams.get('sector');
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const { addItem } = useCart();

  // Update category based on sector parameter
  useEffect(() => {
    if (sector && sectorProductMapping[sector as keyof typeof sectorProductMapping]) {
      setActiveCategory('sector');
    }
  }, [sector]);

  const getFilteredProducts = () => {
    if (sector && sectorProductMapping[sector as keyof typeof sectorProductMapping]) {
      const recommendedProducts = sectorProductMapping[sector as keyof typeof sectorProductMapping];
      const allProducts = getAllProducts();
      return allProducts.filter(product => 
        recommendedProducts.includes(product.name)
      );
    }
    return getProductsByCategory(activeCategory);
  };

  const getSelectedSize = (productName: string, sizes: string[]) => {
    return selectedSizes[productName] || sizes[0];
  };

  const setSelectedSize = (productName: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productName]: size }));
  };

  const getSectorInfo = () => {
    const sectorInfo = {
      healthcare: {
        title: "Healthcare Recommended Products",
        description: "Professional-grade first aid solutions trusted by hospitals, clinics, and medical facilities."
      },
      education: {
        title: "Education Sector Products",
        description: "Comprehensive safety solutions designed for schools, colleges, and educational environments."
      },
      corporate: {
        title: "Corporate Safety Solutions",
        description: "Industrial-grade first aid products for workplace safety compliance and employee protection."
      }
    };
    return sector ? sectorInfo[sector as keyof typeof sectorInfo] : null;
  };

  const sectorInfo = getSectorInfo();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-stone-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {sectorInfo ? sectorInfo.title : (
                <>Our <span className="text-primary">Premium</span> Products</>
              )}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {sectorInfo ? sectorInfo.description : (
                "Discover our comprehensive range of first aid solutions, from basic household needs to professional medical equipment. Each product is crafted with precision and tested for reliability."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Category Selector - Hide when showing sector-specific products */}
          {!sector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg
                  ${
                    activeCategory === category.id
                      ? "bg-stone-700 text-white shadow-md"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
          )}

          {/* Products Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredProducts().map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100">
                    {/* Product Image Area */}
                    <div className="aspect-square bg-stone-50 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-stone-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Size Selection */}
                      <div className="mb-4">
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
                              className={`px-3 py-1 text-xs font-medium rounded-md border transition-all ${
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

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-semibold text-stone-800">
                          ₹{product.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="text-sm text-stone-600 hover:text-stone-800 border border-stone-300 hover:border-stone-400 px-4 py-2 rounded-lg transition-all"
                        >
                          View Details
                        </motion.button>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            category: product.category,
                            size: getSelectedSize(product.name, product.sizes),
                            image: product.image
                          });
                        }}
                        className="w-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
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

            {/* Empty State */}
            {getFilteredProducts().length === 0 && (
              <div className="text-center py-16">
                <div className="text-stone-400 mb-4">
                  <ShoppingCart className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-stone-600 mb-2">No products found</h3>
                <p className="text-stone-500">Try selecting a different category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetail
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct || { name: "", description: "", price: 0, image: "", category: "", sizes: [] }}
      />
    </div>
  );
}
