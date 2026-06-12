import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

const MODELS = [
  {
    key: 'collar-zip',
    name: 'Short Sleeve Collar Zip',
    short: 'Collar Zip',
    desc: 'Polo zip klasik — pilihan utama penyokong',
    prices: {
      asal:    { S: 55, M: 55, L: 55, XL: 55, '2XL': 55, '3XL': 55, '4XL': 58, '5XL': 61 },
      flash:   43,
      landing: 39,
      borong:  30,
    },
  },
  {
    key: 'two-button',
    name: 'Long Sleeve (2 Button)',
    short: '2 Button',
    desc: 'Lengan panjang dengan butang — ringan & selesa',
    prices: {
      asal:    { S: 49, M: 49, L: 49, XL: 49, '2XL': 49, '3XL': 49, '4XL': 52, '5XL': 55 },
      flash:   39,
      landing: 35,
      borong:  26,
    },
  },
  {
    key: 'muslimah',
    name: 'Muslimah',
    short: 'Muslimah',
    desc: 'Potongan labuh & sopan untuk muslimah',
    prices: {
      asal:    { S: 59, M: 59, L: 59, XL: 59, '2XL': 59, '3XL': 59, '4XL': 62, '5XL': 65 },
      flash:   49,
      landing: 45,
      borong:  35,
    },
  },
]

function ringgit(n) {
  return `RM ${n.toFixed(2)}`
}

