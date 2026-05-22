import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { designers } from "@/lib/data";
import { MapPin, Calendar } from "lucide-react";

export default function DesignersPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>The Makers</p>
          <h1 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Independent Designers</h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
            Curated fashion creators from around the world — each with a distinct voice, craft, and philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designers.map(designer => (
            <Link
              key={designer.id}
              href={"/designers/" + designer.id}
              className="group flex gap-6 p-6 border transition-shadow hover:shadow-md"
              style={{ borderColor: 'var(--color-border)', borderRadius: 2, background: 'var(--color-off-white)' }}
            >
              {/* Profile photo */}
              <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={designer.image}
                  alt={designer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="96px"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-xl mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{designer.name}</h2>
                <div className="flex flex-wrap gap-3 text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="flex items-center gap-1"><MapPin size={11} />{designer.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />Est. {designer.founded}</span>
                </div>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {designer.bio}
                </p>
                <p className="mt-3 text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
                  Explore Studio →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
