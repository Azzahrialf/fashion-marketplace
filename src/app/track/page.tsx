import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShoppingBag, Scissors, Check, Truck, Package } from "lucide-react";

const orderItems = [
  { name: "Indigo Linen Pleated Shirt", designer: "Yuki Tanaka", price: "Rp 420,000", qty: 1 },
  { name: "Wool Tailored Overshirt", designer: "Clara Voss", price: "Rp 680,000", qty: 1 },
];

const timeline = [
  {
    icon: ShoppingBag,
    label: "Order Placed",
    date: "March 1, 2026",
    status: "done",
    note: "Your order has been confirmed and payment processed.",
  },
  {
    icon: Scissors,
    label: "In Production",
    date: "March 10 – April 5",
    status: "active",
    note: "Your pieces are being handcrafted in the studio.",
    updates: [
      {
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
        caption: "Cutting the linen panels — March 15",
        message: "We've started cutting fabric for your shirt. The indigo shade is particularly rich in this batch.",
        designer: "Yuki Tanaka",
      },
    ],
  },
  {
    icon: Check,
    label: "Quality Check",
    date: "Est. April 8–10",
    status: "pending",
    note: "Each piece is inspected before shipping.",
  },
  {
    icon: Truck,
    label: "Shipped",
    date: "Est. April 15",
    status: "pending",
    note: "Your order is on its way.",
  },
  {
    icon: Package,
    label: "Delivered",
    date: "Est. April 18–20",
    status: "pending",
    note: "",
  },
];

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[760px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Order Tracking</p>
            <h1 className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>Order #ATL-2026-00847</h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Placed March 1, 2026</p>
          </div>
          <span
            className="px-3 py-1.5 text-xs font-medium"
            style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)', borderRadius: 20 }}
          >
            In Production
          </span>
        </div>

        {/* TIMELINE */}
        <section className="mb-16">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-5 bottom-5 w-px"
              style={{ background: 'var(--color-border)' }}
            />

            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={i} className="relative flex gap-6 pb-10">
                  {/* Icon */}
                  <div
                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: step.status === "done" ? 'var(--color-text-primary)' : step.status === "active" ? 'var(--color-accent)' : 'var(--color-light)',
                      border: step.status === "pending" ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <step.icon
                      size={16}
                      strokeWidth={1.5}
                      color={step.status === "pending" ? 'var(--color-text-secondary)' : '#fff'}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-baseline justify-between">
                      <p
                        className="text-base font-medium"
                        style={{ color: step.status === "pending" ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{step.date}</p>
                    </div>
                    {step.note && (
                      <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{step.note}</p>
                    )}

                    {/* Designer updates */}
                    {step.updates && step.updates.map((update, j) => (
                      <div
                        key={j}
                        className="mt-4 p-4"
                        style={{ background: 'var(--color-light)', borderRadius: 2 }}
                      >
                        <div className="flex gap-3 mb-3">
                          <div
                            className="relative flex-shrink-0 overflow-hidden"
                            style={{ width: 120, height: 90, borderRadius: 2, background: 'var(--color-border)' }}
                          >
                            <img src={update.image} alt={update.caption} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-medium mb-1">{update.caption}</p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                              &ldquo;{update.message}&rdquo;
                            </p>
                            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>— {update.designer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ORDER ITEMS */}
        <section className="mb-12">
          <h2 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Items in this Order</h2>
          <div className="space-y-4">
            {orderItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-4 border-b text-sm"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>By {item.designer}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-sans)' }}>{item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-base font-medium pt-4">
            <span style={{ fontFamily: 'var(--font-serif)' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-sans)' }}>Rp 1,100,000</span>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 text-sm border transition-opacity hover:opacity-70" style={{ borderColor: 'var(--color-border)', borderRadius: 2 }}>
            Contact Designer
          </button>
          <button className="px-5 py-2.5 text-sm border transition-opacity hover:opacity-70" style={{ borderColor: 'var(--color-border)', borderRadius: 2 }}>
            Download Invoice
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
