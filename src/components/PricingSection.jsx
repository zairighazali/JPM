import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function ShopeeIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#EE4D2D" />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="white" fontWeight="bold">S</text>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

const PLATFORMS = [
  {
    key: 'shopee',
    name: 'Shopee',
    icon: <ShopeeIcon />,
    iconBg: 'bg-orange-500/20 border-orange-500/30',
    iconColor: 'text-orange-400',
    price: 'RM 37.00',
    link: 'https://my.shp.ee/hQApxCZV',
    pros: ['Ada discount', 'Discount shipping fee', 'Buy more save more'],
    cons: ['Tiada jualan borong'],
    highlight: false,
    badge: null,
  },
  {
    key: 'tiktok',
    name: 'TikTok Shop',
    icon: <TikTokIcon />,
    iconBg: 'bg-white/10 border-white/15',
    iconColor: 'text-white',
    price: 'RM 35.00',
    link: 'https://vt.tiktok.com/ZS9j6F1hV2nSF-4PYIU/',
    pros: ['Ada live flash sale', 'Ada discount', 'Discount shipping fee'],
    cons: ['Tiada jualan borong'],
    highlight: false,
    badge: 'Harga Terendah',
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    icon: <WhatsAppIcon />,
    iconBg: 'bg-green-500/20 border-green-500/30',
    iconColor: 'text-green-400',
    price: 'RM 39.00',
    link: 'https://wa.me/60182255865',
    pros: [
      'Harga terendah (borong)',
      'Ada jualan borong',
      'Boleh pre order',
      'Tambah nama kawasan',
      'Free shipping RM2,000 ke atas',
    ],
    cons: [],
    highlight: true,
    badge: 'Terbaik Borong',
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-16 md:py-28 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Harga & Platform</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Pilih Cara </span>
            <span className="text-gradient">Beli Sekarang</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Kami ada di 3 platform. Bandingkan dan pilih yang paling sesuai untuk anda.
          </p>
        </motion.div>

        {/* Price chart image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="max-w-3xl mx-auto mb-14 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <img
            src="/assets/price.jpg"
            alt="Carta Harga Jersey PAS"
            className="w-full object-contain"
            draggable={false}
          />
        </motion.div>

        {/* Platform comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Beli Di <span className="text-gradient">Mana?</span>
          </h3>
          <p className="text-white/35 text-sm mt-2">Perbandingan platform untuk membantu pilihan anda</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                p.highlight
                  ? 'border-green-400/50 shadow-[0_0_40px_rgba(0,200,58,0.15)]'
                  : 'glass-card border-white/8'
              }`}
              style={p.highlight ? {
                background: 'linear-gradient(160deg, rgba(0,168,40,0.12), rgba(0,80,20,0.06))',
              } : {}}
            >
              {/* Badge */}
              {p.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full whitespace-nowrap ${
                  p.highlight
                    ? 'bg-gradient-to-r from-[#007A1E] to-[#00C83A] text-white'
                    : 'bg-white/10 text-white/60'
                }`}>
                  {p.badge}
                </div>
              )}

              {/* Platform header */}
              <div className="flex items-center gap-3 mb-5 mt-1">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${p.iconBg} ${p.iconColor}`}>
                  {p.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-base">{p.name}</div>
                  <div className={`text-xl font-black mt-0.5 ${p.highlight ? 'text-gradient' : 'text-white/80'}`}>
                    {p.price}
                  </div>
                </div>
              </div>

              {/* Pros */}
              <ul className="space-y-2 mb-4">
                {p.pros.map((pro, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-green-400 font-bold shrink-0 mt-0.5">✅</span>
                    {pro}
                  </li>
                ))}
                {p.cons.map((con, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/40">
                    <span className="shrink-0 mt-0.5">❌</span>
                    {con}
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  p.highlight
                    ? 'bg-gradient-to-r from-[#007A1E] via-[#00A828] to-[#00C83A] text-white hover:shadow-[0_0_30px_rgba(0,200,58,0.4)]'
                    : 'border border-white/15 text-white/70 hover:text-white hover:border-white/30 glass'
                }`}
              >
                <span className={p.iconColor}>{p.icon}</span>
                Beli di {p.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
