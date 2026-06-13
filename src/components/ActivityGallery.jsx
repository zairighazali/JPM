import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const PHOTOS = [
  { src: '/assets/section-3/perarakan.jpg' },
  { src: '/assets/section-3/booth-3.JPG' },
  { src: '/assets/section-3/booth-4.JPG' },
  { src: '/assets/section-3/booth-16.JPG' },
  { src: '/assets/section-3/booth-5.JPG' },
  { src: '/assets/section-3/booth-6.JPG' },
  { src: '/assets/section-3/booth-7.JPG' },
  { src: '/assets/section-3/booth-8.JPG' },
  { src: '/assets/section-3/booth-9.JPG' },
  { src: '/assets/section-3/booth-10.JPG' },
  { src: '/assets/section-3/booth-12.JPG' },
  { src: '/assets/section-3/booth-2.JPG' },
  { src: '/assets/section-3/booth-13.JPG' },
  { src: '/assets/section-3/booth-14.JPG' },
  { src: '/assets/section-3/booth-15.JPG' },
  
  
]

export default function ActivityGallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="galeri" className="py-16 md:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Galeri Aktiviti</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            <span className="text-white">Turun Padang Bersama</span>
            <br />
            <span className="text-gradient">Penyokong PAS</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Dari ceramah ke perhimpunan, dari booth ke perarakan — kami ada bersama anda di setiap langkah perjuangan.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.6 }}
              className="break-inside-avoid rounded-xl overflow-hidden border border-white/8 hover:border-green-400/30 transition-all duration-300 group cursor-pointer"
              onClick={() => setLightbox(photo)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt="Aktiviti jualan PAS"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <button
              onClick={() => setLightbox(null)}
              className="fixed z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 hover:text-white text-sm"
              style={{ top: 'max(14px, env(safe-area-inset-top, 14px))', right: '14px' }}
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt="Aktiviti jualan PAS"
                className="w-full rounded-2xl object-contain max-h-[80vh]"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
