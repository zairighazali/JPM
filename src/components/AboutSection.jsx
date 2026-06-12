import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const DIR = '/assets/about-us'

const CATEGORIES = [
  {
    key: 'pre-pro',
    label: 'Produk Terdahulu',
    desc: 'Hasil kerja sebenar yang pernah kami bekalkan',
    imgs: [1, 2, 3, 4, 5, 6].map((n) => `${DIR}/pre-pro-${n}.JPG`),
  },
  {
    key: 'lapangan',
    label: 'Di Lapangan',
    desc: 'Perarakan & pameran jualan yang kami sertai',
    imgs: [`${DIR}/perarakan.jpg`, ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `${DIR}/pameran-${n}.JPG`)],
  },
  {
    key: 'review',
    label: 'Review Pelanggan',
    desc: 'Maklum balas sebenar daripada pelanggan kami',
    imgs: [1, 2, 3, 4, 5].map((n) => `${DIR}/review-${n}.JPG`),
  },
  {
    key: 'produksi',
    label: 'Produksi',
    desc: 'Pasukan kami bekerja di sebalik setiap tempahan',
    imgs: [
      ...[1, 2, 3, 4].map((n) => `${DIR}/bts-${n}.JPG`),
      ...[1, 2, 3, 4, 5].map((n) => `${DIR}/production-${n}.JPG`),
    ],
  },
  {
    key: 'penghantaran',
    label: 'Stok & Pos',
    desc: 'Stok pukal disemak rapi & dipos terus kepada anda',
    imgs: [
      ...[1, 2, 3].map((n) => `${DIR}/stock-${n}.JPG`),
      ...[1, 2].map((n) => `${DIR}/pos-${n}.JPG`),
    ],
  },
]

const SLIDES = CATEGORIES.flatMap((c) =>
  c.imgs.map((src, i) => ({
    src,
    cat: c.key,
    label: c.label,
    desc: c.desc,
    n: i + 1,
    total: c.imgs.length,
  }))
)

const ICONS = {
  history: (
    // Jam berpatah balik — pengalaman bertahun
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  flag: (
    // Bendera — aktif di arena politik
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
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
  shield: (
    // Perisai semakan — kawalan kualiti
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
}

const values = [
  { icon: 'history', title: '10+ Tahun Pengalaman', desc: 'Lebih sedekad membekal produk cetakan berkualiti tinggi. Kami faham kehendak anda.' },
  { icon: 'flag',    title: 'Aktif di Arena Politik', desc: 'Sentiasa di lapangan — membekal kelengkapan untuk perarakan, ceramah dan pameran.' },
  { icon: 'layers',  title: 'Kapasiti Skala Besar', desc: 'Berpengalaman mengendalikan tempahan pukal dan korporat tanpa kompromi pada kualiti.' },
  { icon: 'shield',  title: 'Kawalan Kualiti', desc: 'Setiap unit diperiksa satu persatu sebelum dibungkus dan dihantar kepada anda.' },
]

const HIGHLIGHTS = ['10+ Tahun Beroperasi', 'Aktif di Arena Politik', 'Tempahan Pukal']

function PortfolioCarousel({ inView }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const slide = SLIDES[index]

  useEffect(() => {
    if (!inView || paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 3200)
    return () => clearInterval(id)
  }, [inView, paused])

  const go = (d) => setIndex((i) => (i + d + SLIDES.length) % SLIDES.length)
  const jumpTo = (key) => setIndex(SLIDES.findIndex((s) => s.cat === key))

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
        className="relative overflow-hidden rounded-3xl border border-white/8 w-full group"
        style={{
          maxWidth: '420px',
          aspectRatio: '3/4',
          boxShadow: '0 30px 90px rgba(0,0,0,0.7), 0 12px 36px rgba(0,0,0,0.8)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { setPaused(true); touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          setPaused(false)
          const dx = e.changedTouches[0].clientX - (touchX.current ?? 0)
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Latar blur — orientasi gambar bercampur, jadi paparkan penuh tanpa crop */}
            <img src={slide.src} alt="" aria-hidden="true" draggable={false}
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-50" />
            <img src={slide.src} alt={`${slide.label} — gambar ${slide.n}`} draggable={false}
              className="relative w-full h-full object-contain" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between pointer-events-none">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-green-400/80 font-medium">{slide.desc}</span>
            <div className="text-white font-bold text-lg leading-tight">{slide.label}</div>
          </div>
          <span className="text-white/50 text-xs font-semibold tabular-nums shrink-0 ml-3">
            {slide.n} / {slide.total}
          </span>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => go(-1)}
          aria-label="Gambar sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-green-400/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Gambar seterusnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-green-400/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress bar kategori */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-3">
          {CATEGORIES.map((c) => {
            const active = slide.cat === c.key
            const progress = active ? slide.n / slide.total : SLIDES.findIndex((s) => s.cat === c.key) < index ? 1 : 0
            return (
              <div key={c.key} className="flex-1 h-0.5 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full bg-green-400/80 transition-all duration-500" style={{ width: `${progress * 100}%` }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Kategori chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-[420px]">
        {CATEGORIES.map((c) => (
          <motion.button
            key={c.key}
            onClick={() => jumpTo(c.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-200 ${
              slide.cat === c.key
                ? 'border-green-400/60 text-green-400 bg-green-400/10 shadow-[0_0_18px_rgba(0,200,58,0.2)]'
                : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/25'
            }`}
          >
            {c.label}
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
          {/* Left: Portfolio gallery */}
          <PortfolioCarousel inView={inView} />

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
              <span className="text-white">Sentiasa bersama</span>{' '}
              <span className="text-gradient">Perjuangan</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              Kalerland Printing telah lebih 10 tahun aktif di lapangan — membekalkan jersey
              dan kelengkapan kempen berkualiti tinggi untuk perarakan, pameran dan program
              politik di seluruh Malaysia.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Setiap helai melalui kawalan kualiti yang rapi sebelum dipos terus kepada anda.
              Lihat sendiri produk terdahulu kami dan maklum balas pelanggan dalam galeri di sebelah.
            </p>

            {/* Highlight chips */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {HIGHLIGHTS.map((h) => (
                <span key={h} className="glass border border-green-400/15 rounded-full px-4 py-1.5 text-xs font-semibold text-green-400/85 tracking-wide">
                  {h}
                </span>
              ))}
            </div>

            {/* <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#007A1E] to-[#00C83A] text-white font-bold rounded-full text-sm glow-sm hover:shadow-[0_0_40px_rgba(0,200,58,0.4)] transition-shadow duration-300"
            >
              Hubungi Kami →
            </motion.a> */}
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
