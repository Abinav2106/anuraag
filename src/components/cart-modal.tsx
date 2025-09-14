"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

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
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-serif font-bold text-stone-800">Shopping Cart</h2>
                {state.itemCount > 0 && (
                  <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                    {state.itemCount}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-stone-600 mb-2">Your cart is empty</h3>
                  <p className="text-stone-500 text-sm">Add some products to get started</p>
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
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800 mb-1">{item.name}</h4>
                          <p className="text-sm text-stone-600 line-clamp-2">{item.description}</p>
                          <span className="text-xs text-stone-500 uppercase tracking-wide">{item.category}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-300 rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 text-stone-600 hover:bg-stone-200"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 text-sm font-medium text-stone-700 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 text-stone-600 hover:bg-stone-200"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-stone-800">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-xs text-stone-500">
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
                  <span className="text-stone-800">Total</span>
                  <span className="text-stone-800">₹{state.total.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={clearCart}
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
