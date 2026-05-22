"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatPrice } from "@/lib/data";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

// Sample cart items
const initialCartItems = [
  {
    id: "1",
    productId: "p1",
    name: "Indigo Linen Pleated Shirt",
    designerName: "Yuki Tanaka",
    price: 420000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
    size: "M",
    color: "Deep Indigo",
    qty: 1,
    fulfillment: "pre-order",
    shipsBy: "April 20, 2026",
  },
  {
    id: "2",
    productId: "p2",
    name: "Wool Tailored Overshirt",
    designerName: "Clara Voss",
    price: 680000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
    size: "S",
    color: "Warm Oat",
    qty: 1,
    fulfillment: "in-stock",
    shipsBy: "March 18, 2026",
  },
];

type CartItem = typeof initialCartItems[0];

function groupByFulfillment(items: CartItem[]) {
  const groups: Record<string, { label: string; items: CartItem[] }> = {};
  items.forEach(item => {
    const key = item.fulfillment + "_" + item.shipsBy;
    if (!groups[key]) {
      groups[key] = {
        label: item.fulfillment === "in-stock" ? `Shipping by ${item.shipsBy}` : item.fulfillment === "pre-order" ? `Pre-order — ships ${item.shipsBy}` : `Made-to-Order — ${item.shipsBy}`,
        items: [],
      };
    }
    groups[key].items.push(item);
  });
  return Object.values(groups);
}

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);

  function updateQty(id: string, delta: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  function remove(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const groups = groupByFulfillment(items);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ border: '1px solid var(--color-border)' }}>
            <ShoppingBag size={28} strokeWidth={1} style={{ opacity: 0.2 }} />
          </div>
          <h1 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Your cart is empty</h1>
          <p className="mb-8 max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>Discover unique pieces from independent designers</p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm text-white"
            style={{ background: 'var(--color-text-primary)' }}
          >
            Browse Collections <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: 'var(--font-serif)' }}>Shopping Cart</h1>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* ── ITEMS ── */}
          <div className="space-y-10">
            {groups.map((group, gi) => (
              <div key={gi}>
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-4 pb-3 border-b"
                  style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}
                >
                  {group.label}
                </p>
                <div className="space-y-6">
                  {group.items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 88, height: 120, background: 'var(--color-light)', borderRadius: 2 }}>
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="88px" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>{item.designerName}</p>
                          <Link href={"/products/" + item.productId} className="text-base leading-snug hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-serif)' }}>
                            {item.name}
                          </Link>
                          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          {/* Qty */}
                          <div className="flex items-center" style={{ border: '1px solid var(--color-border)', display: 'inline-flex', borderRadius: 2 }}>
                            <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-base hover:bg-gray-100">−</button>
                            <span className="w-8 text-center text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-base hover:bg-gray-100">+</button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                              {formatPrice(item.price * item.qty)}
                            </span>
                            <button
                              onClick={() => remove(item.id)}
                              className="p-1.5 transition-opacity hover:opacity-60"
                              aria-label="Remove item"
                              style={{ color: 'var(--color-text-secondary)' }}
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div>
            <div
              className="p-6 sticky top-20"
              style={{ background: 'var(--color-light)', borderRadius: 2 }}
            >
              <h2 className="text-lg mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal ({items.length} items)</span>
                  <span style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Tax</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Calculated at checkout</span>
                </div>
              </div>

              <div
                className="flex justify-between text-base font-medium pt-4 mb-6 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span style={{ fontFamily: 'var(--font-serif)' }}>Estimated Total</span>
                <span style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(subtotal)}</span>
              </div>

              {/* Ship together toggle */}
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input type="checkbox" className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ship items together</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    Wait for all items — saves on shipping
                  </p>
                </div>
              </label>

              <Link
                href="/checkout"
                className="w-full py-4 text-sm text-center block transition-opacity hover:opacity-80"
                style={{ background: 'var(--color-text-primary)', color: '#ffffff', borderRadius: 2 }}
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/collections"
                className="block text-center text-sm mt-4 transition-opacity hover:opacity-60"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
