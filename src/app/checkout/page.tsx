"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { formatPrice } from "@/lib/data";
import { Check, ChevronDown, Package, Truck, Scissors, ShoppingBag } from "lucide-react";

const STEPS = ["Shipping", "Payment", "Review"] as const;
type Step = 0 | 1 | 2;

const orderSummary = [
  { name: "Indigo Linen Pleated Shirt", designerName: "Yuki Tanaka", price: 420000, shipsBy: "April 20, 2026", qty: 1 },
  { name: "Wool Tailored Overshirt", designerName: "Clara Voss", price: 680000, shipsBy: "March 18, 2026", qty: 1 },
];

const subtotal = orderSummary.reduce((s, i) => s + i.price * i.qty, 0);

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Shipping form state
  const [shipping, setShipping] = useState({
    name: "", email: "", address: "", city: "", postal: "", country: "Indonesia",
  });

  // Payment form state
  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvc: "", sameBilling: true,
  });

  function handlePlaceOrder() {
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="max-w-[640px] mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--color-success)' }}>
            <Check size={28} strokeWidth={2} color="#fff" />
          </div>
          <h1 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Order Confirmed</h1>
          <p className="mb-2" style={{ color: 'var(--color-text-secondary)' }}>Order #ATL-2026-00847</p>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>Confirmation sent to {shipping.email || "your email"}</p>

          {/* Timeline preview */}
          <div className="flex items-center justify-center gap-0 mb-10">
            {[
              { icon: ShoppingBag, label: "Ordered", done: true },
              { icon: Scissors, label: "Production", done: false },
              { icon: Check, label: "QC", done: false },
              { icon: Truck, label: "Shipped", done: false },
              { icon: Package, label: "Delivered", done: false },
            ].map((s, i, arr) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: s.done ? 'var(--color-text-primary)' : 'var(--color-border)' }}>
                    <s.icon size={14} strokeWidth={1.5} color={s.done ? '#fff' : 'var(--color-text-secondary)'} />
                  </div>
                  <p className="text-[9px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
                </div>
                {i < arr.length - 1 && <div className="w-8 h-px mx-1 mb-5" style={{ background: 'var(--color-border)' }} />}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/track"
              className="py-3.5 text-sm text-white text-center transition-opacity hover:opacity-80"
              style={{ background: 'var(--color-text-primary)', borderRadius: 2 }}
            >
              Track My Order
            </Link>
            <Link href="/" className="py-3 text-sm text-center transition-opacity hover:opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1100px] mx-auto px-6 py-10">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{
                    background: i < step ? 'var(--color-success)' : i === step ? 'var(--color-text-primary)' : 'var(--color-border)',
                    color: i <= step ? '#fff' : 'var(--color-text-secondary)',
                  }}
                >
                  {i < step ? <Check size={14} strokeWidth={2} /> : i + 1}
                </div>
                <p className="text-xs mt-1" style={{ color: i === step ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: i === step ? 500 : 400 }}>{s}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-16 md:w-24 h-px mb-5" style={{ background: i < step ? 'var(--color-success)' : 'var(--color-border)' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* ── FORM ── */}
          <div>
            {/* STEP 0 — Shipping */}
            {step === 0 && (
              <form onSubmit={e => { e.preventDefault(); setStep(1); }} className="space-y-5">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Shipping Information</h2>

                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Ada Lovelace" },
                  { label: "Email", key: "email", type: "email", placeholder: "ada@studio.com" },
                  { label: "Street Address", key: "address", type: "text", placeholder: "Jl. Sudirman No. 12" },
                  { label: "City", key: "city", type: "text", placeholder: "Jakarta" },
                  { label: "Postal Code", key: "postal", type: "text", placeholder: "10220" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>{field.label}</label>
                    <input
                      required
                      type={field.type}
                      placeholder={field.placeholder}
                      value={shipping[field.key as keyof typeof shipping]}
                      onChange={e => setShipping(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border focus:outline-none focus:border-current"
                      style={{ borderColor: 'var(--color-border)', background: 'transparent', borderRadius: 2 }}
                    />
                  </div>
                ))}

                {/* Shipping method */}
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>Shipping Method</p>
                  <div className="space-y-2">
                    {[
                      { label: "Standard Shipping (3–5 business days)", note: "Free" },
                      { label: "Express Shipping (1–2 business days)", note: "+ Rp 150,000" },
                    ].map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 p-4 cursor-pointer border" style={{ borderColor: i === 0 ? 'var(--color-text-primary)' : 'var(--color-border)', borderRadius: 2 }}>
                        <input type="radio" name="shipping" defaultChecked={i === 0} className="mt-0.5" />
                        <span className="flex-1 text-sm">{opt.label}</span>
                        <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: i === 0 ? 'var(--color-success)' : 'var(--color-text-primary)' }}>{opt.note}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 text-sm text-white mt-4 transition-opacity hover:opacity-80" style={{ background: 'var(--color-text-primary)', borderRadius: 2 }}>
                  Continue to Payment
                </button>
              </form>
            )}

            {/* STEP 1 — Payment */}
            {step === 1 && (
              <form onSubmit={e => { e.preventDefault(); setStep(2); }} className="space-y-5">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Payment</h2>

                {/* Pre-order payment clarity */}
                <div className="p-4 text-sm" style={{ background: 'var(--color-light)', borderRadius: 2 }}>
                  <p className="font-medium mb-1">Pre-order deposit</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    50% of your pre-order total ({formatPrice(420000 / 2)}) is charged today. The remaining balance will be charged 3 days before your item ships.
                  </p>
                </div>

                {[
                  { label: "Cardholder Name", key: "cardName", type: "text", placeholder: "Ada Lovelace" },
                  { label: "Card Number", key: "cardNumber", type: "text", placeholder: "**** **** **** 4242" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>{field.label}</label>
                    <input
                      required
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 text-sm border focus:outline-none"
                      style={{ borderColor: 'var(--color-border)', background: 'transparent', borderRadius: 2 }}
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Expiry Date</label>
                    <input type="text" placeholder="MM / YY" required className="w-full px-4 py-3 text-sm border" style={{ borderColor: 'var(--color-border)', background: 'transparent', borderRadius: 2 }} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>CVC</label>
                    <input type="text" placeholder="123" required className="w-full px-4 py-3 text-sm border" style={{ borderColor: 'var(--color-border)', background: 'transparent', borderRadius: 2 }} />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Billing address same as shipping</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep(0)} className="px-6 py-3.5 text-sm border transition-opacity hover:opacity-60" style={{ borderColor: 'var(--color-border)', borderRadius: 2 }}>
                    Go back
                  </button>
                  <button type="submit" className="flex-1 py-3.5 text-sm text-white transition-opacity hover:opacity-80" style={{ background: 'var(--color-text-primary)', borderRadius: 2 }}>
                    Review Order
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2 — Review */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Review Your Order</h2>

                {/* Order items */}
                <div className="space-y-4">
                  {orderSummary.map((item, i) => (
                    <div key={i} className="flex justify-between items-start text-sm py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>By {item.designerName} · Ships {item.shipsBy}</p>
                      </div>
                      <span style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery info */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4" style={{ background: 'var(--color-light)', borderRadius: 2 }}>
                    <p className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Shipping to</p>
                    <p>Jakarta, Indonesia</p>
                    <button onClick={() => setStep(0)} className="text-xs underline underline-offset-2 mt-1 transition-opacity hover:opacity-60" style={{ color: 'var(--color-accent)' }}>Edit</button>
                  </div>
                  <div className="p-4" style={{ background: 'var(--color-light)', borderRadius: 2 }}>
                    <p className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Payment</p>
                    <p>Card ending in 4242</p>
                    <button onClick={() => setStep(1)} className="text-xs underline underline-offset-2 mt-1 transition-opacity hover:opacity-60" style={{ color: 'var(--color-accent)' }}>Edit</button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    I agree to the <Link href="#" className="underline" style={{ color: 'var(--color-text-primary)' }}>Terms of Service</Link> and <Link href="#" className="underline" style={{ color: 'var(--color-text-primary)' }}>Privacy Policy</Link>
                  </span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 text-sm border" style={{ borderColor: 'var(--color-border)', borderRadius: 2 }}>
                    Go back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 text-sm text-white font-medium transition-opacity hover:opacity-80"
                    style={{ background: 'var(--color-text-primary)', borderRadius: 2 }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── ORDER SUMMARY SIDEBAR ── */}
          <div>
            <div className="p-5 sticky top-20" style={{ background: 'var(--color-light)', borderRadius: 2 }}>
              <button className="flex items-center justify-between w-full mb-4 text-sm font-medium">
                <span>Order Summary ({orderSummary.length} items)</span>
                <ChevronDown size={16} strokeWidth={1.5} />
              </button>
              <div className="space-y-3 mb-4 text-sm border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                {orderSummary.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.name}</span>
                    <span style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                  <span style={{ color: 'var(--color-success)' }}>Free</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
