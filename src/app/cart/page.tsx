"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";

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

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  // Calculate tax (8% for demo)
  const taxRate = 0.08;
  const subtotal = state.total;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: '#2C2C2C' }}>
            Shopping Cart
          </h1>
          <p className="text-lg" style={{ color: '#5E5E5E' }}>
            Review your items and proceed to checkout
          </p>
        </motion.div>

        {state.items.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-16"
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-stone-300" />
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2C2C2C' }}>
              Your cart is empty
            </h2>
            <p className="text-lg mb-8" style={{ color: '#5E5E5E' }}>
              Your cart is empty. Browse products to add items.
            </p>
            <Link href="/products">
              <Button 
                className="text-white hover:opacity-90 transition-all duration-200 px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#C89B3C' }}
                size="lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-4"
              >
                {state.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-stone-100"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-stone-50 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: '#2C2C2C' }}>
                              {item.name}
                            </h3>
                            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#5E5E5E' }}>
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 text-sm">
                              <span 
                                className="px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wide"
                                style={{ backgroundColor: '#C89B3C', color: 'white' }}
                              >
                                {item.category}
                              </span>
                              <span className="font-medium" style={{ color: '#2C2C2C' }}>
                                Size: {item.size}
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right md:ml-6">
                            <div className="text-xl font-semibold mb-1" style={{ color: '#2C2C2C' }}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-sm" style={{ color: '#5E5E5E' }}>
                              ₹{item.price} each
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium" style={{ color: '#2C2C2C' }}>
                              Quantity:
                            </span>
                            <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 hover:bg-stone-100 transition-colors"
                                style={{ color: '#2C2C2C' }}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 text-sm font-medium min-w-[3rem] text-center" style={{ color: '#2C2C2C' }}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 hover:bg-stone-100 transition-colors"
                                style={{ color: '#2C2C2C' }}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors px-3"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Shopping Link */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
                className="mt-8 text-center"
              >
                <Link 
                  href="/products"
                  className="inline-flex items-center text-sm font-medium transition-colors hover:underline"
                  style={{ color: '#C89B3C' }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </motion.div>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="sticky top-8"
              >
                {/* Glassmorphism Summary Card */}
                <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-6" style={{ color: '#2C2C2C' }}>
                    Order Summary
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#5E5E5E' }}>Subtotal ({state.itemCount} items)</span>
                      <span className="font-medium" style={{ color: '#2C2C2C' }}>
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#5E5E5E' }}>Tax (8%)</span>
                      <span className="font-medium" style={{ color: '#2C2C2C' }}>
                        ₹{tax.toFixed(2)}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/30 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold" style={{ color: '#2C2C2C' }}>
                          Total
                        </span>
                        <span className="text-xl font-bold" style={{ color: '#2C2C2C' }}>
                          ₹{finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Proceed to Checkout */}
                  <Button 
                    className="w-full text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    style={{ backgroundColor: '#2C2C2C' }}
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Clear Cart */}
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-stone-50 transition-colors" 
                    onClick={clearCart}
                    style={{ 
                      borderColor: '#C89B3C',
                      color: '#C89B3C'
                    }}
                    size="lg"
                  >
                    Clear Cart
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Secure Checkout
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
