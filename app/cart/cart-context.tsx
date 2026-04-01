"use client";

import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { ShirtColor, ShirtSize } from "../products/interfaces/product.interface";

const CART_STORAGE_KEY = "cart_items";

export interface CartItem {
    productId: number;
    name: string;
    color: ShirtColor;
    size: ShirtSize;
    quantity: number;
    unitPrice: number;
    maxQuantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (item: CartItem) => void;
    updateQuantity: (productId: number, color: ShirtColor, size: ShirtSize, quantity: number) => void;
    removeItem: (productId: number, color: ShirtColor, size: ShirtSize) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    addItem: () => undefined,
    updateQuantity: () => undefined,
    removeItem: () => undefined,
    clearCart: () => undefined,
});

const clampQuantity = (value: number, maxQuantity: number) =>
    Math.max(1, Math.min(value, Math.max(1, maxQuantity)));

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(CART_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as CartItem[];
                setItems(Array.isArray(parsed) ? parsed : []);
            }
        } catch {
            setItems([]);
        } finally {
            setHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!hydrated) {
            return;
        }
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items, hydrated]);

    const addItem = (incoming: CartItem) => {
        setItems((prev) => {
            const index = prev.findIndex(
                (item) =>
                    item.productId === incoming.productId &&
                    item.color === incoming.color &&
                    item.size === incoming.size
            );
            if (index === -1) {
                return [...prev, { ...incoming, quantity: clampQuantity(incoming.quantity, incoming.maxQuantity) }];
            }

            const next = [...prev];
            const current = next[index];
            const mergedQuantity = clampQuantity(
                current.quantity + incoming.quantity,
                current.maxQuantity
            );
            next[index] = { ...current, quantity: mergedQuantity };
            return next;
        });
    };

    const updateQuantity = (
        productId: number,
        color: ShirtColor,
        size: ShirtSize,
        quantity: number
    ) => {
        setItems((prev) =>
            prev.map((item) =>
                item.productId === productId && item.color === color && item.size === size
                    ? { ...item, quantity: clampQuantity(quantity, item.maxQuantity) }
                    : item
            )
        );
    };

    const removeItem = (productId: number, color: ShirtColor, size: ShirtSize) => {
        setItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.productId === productId && item.color === color && item.size === size)
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        if (typeof window !== "undefined") {
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    };

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );
    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
        [items]
    );

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                totalPrice,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
