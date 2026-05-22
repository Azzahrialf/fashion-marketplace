import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { designers, products, categories } from "@/lib/data";
import { ArrowRight, MapPin } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function HomePage() {
  const featuredDesigner = designers.find(d => d.featured)!;
  const allProducts = products.slice(0, 8);

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative w-full overflow-hidden" style={{ height: 770 }}>
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2400&q=95&auto=format&fit=crop"
            alt="Zahlier — editorial fashion collection"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, rgba(0,0,0,0.72) 100%)" }}
          />

          {/* Hero content — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
            <div className="max-w-[1400px] mx-auto flex items-end justify-between gap-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Designer of the Week
                </p>
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-light leading-none mb-4"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em", color: '#ffffff' }}
                >
                  {featuredDesigner.name}
                </h1>
                <p className="text-sm md:text-base max-w-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  A studio in {featuredDesigner.location} crafting textiles with
                  ancestral technique and contemporary restraint.
                </p>
                <Link
                  href={`/designers/${featuredDesigner.id}`}
                  className="hero-btn inline-flex items-center gap-3 text-sm font-medium px-6 py-3 transition-all"
                  style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.8)' }}
                >
                  Explore Collection <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>

              {/* Right CTA */}
              <div className="hidden lg:flex flex-col gap-3 text-right">
                <Link href="/collections" className="text-sm transition-opacity hover:opacity-100" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  New Arrivals →
                </Link>
                <Link href="/collections?stock=pre-order" className="text-sm transition-opacity hover:opacity-100" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Pre-order →
                </Link>
                <Link href="/designers" className="text-sm transition-opacity hover:opacity-100" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  All Designers →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORY STRIP — UNIQLO style ─────────── */}
        <section className="py-10" style={{ borderColor: "var(--color-border)", background: "#fff" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-6">
              <h2 className="font-semibold" style={{ fontSize: 28 }}>Browse by Category</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections?category=${cat.id}`}
                  className="group flex flex-col items-center gap-2"
                >
                  {/* Square image box — light gray bg like UNIQLO */}
                  <div
                    className="w-full overflow-hidden flex items-center justify-center"
                    style={{ aspectRatio: "1/1", background: "#F5F5F5" }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={180}
                      height={180}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      sizes="180px"
                    />
                  </div>
                  {/* Label below */}
                  <span
                    className="text-xs font-medium text-center tracking-wide transition-opacity group-hover:opacity-60"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ─────────────────────── */}
        <section className="py-14">
          <div className="max-w-[1400px] mx-auto px-6">
            {/* Section header — UNIQLO style */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold" style={{ fontSize: 28 }}>New Arrivals</h2>
              <Link
                href="/collections"
                className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60"
              >
                View All <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            {/* 4-column grid on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
              {allProducts.map(p => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  designerName={p.designerName}
                  price={p.price}
                  badge={p.badge}
                  images={p.images}
                  stock={p.stock}
                  stockCount={p.stockCount}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL-WIDTH EDITORIAL BANNER ───────────── */}
        <section className="relative overflow-hidden w-full" style={{ height: 720 }}>
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=85"
            alt="New season collection editorial"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient kiri → transparan kanan, seperti UNIQLO */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 50%, transparent 75%)" }}
          />
          {/* Teks di bagian bawah-kiri */}
          <div className="absolute bottom-0 left-0 right-0 pb-14 pt-10">
            <div className="max-w-[1400px] mx-auto px-8 md:px-14">
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Season 2026
              </p>
              <h2
                className="font-light leading-tight mb-5"
                style={{ fontFamily: "var(--font-serif)", color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: 520 }}
              >
                Craft in Every Thread
              </h2>
              <p
                className="text-sm leading-relaxed mb-8 max-w-xs"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                Each piece in our new season collection is handmade by independent
                designers — traceable from first stitch to final fold.
              </p>
              <Link
                href="/collections"
                className="editorial-btn inline-flex items-center gap-3 text-sm font-medium px-6 py-3 transition-all"
                style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.8)' }}
              >
                Shop the Collection <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── BROWSE BY DESIGNER ────────────────────── */}
        <section className="py-14" style={{ background: "var(--color-off-white)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold" style={{ fontSize: 28 }}>Our Designers</h2>
              <Link href="/designers" className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60">
                All Designers <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {designers.map(designer => (
                <Link
                  key={designer.id}
                  href={`/designers/${designer.id}`}
                  className="group bg-white overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Designer banner */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={designer.banner}
                      alt={designer.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs font-semibold tracking-wide mb-0.5" style={{ color: "var(--color-text-secondary)" }}>
                      {designer.studio}
                    </p>
                    <p className="text-sm font-medium mb-1.5">{designer.name}</p>
                    <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-secondary)" }}>
                      <MapPin size={10} /> {designer.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TWO-COLUMN EDITORIAL ──────────────────── */}
        <section className="py-14" style={{ borderColor: "var(--color-border)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left — Pre-orders */}
              <Link href="/collections?stock=pre-order" className="group relative overflow-hidden block" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=85"
                  alt="Pre-order collection"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-2">Reserve yours</p>
                  <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Pre-Order Now
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/70 px-5 py-2.5 transition-all group-hover:bg-white group-hover:text-black">
                    Explore <ArrowRight size={13} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>

              {/* Right — Made to Order */}
              <Link href="/collections?stock=made-to-order" className="group relative overflow-hidden block" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85"
                  alt="Made to order collection"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-2">Bespoke for you</p>
                  <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Made to Order
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/70 px-5 py-2.5 transition-all group-hover:bg-white group-hover:text-black">
                    Discover <ArrowRight size={13} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>


        {/* ── NEWSLETTER ───────────────────────────── */}
        <section
          className="py-16"
          style={{ borderColor: "var(--color-border)", background: "var(--color-off-white)" }}
        >
          <div className="max-w-[560px] mx-auto px-6 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-text-secondary)" }}>
              Stay Connected
            </p>
            <h2
              className="text-3xl font-light mb-3 leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              New designs & drops, monthly
            </h2>
            <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)" }}>
              Curated collections from independent designers. No spam, no shouting.
            </p>
            <NewsletterForm />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
