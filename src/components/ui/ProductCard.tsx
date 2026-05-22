"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/data";

interface ProductCardProps {
  id: string;
  name: string;
  designerName: string;
  price: number;
  badge: string;
  images: string[];
  stock: string;
  stockCount?: number | null;
}

const badgeStyle: Record<string, React.CSSProperties> = {
  "pre-order":      { background: "#111", color: "#fff" },
  "in-stock":       { background: "#1A7A3C", color: "#fff" },
  "made-to-order":  { background: "#fff", color: "#111" },
  "limited":        { background: "var(--color-accent)", color: "#fff" },
  "sold-out":       { background: "#767676", color: "#fff" },
};

function getBadgeKey(stock: string, badge: string) {
  if (stock === "pre-order") return "pre-order";
  if (stock === "made-to-order") return "made-to-order";
  if (badge === "Limited Edition") return "limited";
  return "in-stock";
}

function getBadgeLabel(stock: string, badge: string) {
  if (stock === "pre-order") return "Pre-order";
  if (stock === "made-to-order") return "Made-to-Order";
  if (badge === "Limited Edition") return "Limited Edition";
  return "In Stock";
}

export default function ProductCard({ id, name, designerName, price, badge, images, stock, stockCount }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const primary = images[0];
  const secondary = images[1];
  const badgeKey = getBadgeKey(stock, badge);

  return (
    <Link
      href={`/products/${id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden mb-2"
        style={{ aspectRatio: "3/4", background: "#F5F5F5" }}
      >
        {primary ? (
          <>
            <Image
              src={primary}
              alt={`${name} by ${designerName}`}
              fill
              className="object-cover transition-all duration-700"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {secondary && (
              <Image
                src={secondary}
                alt={`${name} alternate`}
                fill
                className="object-cover absolute inset-0 transition-opacity duration-500"
                style={{ opacity: hovered ? 1 : 0 }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.15 }}>
              <rect x="4" y="4" width="32" height="32" rx="2" stroke="#111" strokeWidth="1.5" />
              <path d="M4 14l8-8 8 8 8-8 8 8" stroke="#111" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium tracking-wide"
            style={badgeStyle[badgeKey]}
          >
            {getBadgeLabel(stock, badge)}
          </span>
        </div>

        {/* Low stock */}
        {stockCount !== null && stockCount !== undefined && stockCount <= 5 && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-white text-red-600 border border-red-200">
              Only {stockCount} left
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-0.5">
        <p className="text-[11px] tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
          {designerName}
        </p>
        <h3
          className="text-sm leading-snug"
          style={{ color: "var(--color-text-primary)", fontWeight: 400 }}
        >
          {name}
        </h3>
        <p className="text-sm font-medium pt-0.5" style={{ color: "var(--color-text-primary)" }}>
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
