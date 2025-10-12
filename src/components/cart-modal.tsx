"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/lib/AuthContext";
import Image from "next/image";
import Link from "next/link";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, updateQuantity, removeItem, clearCartCompletely } = useCart();
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl cart-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" style={{ color: '#C89B3C' }} />
                <h2 className="text-xl font-serif font-bold" style={{ color: '#2C2C2C' }}>Shopping Cart</h2>
                {state.itemCount > 0 && (
                  <span 
                    className="text-white text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#C89B3C' }}
                  >
                    {state.itemCount}
                  </span>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="hover:bg-stone-100 transition-colors"
                style={{ color: '#2C2C2C' }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Sign-in Prompt */}
            {!user && state.items.length > 0 && (
              <div className="px-6 py-3 bg-amber-50 border-b border-amber-200">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-amber-600" />
                  <div className="flex-1">
                    <p className="text-sm text-amber-800 font-medium">
                      Sign in to save your cart
                    </p>
                    <p className="text-xs text-amber-700">
                      Your items will be saved when you sign in
                    </p>
                  </div>
                  <Link href="/login" onClick={onClose}>
                    <Button 
                      size="sm"
                      className="text-xs px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2" style={{ color: '#2C2C2C' }}>Your cart is empty.</h3>
                  <p className="text-sm mb-6" style={{ color: '#5E5E5E' }}>Please add products to view them here.</p>
                  <div className="space-y-3">
                    <Link href="/products" onClick={onClose}>
                      <Button 
                        className="w-full text-white hover:opacity-90 transition-all duration-200 px-6 py-2"
                        style={{ backgroundColor: '#C89B3C' }}
                      >
                        Browse Products
                      </Button>
                    </Link>
                    <Link href="/cart" onClick={onClose}>
                      <Button 
                        variant="outline"
                        className="w-full hover:bg-stone-50 transition-colors"
                        style={{ 
                          borderColor: '#C89B3C',
                          color: '#C89B3C'
                        }}
                      >
                        View Full Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-stone-50 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-stone-200 cart-item-image">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium mb-1" style={{ color: '#2C2C2C' }}>{item.name}</h4>
                          <p className="text-sm line-clamp-2 mb-1" style={{ color: '#5E5E5E' }}>{item.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="uppercase tracking-wide" style={{ color: '#C89B3C' }}>{item.category}</span>
                            <span style={{ color: '#5E5E5E' }}>•</span>
                            <span className="font-medium" style={{ color: '#2C2C2C' }}>Size: {item.size}</span>
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-300 rounded-md bg-white">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 hover:bg-stone-100 transition-colors"
                              style={{ color: '#2C2C2C' }}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 text-sm font-medium min-w-[2rem] text-center" style={{ color: '#2C2C2C' }}>
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 hover:bg-stone-100 transition-colors"
                              style={{ color: '#2C2C2C' }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold" style={{ color: '#2C2C2C' }}>
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-xs" style={{ color: '#5E5E5E' }}>
                            ₹{item.price} each
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-stone-200 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span style={{ color: '#2C2C2C' }}>Total</span>
                  <span style={{ color: '#2C2C2C' }}>₹{state.total.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  <Link href="/cart" onClick={onClose}>
                    <Button 
                      className="w-full text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                      style={{ backgroundColor: '#2C2C2C' }}
                      size="lg"
                    >
                      View Cart & Checkout
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-stone-50 transition-colors" 
                    onClick={clearCartCompletely}
                    style={{ 
                      borderColor: '#C89B3C',
                      color: '#C89B3C'
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
