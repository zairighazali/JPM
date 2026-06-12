import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ICONS = {
  box: (
    // Kotak — pre-order
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  clock: (
    // Jam — pos out
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  truck: (
    // Lori — penghantaran
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-16 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Buat Tempahan</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            <span className="text-gradient-hero">Sedia untuk</span>
            <br />
            <span className="text-white">Memesan?</span>
          </h2>
          <p className="text-white/40 text-xl leading-relaxed max-w-xl mx-auto mb-12">
            Tempah sekarang melalui TikTok, atau hubungi kami untuk sebut harga dan panduan saiz percuma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.a
              href="https://vt.tiktok.com/ZS9j6F1hV2nSF-4PYIU/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#007A1E] via-[#00A828] to-[#00C83A] text-white font-bold rounded-full text-base tracking-wide glow-sm hover:shadow-[0_0_60px_rgba(0,200,58,0.5)] transition-shadow duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              Tempah Sekarang
            </motion.a>
            <motion.a
              href="mailto:hello.kalerland@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/10 text-white/70 hover:text-white hover:border-green-400/30 font-medium rounded-full text-base transition-all duration-300"
            >
              Email Kami
            </motion.a>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: 'box', label: 'Pre-Order', val: '22 – 30 Jun' },
              { icon: 'clock', label: 'Pos Out', val: '8 – 11 Julai' },
              { icon: 'truck', label: 'Penghantaran', val: 'Seluruh Malaysia' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-green-400/15 to-green-600/5 border border-green-400/20 flex items-center justify-center text-green-400 mb-3">
                  {ICONS[item.icon]}
                </div>
                <div className="text-white/30 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-white font-bold">{item.val}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
