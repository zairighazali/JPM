import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ICONS = {
  print: (
    // Titisan dakwat — sublimasi
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
      <path d="M12 18a3 3 0 0 0 3-3" opacity="0.6" />
    </svg>
  ),
  wind: (
    // Aliran udara — dryfit
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9.8 4.4A2 2 0 1 1 11.3 8H2" />
      <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
      <path d="M12.8 19.6A2 2 0 1 0 14.3 16H2" />
    </svg>
  ),
  award: (
    // Pingat — edisi eksklusif
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" />
    </svg>
  ),
  ruler: (
    // Pembaris — saiz
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z" />
      <path d="m7.5 10.5 2 2" />
      <path d="m10.5 7.5 2 2" />
      <path d="m13.5 4.5 2 2" />
      <path d="m4.5 13.5 2 2" />
    </svg>
  ),
}

const features = [
  { icon: 'print', title: 'Sublimasi Penuh', desc: 'Cetakan sublimasi berkualiti tinggi yang tidak pudar walaupun dicuci berulang kali.' },
  { icon: 'wind',  title: 'Kain Dryfit', desc: 'Fabrik mikro-serat ringan yang menyerap peluh dan mengekalkan kesegaran sepanjang hari.' },
  { icon: 'award', title: 'Edisi PRU16', desc: 'Reka bentuk eksklusif sempena Pilihan Raya Umum ke-16. Stok sangat terhad.' },
  { icon: 'ruler', title: 'Saiz S–4XL', desc: 'Tersedia dalam pelbagai saiz untuk semua peringkat umur, lelaki dan wanita (lengan panjang).' },
]

const JERSEY_VIEWS = [
  { key: 'front', label: 'Depan',    src: '/assets/jersey-front.png', desc: 'Logo PAS & Jalur Gemilang' },
  { key: 'side',  label: 'Tepi',     src: '/assets/jersey-side.png',  desc: 'Panel bahu chevron' },
  { key: 'back',  label: 'Belakang', src: '/assets/jersey-back.png',  desc: 'Khat Jawi' },
]

const LOOKBOOK = [
  { src: '/assets/model-front.jpg', label: 'Depan',    desc: 'Logo PAS & Jalur Gemilang di dada' },
  { src: '/assets/model-side.jpg',  label: 'Tepi',     desc: 'Panel bahu chevron & jahitan kemas' },
  { src: '/assets/model-back.jpg',  label: 'Belakang', desc: 'Khat Jawi eksklusif' },
]

function FeatureCard({ item, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-6 group hover:border-green-400/20 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400/15 to-green-600/5 border border-green-400/20 flex items-center justify-center text-green-400 mb-4 group-hover:border-green-400/40 group-hover:shadow-[0_0_20px_rgba(0,200,58,0.2)] transition-all duration-300">
        {ICONS[item.icon]}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

function JerseyViewer({ inView }) {
  const [view, setView] = useState(JERSEY_VIEWS[0])

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,180,50,0.13) 0%, transparent 68%)' }} />
      </div>

      {/* Floating jersey */}
      <div className="relative flex items-center justify-center min-h-[380px] md:min-h-[440px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={view.key}
            src={view.src}
            alt={`Jersey PAS PRU16 — ${view.label}`}
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -30, rotate: -2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm object-contain jersey-shadow select-none"
            style={{ maxHeight: '440px' }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Ground shadow */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-5 rounded-[50%] bg-black/60 blur-md pointer-events-none"
        />
      </div>

      {/* View switcher */}
      <div className="flex items-center justify-center gap-2.5 mt-2">
        {JERSEY_VIEWS.map((v) => (
          <motion.button
            key={v.key}
            onClick={() => setView(v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`px-5 py-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-200 ${
              view.key === v.key
                ? 'bg-green-400/12 border-green-400/50 text-green-400 shadow-[0_0_20px_rgba(0,200,58,0.15)]'
                : 'glass border-white/10 text-white/50 hover:border-green-400/30 hover:text-white/80'
            }`}
          >
            {v.label}
          </motion.button>
        ))}
      </div>
      <div className="text-center mt-3 h-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={view.key}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-white/30 text-xs tracking-wide"
          >
            {view.desc}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Price badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-2 right-0 sm:right-4 glass rounded-2xl px-5 py-3 border-glow"
      >
        <div className="text-white/40 text-xs mb-0.5">Collar Zip · dari</div>
        <div className="text-gradient font-black text-2xl">RM 39</div>
      </motion.div>
    </motion.div>
  )
}

function LookbookCard({ item, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-green-400/30 transition-colors duration-500 aspect-[3/4]"
    >
      <img
        src={item.src}
        alt={`Jersey PAS dipakai model — ${item.label}`}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-[10px] tracking-[0.25em] uppercase text-green-400/80 font-medium">Pandangan</span>
        <div className="text-white font-bold text-xl leading-tight">{item.label}</div>
        <div className="text-white/45 text-xs mt-1">{item.desc}</div>
      </div>
    </motion.div>
  )
}

export default function ProductSection() {
  const ref = useRef(null)
  const lookbookRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const lookbookInView = useInView(lookbookRef, { once: true, margin: '-80px' })

  return (
    <section id="product" className="py-16 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,122,30,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Koleksi Eksklusif</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="text-white">Direka untuk</span>{' '}
            <span className="text-gradient">Pejuang</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Jersey rasmi penyokong PAS PRU16. Setiap jahitan membawa semangat perjuangan Islam dan keadilan.
          </p>
        </motion.div>

        {/* Big product showcase */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          <JerseyViewer inView={inView} />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
              <span className="text-green-400 text-sm font-medium tracking-wide">Jersey Polo Zip</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Jersey PAS PRU16<br />
              <span className="text-gradient">Edisi Khas</span>
            </h3>
            <p className="text-white/50 leading-relaxed mb-8">
              Dihasilkan dengan teknologi sublimasi terkini. Sesuai untuk kempen, ceramah, dan aktiviti parti.
          
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <FeatureCard key={i} item={f} i={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lookbook — model photoshoot */}
        <div ref={lookbookRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={lookbookInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          >
            <div>
              <span className="text-xs text-green-400/80 tracking-[0.25em] uppercase font-medium">Lookbook</span>
              <h3 className="text-2xl md:text-4xl font-black text-white mt-2">
                Gaya <span className="text-gradient">Sebenar</span>
              </h3>
            </div>
            <p className="text-white/35 text-sm max-w-xs sm:text-right">
              Potongan moden yang kemas dipakai. Selesa di jalanan mahupun di pentas kempen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {LOOKBOOK.map((item, i) => (
              <LookbookCard key={i} item={item} i={i} inView={lookbookInView} />
            ))}
          </div>

          {/* Mini CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={lookbookInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-10"
          >
            <a
              href="https://wa.me/60182255865?text=Saya%20berminat%20untuk%20menempah%20Jersey%20PAS%20PRU16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-400/80 hover:text-green-400 transition-colors group"
            >
              Pesan koleksi ini melalui WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