export default function PricingWizard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [modelKey, setModelKey] = useState(null)
  const [size, setSize] = useState(null)

  const model = MODELS.find((m) => m.key === modelKey)
  const step = !model ? 1 : !size ? 2 : 3

  function reset() {
    setModelKey(null)
    setSize(null)
  }

  const waText = model && size
    ? encodeURIComponent(`Saya berminat untuk menempah Jersey PAS PRU16.\nModel: ${model.name}\nSaiz: ${size}\nHarga Landing Page: ${ringgit(model.prices.landing)}`)
    : ''

  return (
    <section id="pricing" className="py-16 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,122,30,0.02),transparent)]" />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs text-green-400/80 tracking-[0.2em] uppercase font-medium">Harga & Saiz</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Semak</span>{' '}
            <span className="text-gradient">Harga Anda</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Pilih model dan saiz untuk melihat harga istimewa landing page & borong.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/30">
            <span className="w-1 h-1 rounded-full bg-green-400/60" />
            Material: Microfiber Minimesh 160gsm
            <span className="w-1 h-1 rounded-full bg-green-400/60" />
            Saiz S – 5XL
          </div>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {[
            { n: 1, label: 'Model' },
            { n: 2, label: 'Saiz' },
            { n: 3, label: 'Harga' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: step >= s.n ? 'rgba(0,200,58,0.9)' : 'rgba(255,255,255,0.06)',
                    color: step >= s.n ? '#03180a' : 'rgba(255,255,255,0.35)',
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                >
                  {step > s.n ? '✓' : s.n}
                </motion.div>
                <span className={`text-xs tracking-wide hidden sm:inline ${step >= s.n ? 'text-white/80 font-semibold' : 'text-white/25'}`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className={`w-8 sm:w-14 h-px ${step > s.n ? 'bg-green-400/60' : 'bg-white/8'}`} />}
            </div>
          ))}
        </motion.div>

        {/* ── Wizard body ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="glass-card rounded-3xl border-glow p-6 sm:p-10 min-h-[420px]"
        >
          <AnimatePresence mode="wait">

            {/* STEP 1 — pilih model */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-white font-bold text-lg mb-6 text-center">Pilih Model Jersey</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {MODELS.map((m) => (
                    <motion.button
                      key={m.key}
                      onClick={() => setModelKey(m.key)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group glass rounded-2xl p-5 border border-white/8 hover:border-green-400/40 transition-colors duration-300 text-left"
                    >
                      <div className="text-white font-bold text-sm mb-1">{m.name}</div>
                      <div className="text-white/35 text-xs leading-relaxed mb-3">{m.desc}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-white/25 text-xs line-through">{ringgit(m.prices.asal.S)}</span>
                        <span className="text-gradient font-black text-base">dari {ringgit(m.prices.landing)}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — pilih saiz */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center"
              >
                <button onClick={reset} className="self-start text-xs text-white/30 hover:text-green-400 transition-colors mb-4">
                  ← Tukar model
                </button>
                <div className="text-center mb-8">
                  <div className="text-white font-bold text-lg">{model.name}</div>
                  <div className="text-white/35 text-xs mt-1">Microfiber Minimesh 160gsm</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-6">Pilih Saiz</h3>
                <div className="grid grid-cols-4 gap-3">
                  {SIZES.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => setSize(s)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-14 glass rounded-xl flex items-center justify-center text-sm font-bold text-green-400 border border-green-400/15 hover:border-green-400/50 hover:bg-green-400/10 transition-colors"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
                <p className="text-white/25 text-xs mt-6">* Saiz 4XL & 5XL — harga asal sedikit berbeza</p>
              </motion.div>
            )}

            {/* STEP 3 — harga */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => setSize(null)} className="text-xs text-white/30 hover:text-green-400 transition-colors">
                    ← Tukar saiz
                  </button>
                  <button onClick={reset} className="text-xs text-white/30 hover:text-green-400 transition-colors">
                    Mula semula ↺
                  </button>
                </div>

                <div className="text-center mb-8">
                  <div className="text-white font-black text-xl">{model.name}</div>
                  <div className="text-green-400/70 text-sm font-semibold mt-0.5">Saiz {size}</div>
                  <div className="text-white/30 text-xs mt-1">Microfiber Minimesh 160gsm · Edisi PRU16</div>
                </div>

                {/* Price grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {/* Harga asal */}
                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Harga Asal</div>
                    <div className="text-white/35 text-xl font-bold line-through">{ringgit(model.prices.asal[size])}</div>
                  </div>

                  {/* Flash sale */}
                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Flash Sale</div>
                    <div className="text-white/55 text-xl font-bold">{ringgit(model.prices.flash)}</div>
                  </div>

                  {/* Landing page — HIGHLIGHTED */}
                  <motion.div
                    initial={{ scale: 0.94 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, delay: 0.15 }}
                    className="relative rounded-2xl p-4 text-center border border-green-400/50"
                    style={{
                      background: 'linear-gradient(160deg, rgba(0,168,40,0.16), rgba(0,80,20,0.08))',
                      boxShadow: '0 0 40px rgba(0,200,58,0.18)',
                    }}
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#007A1E] to-[#00C83A] text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full whitespace-nowrap">
                      Harga Anda
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-green-400/70 mb-2 mt-1">Landing Page</div>
                    <div className="text-gradient text-2xl font-black">{ringgit(model.prices.landing)}</div>
                    <div className="text-green-400/50 text-[10px] mt-1">
                      Jimat {ringgit(model.prices.asal[size] - model.prices.landing)}
                    </div>
                  </motion.div>

                  {/* Borong — HIGHLIGHTED */}
                  <motion.div
                    initial={{ scale: 0.94 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, delay: 0.25 }}
                    className="relative rounded-2xl p-4 text-center border border-amber-400/40"
                    style={{
                      background: 'linear-gradient(160deg, rgba(251,191,36,0.1), rgba(120,80,10,0.05))',
                      boxShadow: '0 0 36px rgba(251,191,36,0.1)',
                    }}
                  >
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full whitespace-nowrap">
                      Borong 50+
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-amber-400/70 mb-2 mt-1">Harga Borong</div>
                    <div className="text-gradient-gold text-2xl font-black">{ringgit(model.prices.borong)}</div>
                    <div className="text-amber-400/50 text-[10px] mt-1">min. 50 helai</div>
                  </motion.div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.a
                    href={`https://wa.me/60182255865?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#007A1E] via-[#00A828] to-[#00C83A] text-white font-bold rounded-full text-sm tracking-wide glow-sm hover:shadow-[0_0_40px_rgba(0,200,58,0.4)] transition-shadow"
                  >
                    Tempah {model.short} · {size} →
                  </motion.a>
                  <a
                    href="https://wa.me/60182255865?text=Saya%20berminat%20dengan%20harga%20borong%2050%2B%20Jersey%20PAS%20PRU16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-amber-400/30 text-amber-400/80 hover:text-amber-300 hover:border-amber-400/60 font-semibold rounded-full text-sm transition-colors"
                  >
                    Tanya Harga Borong
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
