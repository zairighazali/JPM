import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const PRODUCTS = [
  {
    key: 'zip',
    name: 'Jersey Collar Zip Short Sleeve',
    desc: 'Pilihan paling popular untuk keselesaan harian.',
    front: '/assets/product/jersey-zip-front.webp',
    imgScale: 1.5,
    views: [
      { key: 'front', label: 'Depan',    src: '/assets/product/jersey-zip-front.webp' },
      { key: 'side',  label: 'Tepi',     src: '/assets/product/jersey-zip-side.webp' },
      { key: 'back',  label: 'Belakang', src: '/assets/product/jersey-zip-back.webp' },
    ],
  },
  {
    key: 'longsleeve',
    name: 'Jersey Henley Collar Long Sleeve',
    desc: 'Gaya kemas dengan perlindungan tambahan.',
    front: '/assets/product/long-sleeve-front.webp',
    imgScale: 1,
    views: [
      { key: 'front', label: 'Depan',    src: '/assets/product/long-sleeve-front.webp' },
      { key: 'side',  label: 'Tepi',     src: '/assets/product/long-sleeve-side.webp' },
      { key: 'back',  label: 'Belakang', src: '/assets/product/long-sleeve-back.webp' },
    ],
  },
  {
    key: 'muslimah',
    name: 'Jersey Muslimah V-Neck',
    desc: 'Potongan sopan dan selesa, direka khas untuk muslimah aktif.',
    front: '/assets/product/muslimah-v-neck-front.webp',
    imgScale: 1.15,
    views: [
      { key: 'front', label: 'Depan',    src: '/assets/product/muslimah-v-neck-front.webp' },
      { key: 'side',  label: 'Tepi',     src: '/assets/product/muslimah-v-neck-side.webp' },
      { key: 'back',  label: 'Belakang', src: '/assets/product/muslimah-v-neck-back.webp' },
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
          <div className="relative bg-black/40 flex items-center justify-center p-6" style={{ minHeight: '340px', height: '420px' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeView.key}
                src={activeView.src}
                alt={`${product.name} — ${activeView.label}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain"
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
  const [activeView, setActiveView] = useState(product.views[0])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-2xl border border-white/10 hover:border-green-400/25 transition-all duration-500 bg-[#080809] overflow-hidden"
      >
        {/* Full card image + overlay info */}
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{ aspectRatio: '3/4' }}
          onClick={() => setOpen(true)}
        >
          {/* Jersey image */}
          <div className="absolute inset-0 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700 ease-out">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeView.key}
                src={activeView.src}
                alt={`${product.name} — ${activeView.label}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-contain"
                style={{ transform: `scale(${product.imgScale})` }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#080809] via-[#080809]/85 to-transparent pointer-events-none" />

          {/* Tap hint */}
          <div className="absolute top-3 right-3 glass border border-white/15 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[11px] text-white/60 group-hover:border-green-400/40 group-hover:text-green-400 transition-all z-10">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Lihat Semua View
          </div>

          {/* Info overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-2 z-10" onClick={(e) => e.stopPropagation()}>
            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-2">
              <div className="shrink-0 w-12 h-12">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="28" cy="28" r="26" stroke="#4ade80" strokeWidth="1.5"/>
                  <path d="M20 18 L16 22 L21 25 L21 38 L35 38 L35 25 L40 22 L36 18 C35 20 31.5 22 28 22 C24.5 22 21 20 20 18Z" stroke="#4ade80" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-base leading-tight">{product.name}</div>
                <div className="w-7 h-0.5 bg-green-500 mt-1.5 rounded-full" />
              </div>
            </div>
            <div className="text-white/55 text-sm leading-relaxed mb-3">{product.desc}</div>

            {/* View buttons */}
            {product.views.length > 1 && (
              <div className="flex gap-2">
                {product.views.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setActiveView(v)}
                    className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                      activeView.key === v.key
                        ? 'border-green-500 text-green-400 font-semibold bg-transparent'
                        : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
                    }`}
                  >
                    {v.label}
                  </button>
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
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">EDISI PRU16 • STOK TERHAD</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Pilih Gaya Yang</span>
            <br />
            <span className="text-green-400">Sesuai Untuk Anda</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed text-center">
            Setiap rekaan direka untuk keselesaan dan kegunaan yang berbeza.<br />
            Pilih model yang paling sesuai dengan gaya dan keperluan anda.
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
