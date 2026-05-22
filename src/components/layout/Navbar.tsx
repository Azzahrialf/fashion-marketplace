"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Women", href: "/collections?gender=women" },
  { label: "Men", href: "/collections?gender=men" },
  { label: "Designers", href: "/designers" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/collections?sale=true" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "var(--color-text-primary)" : "#ffffff";

  return (
    <>
      {/* Announcement bar — hidden when transparent */}
      <div
        className="text-center text-xs py-2 tracking-wide transition-all duration-300"
        style={{
          background: 'var(--color-text-primary)',
          color: '#fff',
          opacity: scrolled ? 1 : 0,
          height: scrolled ? undefined : 0,
          overflow: 'hidden',
          padding: scrolled ? undefined : 0,
        }}
      >
        Free shipping on orders over Rp 500,000 · New drops every week
      </div>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Main nav row */}
          <div className="flex items-center justify-between h-14">
            {/* Mobile menu trigger */}
            <button
              className="lg:hidden p-2 -ml-2 transition-colors duration-300"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ color: textColor }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-light tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.25em', color: textColor }}
            >
              ZAHLIER
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-50 whitespace-nowrap"
                  style={{ color: textColor }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-1" style={{ color: textColor }}>
              <button
                aria-label="Search"
                className="p-2.5 rounded-sm transition-all duration-300 hover:bg-white/20"
                style={{ color: textColor }}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link
                href="/account"
                aria-label="Account"
                className="p-2.5 rounded-sm transition-all duration-300 hover:bg-white/20 hidden lg:flex"
                style={{ color: textColor }}
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
              <Link
                href="/cart"
                aria-label="Cart"
                className="p-2.5 rounded-sm transition-all duration-300 hover:bg-white/20 relative"
                style={{ color: textColor }}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-medium text-white"
                  style={{ background: 'var(--color-accent)' }}
                >
                  2
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump — only needed when scrolled (header is fixed) */}
      <div style={{ height: scrolled ? 0 : 0 }} />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-80 h-full overflow-y-auto flex flex-col" style={{ background: 'var(--color-white)' }}>
            <div className="flex items-center justify-between px-5 h-14 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <span className="text-sm font-medium">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col py-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-5 py-3.5 text-sm font-medium border-b transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: "var(--color-text-primary)"
                  }}
                >
                  {link.label}
                  <ChevronDown size={14} className="-rotate-90" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
