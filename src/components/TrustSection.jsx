import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const GALLERY = [
  { src: '/assets/section-1/borong-1.JPG' },
  { src: '/assets/section-1/borong-2.JPG' },
  { src: '/assets/section-1/borong-3.JPG' },
  { src: '/assets/section-1/borong-4.JPG' },
  { src: '/assets/section-1/parcel-1.JPG' },
  { src: '/assets/section-1/parcel-2.JPG' },
  { src: '/assets/section-1/pickup-1.JPG' },
  { src: '/assets/section-1/pickup-2.JPG' },
  { src: '/assets/section-1/pickup-3.JPG' },
  { src: '/assets/section-1/pickup-4.JPG' },
  { src: '/assets/section-1/pickup-5.JPG' },
  { src: '/assets/section-1/pickup-6.JPG' },
  { src: '/assets/section-1/pickup-7.JPG' },
  { src: '/assets/section-1/pickup-8.JPG' },
  { src: '/assets/section-1/prodcution-5.JPG' },
  { src: '/assets/section-1/production-1.JPG' },
  { src: '/assets/section-1/production-2.JPG' },
  { src: '/assets/section-1/production-3.JPG' },
  { src: '/assets/section-1/production-4.JPG' },
  { src: '/assets/section-1/review-2.JPG' },
  { src: '/assets/section-1/stock-1.JPG' },
  { src: '/assets/section-1/stock-2.JPG' },
  { src: '/assets/section-1/stock-3.JPG' },
  { src: '/assets/section-1/stock-5.JPG' },
  { src: '/assets/section-1/stock-7.JPG' },
  { src: '/assets/section-1/stock-8.JPG' },
  { src: '/assets/section-1/stock-9.JPG' },
  { src: '/assets/section-1/stock-10.JPG' },
]

const STATS = [
  { value: '2014', label: 'Beroperasi Sejak' },
  { value: '10+',  label: 'Tahun Pengalaman' },
  { value: '50K+', label: 'Jersey Dihantar' },
  { value: '100%', label: 'Penyokong PAS' },
]

export default function TrustSection() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section id="trust" className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(0,122,30,0.03),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Dipercayai Sejak 2014</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            <span className="text-white">Dipercayai Penyokong PAS</span>
            <br />
            <span className="text-gradient">Seluruh Malaysia</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
            Lebih satu dekad menyantuni penyokong PAS dari seluruh pelusuk Malaysia. Ini bukan sekadar bisnes — ini perjuangan bersama.
          </p>
        </motion.div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="text-gradient font-black text-3xl md:text-4xl leading-tight">{s.value}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Masonry-style photo grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
              className="break-inside-avoid rounded-xl overflow-hidden border border-white/8 hover:border-green-400/25 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt="Dipercayai penyokong PAS"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
