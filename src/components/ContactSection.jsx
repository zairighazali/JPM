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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,122,30,0.1),transparent)]" />

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
            Hubungi kami sekarang melalui WhatsApp untuk mendapatkan sebut harga dan panduan saiz percuma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.a
              href="https://wa.me/60182255865?text=Saya%20berminat%20untuk%20menempah%20Jersey%20PAS%20PRU16"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#007A1E] via-[#00A828] to-[#00C83A] text-white font-bold rounded-full text-base tracking-wide glow-sm hover:shadow-[0_0_60px_rgba(0,200,58,0.5)] transition-shadow duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Kami
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
