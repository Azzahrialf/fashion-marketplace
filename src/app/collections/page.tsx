"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products, designers } from "@/lib/data";
import { SlidersHorizontal, X } from "lucide-react";

const categories = ["All", "Tops", "Outerwear", "Bottoms", "Dresses", "Knits", "Accessories"];
const stockOptions = ["All", "In Stock", "Pre-order", "Made-to-Order"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDesigner, setSelectedDesigner] = useState("All");
  const [selectedStock, setSelectedStock] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [filterOpen, setFilterOpen] = useState(false);

  let filtered = [...products];

  if (selectedCategory !== "All") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  if (selectedDesigner !== "All") {
    filtered = filtered.filter(p => p.designerName === selectedDesigner);
  }
  if (selectedStock !== "All") {
    const stockMap: Record<string, string> = {
      "In Stock": "in-stock",
      "Pre-order": "pre-order",
      "Made-to-Order": "made-to-order",
    };
    filtered = filtered.filter(p => p.stock === stockMap[selectedStock]);
  }

  if (sortBy === "Price: Low to High") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const hasFilters = selectedCategory !== "All" || selectedDesigner !== "All" || selectedStock !== "All";

  function resetFilters() {
    setSelectedCategory("All");
    setSelectedDesigner("All");
    setSelectedStock("All");
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>Marketplace</p>
          <h1 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>All Collections</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{filtered.length} designs</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── SIDEBAR FILTERS (desktop) ── */}
          <aside className="hidden lg:block w-52 flex-shrink-0 space-y-8">
            {/* Category */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>Category</p>
              <div className="flex flex-col gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="text-left text-sm py-1 transition-opacity"
                    style={{ color: selectedCategory === cat ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: selectedCategory === cat ? 500 : 400 }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Designer */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>Designer</p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedDesigner("All")}
                  className="text-left text-sm py-1"
                  style={{ color: selectedDesigner === "All" ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: selectedDesigner === "All" ? 500 : 400 }}
                >
                  All Designers
                </button>
                {designers.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDesigner(d.name)}
                    className="text-left text-sm py-1"
                    style={{ color: selectedDesigner === d.name ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: selectedDesigner === d.name ? 500 : 400 }}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>Availability</p>
              <div className="flex flex-col gap-1.5">
                {stockOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedStock(opt)}
                    className="text-left text-sm py-1"
                    style={{ color: selectedStock === opt ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: selectedStock === opt ? 500 : 400 }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button onClick={resetFilters} className="text-xs underline underline-offset-2 transition-opacity hover:opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                Clear all filters
              </button>
            )}
          </aside>

          {/* ── MAIN GRID ── */}
          <div className="flex-1">
            {/* Mobile filter + Sort bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                className="lg:hidden flex items-center gap-2 text-sm border px-4 py-2"
                style={{ borderColor: 'var(--color-border)', borderRadius: 2 }}
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} /> Filters
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-sm border px-3 py-2 bg-transparent"
                  style={{ borderColor: 'var(--color-border)', borderRadius: 2 }}
                >
                  {sortOptions.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory !== "All" && (
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--color-light)', border: '1px solid var(--color-border)' }}
                  >
                    {selectedCategory} <X size={10} />
                  </button>
                )}
                {selectedDesigner !== "All" && (
                  <button
                    onClick={() => setSelectedDesigner("All")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--color-light)', border: '1px solid var(--color-border)' }}
                  >
                    {selectedDesigner} <X size={10} />
                  </button>
                )}
                {selectedStock !== "All" && (
                  <button
                    onClick={() => setSelectedStock("All")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--color-light)', border: '1px solid var(--color-border)' }}
                  >
                    {selectedStock} <X size={10} />
                  </button>
                )}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ border: '1px solid var(--color-border)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>No designs match</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Try adjusting your filters</p>
                <button onClick={resetFilters} className="text-sm underline underline-offset-2" style={{ color: 'var(--color-accent)' }}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => (
                  <ProductCard key={p.id} id={p.id} name={p.name} designerName={p.designerName} price={p.price} badge={p.badge} images={p.images} stock={p.stock} stockCount={p.stockCount} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
            <div className="relative ml-auto w-72 h-full overflow-y-auto p-6" style={{ background: 'var(--color-off-white)' }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>Filter</h3>
                <button onClick={() => setFilterOpen(false)}><X size={20} strokeWidth={1.5} /></button>
              </div>

              <div className="space-y-8">
                {[["Category", categories, selectedCategory, setSelectedCategory], ["Availability", stockOptions, selectedStock, setSelectedStock]].map(([label, opts, selected, setter]) => (
                  <div key={String(label)}>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-text-secondary)' }}>{String(label)}</p>
                    <div className="flex flex-col gap-2">
                      {(opts as string[]).map(opt => (
                        <button
                          key={opt}
                          onClick={() => { (setter as (v: string) => void)(opt); }}
                          className="text-left text-sm py-1"
                          style={{ fontWeight: selected === opt ? 500 : 400 }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button
                  onClick={() => { resetFilters(); setFilterOpen(false); }}
                  className="w-full py-3 text-sm text-center border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
