import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const COMPANY_MEDIA = [
  { key: 'silkscreen', label: 'Silkscreen', type: 'video', src: '/assets/company/silkscreen.mp4', thumb: '/assets/company/silkscreen-thumb.jpg', title: 'Proses Silkscreen',  sublabel: 'Di Sebalik Tabir' },
  { key: 'sewing',     label: 'Jahitan',    type: 'video', src: '/assets/company/sewing.mp4',     thumb: '/assets/company/sewing-thumb.jpg',     title: 'Proses Jahitan',     sublabel: 'Di Sebalik Tabir' },
  { key: 'qc',         label: 'QC',         type: 'video', src: '/assets/company/qc.mp4',         thumb: '/assets/company/qc-thumb.jpg',         title: 'Kawalan Kualiti',    sublabel: 'Di Sebalik Tabir' },
  { key: 'bottle',     label: 'UV Print',      type: 'video', src: '/assets/company/bottle.mp4',     thumb: '/assets/company/bottle-thumb.jpg',     title: 'UV Print',      sublabel: 'Pelbagai Produk' },
  { key: 'bulk',       label: 'Pukal',      type: 'img',   src: '/assets/company/bulk-order.jpg', thumb: '/assets/company/bulk-order.jpg',       title: 'Tempahan Korporat',  sublabel: 'Skala Besar' },
  { key: 'tote',       label: 'Tote Bag',   type: 'img',   src: '/assets/company/tote-bag.jpg',   thumb: '/assets/company/tote-bag.jpg',         title: 'Cetakan Tote Bag',   sublabel: 'Pelbagai Produk' },
]

const ICONS = {
  history: (
    // Jam berpatah balik — pengalaman bertahun
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  layers: (
    // Lapisan — kapasiti pukal
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m12 2-10 5 10 5 10-5-10-5Z" />
      <path d="m2 12 10 5 10-5" />
      <path d="m2 17 10 5 10-5" />
    </svg>
  ),
  grid: (
    // Grid produk — kepelbagaian
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="7" height="7" x="3" y="3" rx="1.5" />
      <rect width="7" height="7" x="14" y="3" rx="1.5" />
      <rect width="7" height="7" x="14" y="14" rx="1.5" />
      <rect width="7" height="7" x="3" y="14" rx="1.5" />
    </svg>
  ),
  shield: (
    // Perisai semakan — kawalan kualiti
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
}

const values = [
  { icon: 'history', title: '10+ Tahun Pengalaman', desc: 'Lebih sedekad dalam industri percetakan. Kami faham kehendak anda.' },
  { icon: 'layers',  title: 'Kapasiti Skala Besar', desc: 'Berpengalaman mengendalikan tempahan pukal dan korporat tanpa kompromi pada kualiti.' },
  { icon: 'grid',    title: 'Pelbagai Produk', desc: 'Jersey, t-shirt, tote bag, banner, buku dan pelbagai produk cetakan lain di bawah satu bumbung.' },
  { icon: 'shield',  title: 'Kawalan Kualiti', desc: 'Setiap unit diperiksa satu persatu sebelum dibungkus dan dihantar kepada anda.' },
]

const HIGHLIGHTS = ['10+ Tahun Beroperasi', 'Tempahan Korporat', 'Pelbagai Produk']

function CompanyViewer({ inView }) {
  const [media, setMedia] = useState(COMPANY_MEDIA[0])

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(220,226,238,0.035) 0%, transparent 68%)' }} />
      </div>

      {/* Media card */}
      <div
        className="relative overflow-hidden rounded-3xl border border-white/8 w-full"
        style={{
          maxWidth: '420px',
          aspectRatio: '3/4',
          boxShadow: '0 30px 90px rgba(0,0,0,0.7), 0 12px 36px rgba(0,0,0,0.8)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={media.key}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {media.type === 'video' ? (
              <video
                src={media.src}
                poster={media.thumb}
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={media.src} alt={media.title}
                className="w-full h-full object-cover" draggable={false} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-5 pointer-events-none">
          <span className="text-[10px] tracking-[0.25em] uppercase text-green-400/80 font-medium">{media.sublabel}</span>
          <div className="text-white font-bold text-lg leading-tight">{media.title}</div>
        </div>
      </div>

      {/* Thumbnail switcher */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 max-w-[420px]">
        {COMPANY_MEDIA.map((m) => (
          <motion.button
            key={m.key}
            onClick={() => setMedia(m)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border transition-all duration-200 ${
              media.key === m.key
                ? 'border-green-400/70 shadow-[0_0_20px_rgba(0,200,58,0.3)]'
                : 'border-white/10 opacity-55 hover:opacity-90'
            }`}
          >
            <img src={m.thumb} alt={m.label} className="w-full h-full object-cover" draggable={false} />
            {m.type === 'video' && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <svg className="w-4 h-4 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
            <span className="absolute bottom-0 left-0 right-0 text-[7px] sm:text-[8px] font-semibold uppercase tracking-tight sm:tracking-wider text-white/90 bg-black/55 py-0.5 text-center">
              {m.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-16 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
          {/* Left: Company media viewer */}
          <CompanyViewer inView={inView} />

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
              <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Tentang Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">Produk kualiti hanya di </span>{' '}
              <span className="text-gradient">Kalerland Printing</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              Kami di Kalerland Printing telah beroperasi lebih 10 tahun dengan pengalaman luas dalam pelbagai jenis cetakan.
              Kualiti premium dengan harga yang kompetitif.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Kami menerima tempahan korporat secara konsisten dan mampu mencetak pelbagai produk —
              jersey, t-shirt, tote bag, banner dan banyak lagi. Setiap tempahan melalui kawalan
              kualiti yang rapi sebelum sampai ke tangan anda.
            </p>

            {/* Highlight chips */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {HIGHLIGHTS.map((h) => (
                <span key={h} className="glass border border-green-400/15 rounded-full px-4 py-1.5 text-xs font-semibold text-green-400/85 tracking-wide">
                  {h}
                </span>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#007A1E] to-[#00C83A] text-white font-bold rounded-full text-sm glow-sm hover:shadow-[0_0_40px_rgba(0,200,58,0.4)] transition-shadow duration-300"
            >
              Hubungi Kami →
            </motion.a>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 group hover:border-green-400/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400/15 to-green-600/5 border border-green-400/20 flex items-center justify-center text-green-400 mb-4 group-hover:border-green-400/40 group-hover:shadow-[0_0_20px_rgba(0,200,58,0.2)] transition-all duration-300">
                {ICONS[v.icon]}
              </div>
              <h3 className="text-white font-bold mb-2">{v.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
