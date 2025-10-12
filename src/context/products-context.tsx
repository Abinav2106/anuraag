"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAllProducts, type Product } from "@/data/products";

interface ProductWithStock extends Product {
  id: string;
  inStock: boolean;
}

interface ProductsContextType {
  products: ProductWithStock[];
  updateProductStock: (productId: string, inStock: boolean) => void;
  addProduct: (product: Omit<ProductWithStock, "id">) => void;
  removeProduct: (productId: string) => void;
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductWithStock[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage or use default products
  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // Convert default products to admin format
          const defaultProducts = getAllProducts().map((product, index) => ({
            ...product,
            id: `product_${index}`,
            inStock: product.inStock,
          }));
          setProducts(defaultProducts);
          localStorage.setItem("products", JSON.stringify(defaultProducts));
        }
      } catch (error) {
        console.error("Error loading products:", error);
        // Fallback to default products
        const defaultProducts = getAllProducts().map((product, index) => ({
          ...product,
          id: `product_${index}`,
          inStock: product.inStock,
        }));
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const updateProductStock = (productId: string, inStock: boolean) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, inStock } : product
      )
    );
  };

  const addProduct = (product: Omit<ProductWithStock, "id">) => {
    const newProduct: ProductWithStock = {
      ...product,
      id: `product_${Date.now()}`,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const removeProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  return (
    <ProductsContext.Provider value={{
      products,
      updateProductStock,
      addProduct,
      removeProduct,
      loading
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}


