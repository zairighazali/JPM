import BrandLogo from './BrandLogo'

const CONTACT = [
  {
    icon: (
      // Telefon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    text: '+60 18-225 5865',
    href: 'https://wa.me/60182255865',
  },
  {
    icon: (
      // Email
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    text: 'hello.kalerland@gmail.com',
    href: 'mailto:hello.kalerland@gmail.com',
  },
  {
    icon: (
      // Lokasi
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: 'Kuala Lumpur, Malaysia',
    href: null,
  },
]

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <BrandLogo />
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
            Pembekal jersey penyokong PAS berkualiti tinggi untuk PRU16. Material premium dan penghantaran pantas.
            </p>
          </div>
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-widest mb-4 font-semibold">Pautan Cepat</h4>
            <ul className="space-y-2">
              {[
                { label: 'Produk', href: '#product' },
                { label: 'Harga', href: '#pricing' },
                { label: 'Material', href: '#material' },
                { label: 'Proses', href: '#process' },
                { label: 'Tentang Kami', href: '#about' },
                { label: 'Hubungi', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/30 text-sm hover:text-green-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-widest mb-4 font-semibold">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-white/30">
              {CONTACT.map((c, i) => (
                <li key={i}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="flex items-center gap-2.5 hover:text-green-400 transition-colors">
                      <span className="text-green-400/60">{c.icon}</span>
                      <span>{c.text}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-2.5">
                      <span className="text-green-400/60">{c.icon}</span>
                      <span>{c.text}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © 2026 Jersey PAS Malaysia. Hak Cipta Terpelihara.
          </p>
          <p className="text-white/20 text-xs">
            Dibuat untuk pejuang Islam Malaysia · PRU16
          </p>
        </div>
      </div>
    </footer>
  )
}
