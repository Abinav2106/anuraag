"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/lib/AuthContext";
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
  const { state, updateQuantity, removeItem, clearCartCompletely } = useCart();
  const { user } = useAuth();

  // Calculate tax (8% for demo)
  const taxRate = 0.08;
  const subtotal = state.total;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 sm:mb-4" style={{ color: '#2C2C2C' }}>
            Shopping Cart
          </h1>
          <p className="text-sm sm:text-base md:text-lg" style={{ color: '#5E5E5E' }}>
            Review your items and proceed to checkout
          </p>
        </motion.div>

        {/* Sign-in Prompt */}
        {!user && state.items.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm text-amber-800 font-medium">
                    Sign in to save your cart
                  </p>
                  <p className="text-xs text-amber-700">
                    Your items will be saved when you sign in and restored when you return
                  </p>
                </div>
                <Link href="/login">
                  <Button 
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-3 sm:space-y-4"
              >
                {state.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-5 md:p-6 border border-stone-100"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-stone-50 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2" style={{ color: '#2C2C2C' }}>
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2" style={{ color: '#5E5E5E' }}>
                              {item.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
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
                          <div className="text-left sm:text-right sm:ml-6">
                            <div className="text-lg sm:text-xl font-semibold mb-1" style={{ color: '#2C2C2C' }}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm" style={{ color: '#5E5E5E' }}>
                              ₹{item.price} each
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-stone-100">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm font-medium" style={{ color: '#2C2C2C' }}>
                              Quantity:
                            </span>
                            <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 hover:bg-stone-100 transition-colors"
                                style={{ color: '#2C2C2C' }}
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                              <span className="px-3 sm:px-4 text-xs sm:text-sm font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center" style={{ color: '#2C2C2C' }}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 hover:bg-stone-100 transition-colors"
                                style={{ color: '#2C2C2C' }}
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors px-3 text-xs sm:text-sm"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
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
                className="sticky top-4 sm:top-8"
              >
                {/* Glassmorphism Summary Card */}
                <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6" style={{ color: '#2C2C2C' }}>
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm" style={{ color: '#5E5E5E' }}>Subtotal ({state.itemCount} items)</span>
                      <span className="text-sm sm:text-base font-medium" style={{ color: '#2C2C2C' }}>
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Tax */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm" style={{ color: '#5E5E5E' }}>Tax (8%)</span>
                      <span className="text-sm sm:text-base font-medium" style={{ color: '#2C2C2C' }}>
                        ₹{tax.toFixed(2)}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/30 pt-3 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-semibold" style={{ color: '#2C2C2C' }}>
                          Total
                        </span>
                        <span className="text-lg sm:text-xl font-bold" style={{ color: '#2C2C2C' }}>
                          ₹{finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  {/* Proceed to Checkout */}
                  <Button 
                    className="w-full text-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm sm:text-base"
                    style={{ backgroundColor: '#2C2C2C' }}
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Clear Cart */}
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-stone-50 transition-colors text-sm sm:text-base" 
                    onClick={clearCartCompletely}
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
