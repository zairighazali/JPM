import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const PRODUCTS = [
  {
    key: 'zip',
    name: 'Jersey Collar Zip',
    desc: 'Polo zip klasik — pilihan utama penyokong. Sublimasi penuh, dryfit sejuk.',
    front: '/assets/product/jersey-zip-front.png',
    views: [
      { key: 'front', label: 'Depan',    src: '/assets/product/jersey-zip-front.png' },
      { key: 'side',  label: 'Tepi',     src: '/assets/product/jersey-zip-side.png' },
      { key: 'back',  label: 'Belakang', src: '/assets/product/jersey-zip-back.png' },
    ],
  },
  {
    key: 'longsleeve',
    name: 'Jersey Long Sleeve',
    desc: 'Lengan panjang — ringan, selesa & sesuai untuk semua aktiviti kempen.',
    front: '/assets/product/long-sleeve-front.png',
    views: [
      { key: 'front', label: 'Depan', src: '/assets/product/long-sleeve-front.png' },
    ],
  },
  {
    key: 'muslimah',
    name: 'Jersey Muslimah V-Neck',
    desc: 'Potongan labuh & sopan. Rekaan khas untuk muslimah yang aktif.',
    front: '/assets/product/muslimah-v-neck-front.png',
    views: [
      { key: 'front', label: 'Depan',    src: '/assets/product/muslimah-v-neck-front.png' },
      { key: 'side',  label: 'Tepi',     src: '/assets/product/muslimah-v-neck-side.png' },
      { key: 'back',  label: 'Belakang', src: '/assets/product/muslimah-v-neck-back.png' },
    ],
  },
]

function ProductModal({ product, onClose }) {
  const [activeView, setActiveView] = useState(product.views[0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      <button
        onClick={onClose}
        className="fixed z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-sm"
        style={{ top: 'max(14px, env(safe-area-inset-top, 14px))', right: '14px' }}
      >
        ✕
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 backdrop-blur-md">
          {/* Image */}
          <div className="relative bg-black/40" style={{ minHeight: '340px' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeView.key}
                src={activeView.src}
                alt={`${product.name} — ${activeView.label}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full object-contain"
                style={{ maxHeight: '420px' }}
                draggable={false}
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-green-400/70 font-medium">Pandangan</span>
              <div className="text-white font-bold text-lg leading-tight">{activeView.label}</div>
            </div>
          </div>

          {/* View switcher */}
          {product.views.length > 1 && (
            <div className="flex gap-2 px-4 py-3 bg-black/50 border-t border-white/6">
              {product.views.map((v) => (
                <button
                  key={v.key}
                  onClick={() => setActiveView(v)}
                  className={`flex-1 text-xs py-2.5 rounded-xl border transition-all ${
                    activeView.key === v.key
                      ? 'bg-green-400/15 border-green-400/50 text-green-400'
                      : 'border-white/10 text-white/40 hover:text-white/70'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="px-5 py-4 bg-black/30 border-t border-white/6">
            <div className="text-white font-bold text-base">{product.name}</div>
            <div className="text-white/45 text-sm mt-1 leading-relaxed">{product.desc}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProductCard({ product, i, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-green-400/30 transition-all duration-500 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Product image */}
        <div className="relative overflow-hidden bg-black/20" style={{ aspectRatio: '3/4' }}>
          <img
            src={product.front}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          {/* Tap hint */}
          <div className="absolute top-3 right-3 glass border border-white/15 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[11px] text-white/60 group-hover:border-green-400/40 group-hover:text-green-400 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {product.views.length > 1 ? 'Lihat Semua View' : 'Lihat Detail'}
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="text-white font-bold text-lg leading-tight">{product.name}</div>
            <div className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-2">{product.desc}</div>
            {product.views.length > 1 && (
              <div className="flex gap-1.5 mt-3">
                {product.views.map((v) => (
                  <span key={v.key} className="text-[10px] border border-white/20 text-white/40 rounded-full px-2 py-0.5">
                    {v.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function ProductSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="product" className="py-16 md:py-28 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Koleksi Produk</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Pilih </span>
            <span className="text-gradient">Gaya Anda</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Klik pada setiap produk untuk lihat pandangan depan, tepi & belakang.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.key} product={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
