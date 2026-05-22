import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: '#111111' }}>
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-lg mb-4" style={{ fontFamily: 'var(--font-serif)', color: '#ffffff' }}>Zahlier</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              A curated marketplace for independent fashion designers.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="text-sm transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Platform</p>
            <div className="flex flex-col gap-2">
              {["About", "Press", "Careers", "Contact"].map(l => (
                <Link key={l} href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.75)' }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>For Designers</p>
            <div className="flex flex-col gap-2">
              {["Sell with Us", "Dashboard", "Resources", "Commission"].map(l => (
                <Link key={l} href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.75)' }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Customers</p>
            <div className="flex flex-col gap-2">
              {["Collections", "FAQs", "Track Order", "Returns", "Sustainability"].map(l => (
                <Link key={l} href="#" className="text-sm transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.75)' }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Zahlier. Independent fashion, honestly made.
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map(l => (
              <Link key={l} href="#" className="text-xs transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
