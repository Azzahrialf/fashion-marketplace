import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { designers, getProductsByDesigner, getDesignerById } from "@/lib/data";
import { MapPin, Calendar, Users, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return designers.map(d => ({ id: d.id }));
}

export default async function DesignerPage({ params }: Props) {
  const { id } = await params;
  const designer = getDesignerById(id);
  if (!designer) notFound();

  const designerProducts = getProductsByDesigner(id);

  const behindScenes = [
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* BANNER */}
        <section className="relative overflow-hidden" style={{ height: 320 }}>
          <Image
            src={designer.banner}
            alt={"Banner — " + designer.studio}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
        </section>

        {/* PROFILE BLOCK */}
        <section className="relative z-10 -mt-12 mb-0">
          <div className="max-w-[1200px] mx-auto px-6">
            <div
              className="rounded-sm p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
              style={{ background: 'var(--color-off-white)', boxShadow: 'var(--shadow-sm)' }}
            >
              {/* Profile photo */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-4 border-white" style={{ boxShadow: 'var(--shadow-1)' }}>
                <Image src={designer.image} alt={designer.name} fill className="object-cover" sizes="112px" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{designer.name}</h1>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="flex items-center gap-1.5"><MapPin size={13} />{designer.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} />Est. {designer.founded}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} />{designer.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                  <button
                    className="px-5 py-2.5 text-sm border transition-colors hover:bg-black hover:text-white"
                    style={{ borderColor: 'var(--color-text-primary)' }}
                  >
                    Follow Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIO / PHILOSOPHY */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--color-text-secondary)' }}>Our Philosophy</p>
              <p
                className="text-2xl md:text-3xl mb-8 leading-snug"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)' }}
              >
                &ldquo;{designer.philosophy}&rdquo;
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{designer.bio}</p>
            </div>
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section className="py-16" style={{ background: 'var(--color-light)' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Collection</p>
            <h2 className="text-2xl md:text-3xl mb-10" style={{ fontFamily: 'var(--font-serif)' }}>Current Designs</h2>

            {designerProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designerProducts.map(p => (
                  <ProductCard key={p.id} id={p.id} name={p.name} designerName={p.designerName} price={p.price} badge={p.badge} images={p.images} stock={p.stock} stockCount={p.stockCount} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-20 text-center" style={{ color: 'var(--color-text-secondary)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ border: '1px solid var(--color-border)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M8 12h8M12 8v8"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-serif)' }}>Collection coming soon</p>
              </div>
            )}
          </div>
        </section>

        {/* BEHIND THE SCENES */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Process</p>
            <h2 className="text-2xl md:text-3xl mb-10" style={{ fontFamily: 'var(--font-serif)' }}>In Our Studio</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {behindScenes.map((img, i) => (
                <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '1/1', borderRadius: 2 }}>
                  <Image
                    src={img}
                    alt={"Studio process " + (i + 1)}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BACK LINK */}
        <div className="max-w-[1200px] mx-auto px-6 pb-16">
          <Link href="/designers" className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
            <ArrowLeft size={14} strokeWidth={1.5} /> All Designers
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
