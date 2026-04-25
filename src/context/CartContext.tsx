import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS } from "@/data/products";
import type { CartItem, Product } from "@/types/store";
import { toast } from "sonner";

interface CartContextValue {
  items: CartItem[];
  detailedItems: Array<{ product: Product; quantity: number; subtotal: number }>;
  totalItems: number;
  totalValue: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getStockRemaining: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "hardy-store-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    PRODUCTS.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const detailedItems = useMemo(() => {
    return items
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
          subtotal: product.price * item.quantity,
        };
      })
      .filter((x): x is { product: Product; quantity: number; subtotal: number } => x !== null);
  }, [items, productMap]);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const totalValue = useMemo(() => detailedItems.reduce((s, i) => s + i.subtotal, 0), [detailedItems]);

  const addItem = (productId: string, quantity = 1) => {
    const product = productMap.get(productId);
    if (!product) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      const currentQty = existing?.quantity ?? 0;
      const desired = currentQty + quantity;
      if (desired > product.stock) {
        toast.error(`Estoque insuficiente. Restam apenas ${product.stock} unidades.`);
        return prev;
      }
      toast.success(`${product.name} adicionado ao carrinho`);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, quantity: desired } : i));
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = productMap.get(productId);
    if (!product) return;
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Estoque máximo: ${product.stock} unidades.`);
      return;
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const getStockRemaining = (productId: string) => {
    const product = productMap.get(productId);
    if (!product) return 0;
    const inCart = items.find((i) => i.productId === productId)?.quantity ?? 0;
    return Math.max(0, product.stock - inCart);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        detailedItems,
        totalItems,
        totalValue,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getStockRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
