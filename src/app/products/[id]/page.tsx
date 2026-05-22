"use client";
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Badge from "@/components/ui/Badge";
import { products, getProductById, getDesignerById, getProductsByDesigner, formatPrice } from "@/lib/data";
import { ShoppingBag, Heart, ChevronDown, ChevronRight, ArrowLeft, Package, Scissors, Check, Truck } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

function getBadgeVariant(stock: string) {
  if (stock === "pre-order") return "pre-order";
  if (stock === "made-to-order") return "made-to-order";
  if (stock === "in-stock") return "in-stock";
  return "in-stock";
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const product = getProductById(id);
  if (!product) notFound();

  const designer = getDesignerById(product.designerId);
  const related = getProductsByDesigner(product.designerId).filter(p => p.id !== id).slice(0, 3);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [accordionOpen, setAccordionOpen] = useState<string | null>("description");
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  }

  const timelineSteps = [
    { icon: ShoppingBag, label: "Order Placed", done: true },
    { icon: Scissors, label: "Production", done: false, active: true },
    { icon: Check, label: "Quality Check", done: false },
    { icon: Truck, label: "Shipped", done: false },
  ];

  return (
    <>
      <Navbar />

      {/* Add to Cart Toast */}
      {addedToCart && (
        <div
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 text-sm text-white"
          style={{ background: 'var(--color-text-primary)', boxShadow: 'var(--shadow-md)', borderRadius: 2 }}
        >
          <ShoppingBag size={16} strokeWidth={1.5} />
          Added to cart —&nbsp;
          <Link href="/cart" className="underline underline-offset-2">View cart</Link>
        </div>
      )}

      <main>
        {/* BREADCRUMB */}
        <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <Link href="/" className="hover:opacity-60">Home</Link>
            <ChevronRight size={12} />
            <Link href="/designers" className="hover:opacity-60">Designers</Link>
            <ChevronRight size={12} />
            <Link href={"/designers/" + designer?.id} className="hover:opacity-60">{designer?.name}</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--color-text-primary)' }}>{product.name}</span>
          </nav>
        </div>

        {/* MAIN — GALLERY + INFO */}
        <section className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid md:grid-cols-[60%_40%] gap-10 lg:gap-16">

            {/* ── IMAGE GALLERY ── */}
            <div className="space-y-3">
              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'var(--color-light)', borderRadius: 2 }}>
                {product.images[activeImage] ? (
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name + " — image " + (activeImage + 1)}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.1 }}>
                      <circle cx="24" cy="24" r="20" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <circle cx="24" cy="24" r="7" stroke="#1A1A1A" strokeWidth="1.5"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnails (only if multiple images) */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className="relative flex-shrink-0 overflow-hidden transition-all"
                      style={{
                        width: 72,
                        height: 96,
                        borderRadius: 2,
                        border: activeImage === i ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                        background: 'var(--color-light)',
                      }}
                    >
                      <Image src={img} alt={"Thumbnail " + (i + 1)} fill className="object-cover" sizes="72px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── PRODUCT INFO ── */}
            <div className="space-y-6">
              {/* Designer credit */}
              <div className="flex items-center gap-2">
                {designer?.image && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={designer.image} alt={designer.name} fill className="object-cover" sizes="24px" />
                  </div>
                )}
                <Link href={"/designers/" + product.designerId} className="text-xs transition-opacity hover:opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                  By {product.designerName}
                </Link>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl md:text-3xl leading-tight mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                    {formatPrice(product.price)}
                  </span>
                  <Badge variant={getBadgeVariant(product.stock)} />
                </div>
              </div>

              {/* Scarcity (ethical, informational) */}
              {product.stockCount && product.totalEdition && (
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.stockCount} of {product.totalEdition} pieces remaining in this edition
                </p>
              )}
              {product.stock === "pre-order" && product.productionClose && (
                <div className="p-3 text-sm" style={{ background: 'var(--color-light)', borderLeft: '2px solid var(--color-border)' }}>
                  Production closes {product.productionClose}
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Color{selectedColor !== null ? ` — ${product.colors[selectedColor].name}` : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        title={c.name}
                        className="w-8 h-8 rounded-sm transition-all"
                        style={{
                          background: c.hex,
                          border: selectedColor === i ? '2px solid var(--color-text-primary)' : '2px solid var(--color-border)',
                          outline: selectedColor === i ? '2px solid white' : 'none',
                          outlineOffset: -3,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-secondary)' }}>Size</p>
                    <button className="text-xs underline underline-offset-2 transition-opacity hover:opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                      Size guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="px-4 py-2 text-sm transition-all"
                        style={{
                          border: selectedSize === size ? '1.5px solid var(--color-text-primary)' : '1px solid var(--color-border)',
                          background: selectedSize === size ? 'var(--color-text-primary)' : 'transparent',
                          color: selectedSize === size ? '#fff' : 'var(--color-text-primary)',
                          borderRadius: 2,
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>Quantity</p>
                <div className="flex items-center" style={{ border: '1px solid var(--color-border)', display: 'inline-flex', borderRadius: 2 }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 text-sm text-white font-medium tracking-wide transition-opacity hover:opacity-80"
                  style={{ background: 'var(--color-text-primary)', borderRadius: 2 }}
                >
                  {product.stock === "pre-order" ? "Pre-order Now" : product.stock === "made-to-order" ? "Order Now" : "Add to Cart"}
                </button>
                <button
                  className="w-12 h-12 flex items-center justify-center border transition-colors hover:bg-gray-100"
                  style={{ border: '1px solid var(--color-border)', borderRadius: 2 }}
                  aria-label="Save for later"
                >
                  <Heart size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Ships by */}
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <Package size={14} strokeWidth={1.5} className="inline mr-1.5 mb-0.5" />
                Ships by <strong style={{ color: 'var(--color-text-primary)' }}>{product.shipsBy}</strong>
              </p>

              {/* Timeline */}
              <div className="py-4 border-t border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  {timelineSteps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center flex-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mb-2 text-xs"
                        style={{
                          background: step.done ? 'var(--color-text-primary)' : step.active ? 'var(--color-accent)' : 'var(--color-border)',
                          color: step.done || step.active ? '#fff' : 'var(--color-text-secondary)',
                        }}
                      >
                        <step.icon size={14} strokeWidth={1.5} />
                      </div>
                      <p className="text-[10px] leading-tight" style={{ color: step.active ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                        {step.label}
                      </p>
                      {/* connector line */}
                      {i < timelineSteps.length - 1 && (
                        <div className="absolute" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion — Description */}
              {["description", "materials", "shipping"].map(key => (
                <div key={key} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-left"
                    onClick={() => setAccordionOpen(accordionOpen === key ? null : key)}
                  >
                    <span className="capitalize">{key === "materials" ? "Materials & Care" : key === "shipping" ? "Shipping & Returns" : "Description"}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform"
                      style={{ transform: accordionOpen === key ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {accordionOpen === key && (
                    <div className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {key === "description" && <p>{product.description}</p>}
                      {key === "materials" && (
                        <ul className="space-y-2">
                          {product.materials.map((m, i) => (
                            <li key={i}><strong style={{ color: 'var(--color-text-primary)' }}>{m.name}</strong> — {m.source}</li>
                          ))}
                        </ul>
                      )}
                      {key === "shipping" && (
                        <div className="space-y-1.5">
                          <p>Ships by <strong style={{ color: 'var(--color-text-primary)' }}>{product.shipsBy}</strong></p>
                          <p>Free shipping on orders over Rp 750,000</p>
                          <p>30-day returns for store credit</p>
                          <p>Final sale items cannot be returned</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGNER SECTION */}
        {designer && (
          <section className="py-16" style={{ background: 'var(--color-light)' }}>
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={designer.image} alt={designer.name} fill className="object-cover" sizes="96px" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>About the maker</p>
                  <h2 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{designer.name}</h2>
                  <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
                    &ldquo;{designer.philosophy}&rdquo;
                  </p>
                  <Link
                    href={"/designers/" + designer.id}
                    className="inline-flex items-center gap-2 text-sm border-b pb-0.5 transition-opacity hover:opacity-60"
                    style={{ borderColor: 'var(--color-text-primary)' }}
                  >
                    Visit Studio
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* THE INSPIRATION */}
        {product.inspiration && (
          <section className="py-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--color-text-secondary)' }}>The Inspiration</p>
                <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                  {product.inspiration}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <section className="py-16" style={{ background: 'var(--color-light)' }}>
            <div className="max-w-[1200px] mx-auto px-6">
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>From the same studio</p>
              <h2 className="text-2xl md:text-3xl mb-10" style={{ fontFamily: 'var(--font-serif)' }}>More by {product.designerName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(p => (
                  <ProductCard key={p.id} id={p.id} name={p.name} designerName={p.designerName} price={p.price} badge={p.badge} images={p.images} stock={p.stock} stockCount={p.stockCount} />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <Link href="/collections" className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
            <ArrowLeft size={14} strokeWidth={1.5} /> Back to collections
          </Link>
        </div>
      </main>

      {/* Sticky Add to Cart — Mobile */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex gap-3"
        style={{ background: 'var(--color-off-white)', boxShadow: '0 -1px 12px rgba(0,0,0,0.08)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="flex-1">
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{product.name}</p>
          <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-sans)' }}>{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 text-sm text-white"
          style={{ background: 'var(--color-text-primary)', borderRadius: 2 }}
        >
          {product.stock === "pre-order" ? "Pre-order" : "Add to Cart"}
        </button>
      </div>

      <Footer />
    </>
  );
}
