import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ICONS = {
  fabric: (
    // Tekstur kain — fabrik
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  ),
  printer: (
    // Pencetak — sublimasi
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  ),
  needle: (
    // Jarum & benang — jahitan
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 20c8-1 14-7 16-16" />
      <path d="M7.5 16.5 4 20" />
      <path d="M14 4c2 0 6 1.5 6 6" />
    </svg>
  ),
  zip: (
    // Zip — zipper premium
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2v20" />
      <path d="M9 5h.01" />
      <path d="M15 8h.01" />
      <path d="M9 11h.01" />
      <path d="M15 14h.01" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  ),
}

const materials = [
  {
    title: 'Microfiber Minimesh',
    spec: 'Microfiber Minimesh 160gsm',
    icon: 'fabric',
    points: ['Menyerap peluh dengan pantas', 'Ringan & selesa dipakai', 'Tahan lasak & tidak mudah kedut'],
  },
  {
    title: 'Cetakan Sublimasi Digital',
    spec: 'Teknologi Heat-Transfer',
    icon: 'printer',
    points: ['Warna kekal cerah & tidak pudar', 'Tidak mengelupas atau retak', 'Resolusi cetakan 1440 DPI'],
  },
  {
    title: 'Benang Jahit Premium',
    spec: 'Reinforced Double-Stitching',
    icon: 'needle',
    points: ['Jahitan berganda untuk ketahanan', 'Tidak mudah robek di kawasan tekanan', 'Rapi dan kemas pada setiap sambungan'],
  },
  {
    title: 'Zipper Polo Premium',
    spec: 'YKK Grade Zipper',
    icon: 'zip',
    points: ['Zip berkualiti YKK standard', 'Licin dan mudah dibuka/tutup', 'Anti karat dan tahan lama'],
  },
]

export default function MaterialSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="material" className="py-16 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,40,0.02),transparent_60%)]" />
      <div className="absolute left-0 top-1/2 w-px h-64 -translate-y-1/2 bg-gradient-to-b from-transparent via-green-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Spesifikasi Bahan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            <span className="text-white">Kualiti yang</span>{' '}
            <span className="text-gradient">Tidak Berkompromi</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Setiap komponen dipilih secara teliti untuk memastikan keselesaan maksima dan ketahanan jangka panjang.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
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
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-base">{m.title}</h3>
                  </div>
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
      </div>
    </section>
  )
}
