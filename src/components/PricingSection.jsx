import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PLATFORMS = [
  {
    key: 'tiktok',
    name: 'TikTok Shop',
    badge: 'HARGA TERBAIK',
    badgeIcon: <img src="/assets/icon/harga-terbaik.png" alt="" className="w-4 h-4 object-contain"  />,
    link: 'https://vt.tiktok.com/ZS9j6F1hV2nSF-4PYIU/',
    color: { border: 'tiktok', glow: '', badge: '', text: 'text-[#00f2ea]', sesuai: 'bg-[#00f2ea]/10 border-[#00f2ea]/20' },
    icon: <img src="/assets/icon/tiktok.png" alt="TikTok" className="w-12 h-12 object-contain"  />,
    pros: ['Flash Sale & voucher harian', 'Harga promosi semasa live', 'Diskaun shipping fee', 'Checkout pantas'],
    cons: ['Tidak boleh pre-order', 'Tiada jualan borong'],
    sesuaiIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
      </svg>
    ),
    sesuai: 'Pembelian segera 1-5 helai',
  },
  {
    key: 'shopee',
    name: 'Shopee',
    badge: 'PILIHAN POPULAR',
    badgeIcon: <img src="/assets/icon/pilihan-popular.png" alt="" className="w-4 h-4 object-contain brightness-0 invert"  />,
    link: 'https://my.shp.ee/2cf7pJMZ',
    color: { border: '#f97316', glow: 'rgba(249,115,22,0.18)', badge: 'bg-[#f97316]', text: 'text-[#f97316]', sesuai: 'bg-[#f97316]/10 border-[#f97316]/20' },
    icon: <img src="/assets/icon/shopee.png" alt="Shopee" className="w-12 h-12 object-contain"  />,
    pros: ['Banyak voucher & cashback', 'Diskaun shipping fee', 'Buy More Save More', 'Boleh pre-order'],
    cons: ['Tiada jualan borong', 'Tempahan khas terhad'],
    sesuaiIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      </svg>
    ),
    sesuai: 'Pembelian individu & keluarga',
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    badge: 'BORONG & CUSTOM',
    badgeIcon: <img src="/assets/icon/borong-custom.png" alt="" className="w-4 h-4 object-contain brightness-0 invert"  />,
    link: 'https://wa.me/60182255865',
    color: { border: '#22c55e', glow: 'rgba(34,197,94,0.18)', badge: 'bg-[#22c55e]', text: 'text-[#22c55e]', sesuai: 'bg-[#22c55e]/10 border-[#22c55e]/20' },
    icon: <img src="/assets/icon/whatsapp.png" alt="WhatsApp" className="w-12 h-12 object-contain"  />,
    pros: ['Harga borong', 'Tempahan pasukan & organisasi', 'Boleh tambah nama / kawasan', 'Boleh pre-order', 'Free shipping seluruh Malaysia kecuali Sabah & Sarawak'],
    cons: ['Perlu berurusan dengan admin', 'Tiada checkout automatik'],
    sesuaiIcon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
      </svg>
    ),
    sesuai: 'Sekolah, NGO, surau, masjid & cawangan PAS',
  },
]

const TRUST_BADGES = [
  {
    icon: <img src="/assets/icon/100-original.png" alt="" className="w-10 h-10 object-contain"  />,
    title: '100% ORIGINAL',
    desc: 'Jaminan kualiti',
  },
  {
    icon: <img src="/assets/icon/kualiti-terjamin.png" alt="" className="w-10 h-10 object-contain"  />,
    title: 'KUALITI TERJAMIN',
    desc: 'Bahan premium & selesa',
  },
  {
    icon: <img src="/assets/icon/servis-terbaik.png" alt="" className="w-10 h-10 object-contain"  />,
    title: 'SERVIS TERBAIK',
    desc: 'Kami sedia membantu',
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-16 md:py-28 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">CARA PEMBELIAN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            <span className="text-white">Pilih Cara Pembelian</span>
            <br />
            <span className="text-white">Yang Sesuai Untuk Anda</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Setiap platform mempunyai kelebihan tersendiri.<br />
            Pilih mengikut keperluan anda.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col rounded-2xl p-6 bg-white/[0.03] transition-all duration-300"
              style={p.key === 'tiktok'
                ? { border: '1.5px solid transparent', backgroundClip: 'padding-box', boxShadow: '0 0 0 1.5px transparent, 0 0 35px rgba(0,242,234,0.15), 0 0 35px rgba(255,0,80,0.10)', outline: '1.5px solid', outlineColor: 'transparent', background: 'linear-gradient(#080809, #080809) padding-box, linear-gradient(135deg, #00f2ea, #ff0050) border-box' }
                : { borderWidth: '1.5px', borderStyle: 'solid', borderColor: `${p.color.border}40`, boxShadow: `0 0 30px ${p.color.glow}` }
              }
            >
              {/* Badge */}
              {p.key === 'tiktok' ? (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-black tracking-wider"
                  style={{ background: 'linear-gradient(135deg, #00c8c8, #ff0050)' }}>
                  <span>{p.badgeIcon}</span>
                  {p.badge}
                </div>
              ) : (
                <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-black tracking-wider ${p.color.badge}`}>
                  <span>{p.badgeIcon}</span>
                  {p.badge}
                </div>
              )}

              {/* Icon + Name */}
              <div className="mb-5 mt-1">
                <div className="mb-3">{p.icon}</div>
                <h3 className="text-white font-black text-2xl">{p.name}</h3>
              </div>

              {/* Pros */}
              <ul className="space-y-2 mb-4 flex-1">
                {p.pros.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Cons */}
              {p.cons.length > 0 && (
                <ul className="space-y-2 mb-4 pt-3 border-t border-white/8">
                  {p.cons.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/40">
                      <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Sesuai untuk */}
              <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border mb-5 ${p.color.sesuai}`}>
                <span className={`shrink-0 mt-0.5 ${p.color.text}`}>{p.sesuaiIcon}</span>
                <div className="text-sm">
                  <span className={`font-bold ${p.color.text}`}>Sesuai untuk: </span>
                  <span className="text-white/60">{p.sesuai}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-center transition-opacity hover:opacity-80"
                style={p.key === 'tiktok' ? {
                  background: 'linear-gradient(135deg, #00f2ea, #ff0050)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {}}
              >
                <span className={p.key !== 'tiktok' ? p.color.text : ''}>Beli sekarang →</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Trust badges — no frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {TRUST_BADGES.map((b) => (
            <div key={b.title} className="flex items-center gap-4 px-10 py-5 flex-1 justify-center">
              <span className="text-white/40">{b.icon}</span>
              <div>
                <div className="text-white font-bold text-sm tracking-wide">{b.title}</div>
                <div className="text-white/40 text-xs">{b.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
