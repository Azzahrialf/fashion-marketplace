"use client";
import { useState } from "react";
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

  return (
    <>
      {/* Announcement bar */}
      <div
        className="text-center text-xs py-2 tracking-wide"
        style={{ background: 'var(--color-text-primary)', color: '#fff' }}
      >
        Free shipping on orders over Rp 500,000 · New drops every week
      </div>

      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: 'var(--color-white)', borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Main nav row */}
          <div className="flex items-center justify-between h-14">
            {/* Mobile menu trigger */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-light tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
              style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.25em' }}
            >
              ZAHLIER
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide transition-opacity hover:opacity-50 whitespace-nowrap"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-1">
              <button aria-label="Search" className="p-2.5 rounded-sm transition-colors hover:bg-gray-100">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link href="/account" aria-label="Account" className="p-2.5 rounded-sm transition-colors hover:bg-gray-100 hidden lg:flex">
                <User size={18} strokeWidth={1.5} />
              </Link>
              <Link href="/cart" aria-label="Cart" className="p-2.5 rounded-sm transition-colors hover:bg-gray-100 relative">
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
