type BadgeVariant = "pre-order" | "in-stock" | "made-to-order" | "limited" | "sold-out";

const badgeConfig: Record<BadgeVariant, { label: string; style: React.CSSProperties }> = {
  "pre-order": {
    label: "Pre-order",
    style: { background: '#2A5A7F', color: '#fff' },
  },
  "in-stock": {
    label: "In Stock",
    style: { background: '#DFF0E5', color: '#4A7C59' },
  },
  "made-to-order": {
    label: "Made-to-Order",
    style: { background: 'var(--color-light-gray)', color: 'var(--color-charcoal)' },
  },
  "limited": {
    label: "Limited Edition",
    style: { background: '#FDECEA', color: 'var(--color-error)' },
  },
  "sold-out": {
    label: "Sold Out",
    style: { background: '#3A3A3A', color: '#fff' },
  },
};

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export default function Badge({ variant, className = "" }: BadgeProps) {
  const config = badgeConfig[variant];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${className}`}
      style={config.style}
    >
      {config.label}
    </span>
  );
}
