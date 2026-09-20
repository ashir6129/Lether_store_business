"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

/* ── Types ───────────────────────────────────────────────────────────────── */
export interface CustomMeasurements {
  chest?: string;
  length?: string;
  armLength?: string;
  notes?: string;
}

export interface CartItem {
  slug:  string;
  name:  string;
  price: string; // e.g. "£395"
  size:  string;
  image: string;
  qty:   number;
  customMeasurements?: CustomMeasurements;
}

interface CartCtx {
  items:      CartItem[];
  open:       boolean;
  count:      number;
  total:      string;
  addItem:    (item: Omit<CartItem, "qty">) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty:  (slug: string, size: string, delta: number) => void;
  clearCart:  () => void;
  openCart:   () => void;
  closeCart:  () => void;
}

const CartContext = createContext<CartCtx | null>(null);

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function priceNum(price: string) {
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

function formatTotal(items: CartItem[]) {
  const sum = items.reduce((acc, i) => acc + priceNum(i.price) * i.qty, 0);
  return `£${sum.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const STORAGE_KEY = "verge_cart";

/* ── Provider ────────────────────────────────────────────────────────────── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen]   = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === item.slug && i.size === item.size && JSON.stringify(i.customMeasurements) === JSON.stringify(item.customMeasurements));
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const updateQty = useCallback((slug: string, size: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((i) => i.slug === slug && i.size === size ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0);
    });
  }, []);

  const clearCart  = useCallback(() => setItems([]), []);
  const openCart   = useCallback(() => setOpen(true), []);
  const closeCart  = useCallback(() => setOpen(false), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = formatTotal(items);

  return (
    <CartContext.Provider value={{ items, open, count, total, addItem, removeItem, updateQty, clearCart, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

/* ── Hook ────────────────────────────────────────────────────────────────── */
const noop = () => {};

const defaultCtx: CartCtx = {
  items: [], open: false, count: 0, total: "£0",
  addItem: noop, removeItem: noop, updateQty: noop,
  clearCart: noop, openCart: noop, closeCart: noop,
};

export function useCart(): CartCtx {
  return useContext(CartContext) ?? defaultCtx;
}
