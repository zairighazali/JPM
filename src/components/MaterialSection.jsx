import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ICONS = {
  fabric: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18" /><path d="M3 15h18" />
      <path d="M9 3v18" /><path d="M15 3v18" />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  ),
  needle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 20c8-1 14-7 16-16" />
      <path d="M7.5 16.5 4 20" />
      <path d="M14 4c2 0 6 1.5 6 6" />
    </svg>
  ),
  zip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2v20" />
      <path d="M9 5h.01" /><path d="M15 8h.01" />
      <path d="M9 11h.01" /><path d="M15 14h.01" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  ),
}

const materials = [
  { icon: 'fabric',  title: 'Microfiber Minimesh', spec: 'Microfiber Minimesh 160gsm',
    points: ['Menyerap peluh dengan pantas', 'Ringan & selesa dipakai', 'Tahan lasak & tidak mudah kedut'] },
  { icon: 'printer', title: 'Cetakan Sublimasi Digital', spec: 'Teknologi Heat-Transfer',
    points: ['Warna kekal cerah & tidak pudar', 'Tidak mengelupas atau retak', 'Resolusi cetakan 1440 DPI'] },
  { icon: 'needle',  title: 'Benang Jahit Premium', spec: 'Reinforced Double-Stitching',
    points: ['Jahitan berganda untuk ketahanan', 'Tidak mudah robek di kawasan tekanan', 'Rapi dan kemas pada setiap sambungan'] },
  { icon: 'zip',     title: 'Zipper Polo Premium', spec: 'YKK Grade Zipper',
    points: ['Zip berkualiti YKK standard', 'Licin dan mudah dibuka/tutup', 'Anti karat dan tahan lama'] },
]

const SIZE_CHARTS = [
  { key: 'shirt',    label: 'Carta Saiz Jersey',   src: '/assets/size-chat-shirt.jpg' },
  { key: 'muslimah', label: 'Carta Saiz Jersey (Muslimah)', src: '/assets/size-chart-muslimah.jpg' },
]

export default function MaterialSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeChart, setActiveChart] = useState('shirt')

  return (
    <section id="material" className="py-16 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,40,0.02),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Spesifikasi Bahan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
            <span className="text-white">Pilihan Material</span>{' '}
            <span className="text-gradient">yang Terbaik</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Setiap komponen dipilih secara teliti untuk memastikan keselesaan maksima dan ketahanan jangka panjang.
          </p>
        </motion.div>

        {/* Material cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {materials.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65 }}
              className="glass-card rounded-2xl p-7 group hover:border-green-400/20 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-700/10 border border-green-400/15 flex items-center justify-center text-green-400 flex-shrink-0">
                  {ICONS[m.icon]}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">{m.title}</h3>
                  <div className="text-green-400/60 text-xs mb-4 font-mono tracking-wide">{m.spec}</div>
                  <ul className="space-y-2">
                    {m.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-white/50 text-sm">
                        <span className="w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Size Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Carta Saiz</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Panduan <span className="text-gradient">Saiz Jersey</span>
            </h3>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center gap-3 mb-7">
            {SIZE_CHARTS.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveChart(c.key)}
                className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  activeChart === c.key
                    ? 'bg-green-400/12 border-green-400/50 text-green-400 shadow-[0_0_20px_rgba(0,200,58,0.15)]'
                    : 'glass border-white/10 text-white/50 hover:border-green-400/30 hover:text-white/70'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Chart image */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {SIZE_CHARTS.map((c) => (
              activeChart === c.key && (
                <motion.img
                  key={c.key}
                  src={c.src}
                  alt={c.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full object-contain"
                  width={800}
                  height={600}
                  draggable={false}
                />
              )
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
