import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PLATFORMS = [
  {
    key: 'tiktok',
    name: 'TikTok Shop',
    badge: 'Harga Terendah',
    link: 'https://vt.tiktok.com/ZS9j6F1hV2nSF-4PYIU/',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    iconColor: 'text-white',
    highlight: false,
    pros: ['Ada live flash sale', 'Ada discount', 'Discount shipping fee'],
    cons: ['Tiada jualan borong'],
  },
  {
    key: 'shopee',
    name: 'Shopee',
    badge: 'Pilihan Popular',
    link: 'https://my.shp.ee/hQApxCZV',
    icon: <img src="/assets/shopee-icon.svg" alt="Shopee" className="w-10 h-10" />,
    iconColor: '',
    highlight: false,
    pros: ['Ada discount', 'Discount shipping fee', 'Buy more save more'],
    cons: ['Tiada jualan borong'],
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    badge: 'Harga Borong',
    link: 'https://wa.me/60182255865',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
    iconColor: 'text-green-400',
    highlight: true,
    pros: [
      'Harga terendah',
      'Ada jualan borong',
      'Boleh pre order',
      'Add on nama kawasan',
      'Free shipping RM2000 ke atas',
    ],
    cons: [],
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-16 md:py-28 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Cara Pembelian</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Beli </span>
            <span className="text-gradient">Di Mana?</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Pilih platform yang paling sesuai untuk anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.key}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative flex flex-col rounded-2xl p-6 pt-8 border transition-all duration-300 ${
                p.highlight
                  ? 'border-green-400/40 shadow-[0_0_40px_rgba(0,200,58,0.12)]'
                  : 'glass-card border-white/8 hover:border-white/20'
              }`}
              style={p.highlight ? {
                background: 'linear-gradient(160deg, rgba(0,168,40,0.10), rgba(0,80,20,0.05))',
              } : {}}
            >
              {/* Diagonal ribbon badge — top-right corner, extends outside card */}
              <div className={`absolute top-6 right-[-28px] w-[130px] text-center text-[9px] font-black tracking-[0.1em] uppercase py-1.5 rotate-45 origin-center pointer-events-none z-10 ${
                p.highlight
                  ? 'bg-green-400 text-black'
                  : 'bg-white/20 text-white/80'
              }`}>
                {p.badge}
              </div>

              {/* Icon */}
              <div className={`flex items-center justify-center mb-4 ${p.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                {p.icon}
              </div>

              {/* Name */}
              <div className="text-white font-black text-xl mb-4 text-center">{p.name}</div>

              {/* Pros */}
              <ul className="space-y-2 mb-3 flex-1">
                {p.pros.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Cons */}
              {p.cons.length > 0 && (
                <ul className="space-y-1.5 mt-auto pt-3 border-t border-white/6">
                  {p.cons.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/30">
                      <span className="text-red-400/60 mt-0.5 shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Arrow */}
              <div className={`mt-5 text-sm font-medium text-center transition-colors ${p.highlight ? 'text-green-400/70 group-hover:text-green-400' : 'text-white/30 group-hover:text-white/60'}`}>
                Beli sekarang →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
