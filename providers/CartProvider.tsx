"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { CartItem, Product } from "@/type"
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ 
    children 
}: {
    children: ReactNode
}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const handleAddToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, {...product, quantity: 1}];
            }
        });
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) => 
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        )
    }

    const handleRemoveFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !==id));
    }

    const handleClearCart = () => setCart([]);

  return (
    <CartContext.Provider 
        value={{ 
            cart, 
            addToCart: handleAddToCart, 
            updateQuantity: handleUpdateQuantity, 
            removeFromCart: handleRemoveFromCart, 
            clearCart: handleClearCart }}
        >
      {children}
    </CartContext.Provider>
  )
}