"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  size: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "CLEAR_CART_COMPLETELY" }
  | { type: "LOAD_CART"; payload: CartState };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Create unique ID based on product name, category, and size
      const uniqueId = `${action.payload.category}-${action.payload.name}-${action.payload.size}`;
      const existingItem = state.items.find(item => item.id === uniqueId);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, id: uniqueId, quantity: 1 }];
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case "CLEAR_CART":
      return initialState;

    case "CLEAR_CART_COMPLETELY":
      return initialState;

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  clearCartCompletely: () => void;
  loadCart: (cartData: CartState) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Helper functions for localStorage
  const getCartKey = (userId: string) => `cart_${userId}`;
  
  const saveCartToStorage = (cartData: CartState) => {
    if (user) {
      localStorage.setItem(getCartKey(user.uid), JSON.stringify(cartData));
    }
  };

  const loadCartFromStorage = (userId: string): CartState | null => {
    try {
      const savedCart = localStorage.getItem(getCartKey(userId));
      return savedCart ? JSON.parse(savedCart) : null;
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return null;
    }
  };

  const clearCartFromStorage = (userId: string) => {
    localStorage.removeItem(getCartKey(userId));
  };

  // Load cart when user signs in
  useEffect(() => {
    if (user) {
      const savedCart = loadCartFromStorage(user.uid);
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: savedCart });
      }
    } else {
      // Clear cart from current session when user signs out
      // but keep the data in localStorage for when they sign back in
      dispatch({ type: "CLEAR_CART" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Save cart to storage whenever cart state changes
  useEffect(() => {
    if (user && state.items.length > 0) {
      saveCartToStorage(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, user]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const clearCartCompletely = () => {
    dispatch({ type: "CLEAR_CART_COMPLETELY" });
    if (user) {
      clearCartFromStorage(user.uid);
    }
  };

  const loadCart = (cartData: CartState) => {
    dispatch({ type: "LOAD_CART", payload: cartData });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, clearCartCompletely, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
