import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from './BrandLogo'

const links = [
  { label: 'Produk',  href: '#product' },
  { label: 'Material', href: '#material' },
  { label: 'Harga',   href: '#pricing' },
  { label: 'Proses',  href: '#proses' },
  { label: 'Galeri',  href: '#galeri' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className={`transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-green-400/5 tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#007A1E] to-[#00C83A] text-white rounded-full glow-sm hover:shadow-green-500/40 hover:shadow-xl transition-shadow duration-300 tracking-wide"
            >
              Beli Sekarang
            </motion.a>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-center"
            onClick={() => setOpen(!open)}
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-b border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm text-white/70 hover:text-green-400 transition-colors border-b border-white/5 last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a href="#pricing" className="mt-2 py-3 text-sm font-semibold text-center bg-gradient-to-r from-[#007A1E] to-[#00C83A] text-white rounded-full">
                Beli Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
