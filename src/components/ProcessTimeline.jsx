import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ICONS = {
  bulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  cog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
}

const steps = [
  {
    num: '01',
    date: '22 JUN – 30 JUN',
    title: 'Pre-Order Dibuka',
    desc: 'Tempahan dibuka selama 9 hari sahaja — countdown berakhir 30 Jun.',
    notes: ['Menerima tempahan mengikut kuota yang telah ditetapkan.'],
    icon: 'bulb',
  },
  {
    num: '02',
    date: '30 JUN',
    title: 'Tutup Order & Semakan Tempahan',
    desc: 'Tempahan ditutup. Semua detail tempahan dan status bayaran disemak dan disusun.',
    notes: [],
    icon: 'clipboard',
  },
  {
    num: '03',
    date: '1 JULAI',
    title: 'Proses Pembuatan Bermula',
    desc: 'Cetakan sublimasi dan jahitan bermula untuk semua tempahan yang disahkan.',
    notes: [],
    icon: 'cog',
  },
  {
    num: '04',
    date: '7 JULAI',
    title: 'QC Produk',
    desc: 'Setiap helai diperiksa satu persatu — kualiti cetakan, jahitan dan ketepatan saiz.',
    notes: [],
    icon: 'shield',
  },
  {
    num: '05',
    date: '8 – 11 JULAI',
    title: 'Pos Out',
    desc: 'Semua tempahan dipos keluar berperingkat ke seluruh Malaysia.',
    notes: ['Nombor tracking dihantar terus ke WhatsApp anda.'],
    icon: 'truck',
  },
]

export default function ProcessTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const infoRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })


  return (
    <section id="proses" className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,122,30,0.02),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Timeline Proses</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            <span className="text-white">Timeline</span>{' '}
            <span className="text-gradient">Pre-Order</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Proses telus dan tersusun — dari tempahan dibuka hingga jersey sampai ke pintu rumah anda.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-bold">Kuota Terhad</span>
            <span className="text-white/30 text-sm">· tempahan mengikut kuota yang ditetapkan</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="w-full h-full bg-gradient-to-b from-green-400/60 via-green-400/20 to-transparent origin-top"
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`flex-1 pb-2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card rounded-2xl p-6 hover:border-green-400/20 transition-all duration-300 hover:-translate-y-1">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-4xl font-black leading-none select-none text-gradient" style={{ opacity: 0.9 }}>
                        {step.num}
                      </span>
                      <span className="glass border border-green-400/20 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.15em] text-green-400/90 whitespace-nowrap">
                        {step.date}
                      </span>
                    </div>

                    <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                      <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>

                      {step.notes.length > 0 && (
                        <ul className={`mt-3 space-y-1.5 ${i % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                          {step.notes.map((n) => (
                            <li key={n} className={`flex items-start gap-2 text-white/35 text-xs leading-relaxed ${i % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                              <span className="mt-1.5 w-3 h-px bg-green-400/50 shrink-0" />
                              {n}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center icon node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007A1E] to-[#00C83A] flex items-center justify-center text-white shadow-lg glow-sm z-10"
                  >
                    {ICONS[step.icon]}
                  </motion.div>
                </div>

                {/* Empty space for opposite side on desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
