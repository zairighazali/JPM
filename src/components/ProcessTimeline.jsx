import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ImgIcon = ({ src, alt, size = 'w-10 h-10' }) => (
  <img src={src} alt={alt} className={`${size} object-contain`} />
)

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-400">
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
)

const READY_STOCK_STEPS = [
  { icon: <ImgIcon src="/assets/icon/tempahan-disahkan.png" alt="Tempahan Disahkan" />, num: '01', title: 'Tempahan Disahkan', desc: 'Kami sahkan tempahan dan pembayaran anda.' },
  { icon: <ImgIcon src="/assets/icon/packing-pos.png" alt="Packing & Pos" />,           num: '02', title: 'Packing & Pos',     desc: 'Pesanan dipacking dengan teliti dan dihantar.' },
  { icon: <ImgIcon src="/assets/icon/terima-pesanan.png" alt="Terima Pesanan" />,        num: '03', title: 'Terima Pesanan',    desc: 'Pesanan selamat sampai ke tangan anda.' },
]

const PRE_ORDER_STEPS = [
  { icon: <ImgIcon src="/assets/icon/tempahan-disahkan.png" alt="Tempahan Disahkan" />, num: '01', title: 'Tempahan Disahkan', desc: 'Kami sahkan tempahan dan pembayaran anda.' },
  { icon: <ImgIcon src="/assets/icon/produksi-jersey.png" alt="Produksi Jersey" />,     num: '02', title: 'Produksi Jersey',   desc: 'Tempahan masuk ke proses pengeluaran.', note: '(±7 Hari Bekerja)' },
  { icon: <ImgIcon src="/assets/icon/packing-pos.png" alt="Packing & Pos" />,           num: '03', title: 'Packing & Pos',     desc: 'Pesanan dipacking dengan teliti dan dihantar.' },
  { icon: <ImgIcon src="/assets/icon/terima-pesanan.png" alt="Terima Pesanan" />,        num: '04', title: 'Terima Pesanan',    desc: 'Pesanan selamat sampai ke tangan anda.' },
]

function StepItem({ icon, num, title, desc, note, isLast }) {
  return (
    <div className="flex flex-col">
      {/* Icon | Number | Information */}
      <div className="flex items-start gap-3">
        {/* Icon — 100% height */}
        <div className="shrink-0 w-16 h-16 rounded-xl bg-[#080809] border border-white/10 flex items-center justify-center">
          {icon}
        </div>
        {/* Number + arrow — 30% height (~h-5) */}
        <div className="shrink-0 w-8 flex flex-col items-center gap-1">
          <div className="w-full h-5 rounded-md border border-green-500/40 bg-green-500/10 flex items-center justify-center text-green-400 font-black text-xs">
            {num}
          </div>
          {/* Arrow down below number */}
          {!isLast && (
            <div className="flex flex-col items-center">
              <span className="w-px h-5 border-l border-dashed border-green-500/40" />
              <svg className="w-3 h-3 text-green-500/60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4l4 4 4-4" />
              </svg>
            </div>
          )}
        </div>
        {/* Information — 70% */}
        <div className="w-[70%] pt-1">
          <div className="text-white font-bold text-base leading-tight">{title}</div>
          <div className="text-white/50 text-sm mt-0.5 leading-relaxed">
            {desc}
            {note && <span className="text-green-400 ml-1">{note}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProcessCard({ headerIcon, title, desc, steps, leadTime, leadTimeIcon, noHeaderFrame, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-5 border border-white/8 hover:border-green-400/20 transition-all duration-300"
    >
      {/* Card header */}
      <div className="flex items-start gap-4">
        {noHeaderFrame
          ? <div className="shrink-0 w-14 h-14 flex items-center justify-center">{headerIcon}</div>
          : <div className="shrink-0 w-14 h-14 rounded-full bg-[#080809] border border-white/10 flex items-center justify-center">{headerIcon}</div>
        }
        <div>
          <h3 className="text-white font-black text-2xl leading-tight">{title}</h3>
          <p className="text-white/50 text-sm mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="w-full h-px bg-white/6" />

      {/* Steps */}
      <div className="flex flex-col gap-4">
        {steps.map((s, i) => (
          <StepItem key={i} {...s} isLast={i === steps.length - 1} />
        ))}
      </div>

      <div className="w-full h-px bg-white/6" />

      {/* Lead time footer */}
      <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-green-500/15">
        <div className="shrink-0 w-10 h-10 rounded-full bg-[#080809] border border-white/10 flex items-center justify-center">
          {leadTimeIcon ?? <ImgIcon src="/assets/icon/terima-pesanan.png" alt="Lead Time" size="w-6 h-6" />}
        </div>
        <div className="text-sm">
          <span className="text-white font-semibold">Lead Time: </span>
          <span className="text-green-400 font-bold">{leadTime}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProcessTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proses" className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,122,30,0.02),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">PROSES TEMPAHAN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Proses </span>
            <span className="text-green-400">Tempahan</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Dari tempahan hingga sampai ke tangan anda.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-6">
          <ProcessCard
            headerIcon={<ImgIcon src="/assets/icon/ready-stock.png" alt="Ready Stock" size="w-14 h-14" />}
            noHeaderFrame
            title="Ready Stock"
            desc="Barang sedia ada dan terus diproses untuk penghantaran."
            steps={READY_STOCK_STEPS}
            leadTime="Pos 1-3 Hari Bekerja"
            delay={0.1}
            inView={inView}
          />
          <ProcessCard
            headerIcon={<ImgIcon src="/assets/icon/packing-pos.png" alt="Pre-Order" size="w-8 h-8" />}
            leadTimeIcon={<IconCalendar />}
            title="Pre-Order"
            desc="Tempahan dibuat khas sebelum dipacking dan dihantar."
            steps={PRE_ORDER_STEPS}
            leadTime="Pos Selepas Produksi Siap (±7 Hari Bekerja)"
            delay={0.25}
            inView={inView}
          />
        </div>
      </div>
    </section>
  )
}
