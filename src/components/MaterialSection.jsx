import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ICONS = {
  fabric:  <img src="/assets/fabric.png"  alt="fabric"  className="w-full h-full object-contain" />,
  printer: <img src="/assets/printer.png" alt="printer" className="w-full h-full object-contain" />,
  needle:  <img src="/assets/needle.png"  alt="needle"  className="w-full h-full object-contain" />,
  zip:     <img src="/assets/zip.png"     alt="zip"     className="w-full h-full object-contain" />,
}

const materials = [
  { icon: 'fabric',  spec: 'Microfiber Minimesh 160gsm', title: 'Fabrik Ringan & Sejuk',
    points: ['Cepat menyerap peluh', 'Cepat kering selepas berpeluh', 'Tidak meninggalkan bau', 'Ringan dan selesa dipakai', 'Tidak mudah berkedut'] },
  { icon: 'printer', spec: 'Full Sublimation Printing', title: 'Cetakan Warna Penuh',
    points: ['Warna lebih terang dan tahan lama', 'Tidak pudar selepas di basuh', 'Rekaan dicetak terus ke dalam fabrik'] },
  { icon: 'needle',  spec: 'Jahitan Premium', title: 'Kemasan Lebih Kukuh',
    points: ['Jahitan lebih kemas dan kuat', 'Sesuai untuk penggunaan harian', 'Direka untuk tahan lebih lama'] },
  { icon: 'zip',     spec: 'Premium Zip Collar', title: 'Zip Berkualiti Tinggi',
    points: ['Mudah dibuka dan ditutup', 'Tidak mudah rosak atau berkarat', 'Memberikan penampilan lebih kemas'] },
]

const SIZE_CHARTS = [
  { key: 'shirt',    label: 'Ukuran Saiz Jersey',   src: '/assets/size-chat-shirt.webp' },
  { key: 'muslimah', label: 'Ukuran Saiz Jersey (Muslimah)', src: '/assets/size-chart-muslimah.webp' },
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
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">MATERIAL & KUALITI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
            <span className="text-white">Direka Untuk</span>
            <br />
            <span className="text-green-400">Keselesaan Maksimum</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
          Menggunakan material berkualiti dan cetakan premium untuk keselesaan sepanjang hari.
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
              <div className="flex items-start gap-6">
                {/* Icon — no frame, just PNG */}
                <div className="flex-shrink-0 w-36 h-36">
                  {ICONS[m.icon]}
                </div>
                <div className="flex-1">
                  <div className="text-green-400 text-sm font-semibold mb-1">{m.spec}</div>
                  <h3 className="text-white font-black text-2xl mb-4 leading-tight">{m.title}</h3>
                  <ul className="space-y-2">
                    {m.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-white/70 text-sm">
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
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
