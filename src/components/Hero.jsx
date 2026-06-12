import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIEWS = [
  { key: 'front', label: 'Depan',    src: '/assets/close-up-front.JPG' },
  { key: 'side',  label: 'Tepi',     src: '/assets/close-up-side.jpg'  },
  { key: 'back',  label: 'Belakang', src: '/assets/close-up-back.JPG'  },
]

// Tempoh pre-order: 22 Jun – 30 Jun 2026
const PREORDER_OPEN  = new Date('2026-06-22T00:00:00')
const PREORDER_CLOSE = new Date('2026-06-30T23:59:59')

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [phase, setPhase] = useState('before') // before | open | closed

  useEffect(() => {
    function calc() {
      const now = Date.now()
      const newPhase = now < PREORDER_OPEN ? 'before' : now <= PREORDER_CLOSE ? 'open' : 'closed'
      setPhase(newPhase)
      const target = newPhase === 'before' ? PREORDER_OPEN : PREORDER_CLOSE
      const diff = Math.max(0, target - now)
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const units = [
    { val: pad(time.d), label: 'Hari' },
    { val: pad(time.h), label: 'Jam' },
    { val: pad(time.m), label: 'Minit' },
    { val: pad(time.s), label: 'Saat' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-[10px] tracking-[0.28em] uppercase text-white/30 font-medium">
        {phase === 'before' ? 'Pre-order dibuka dalam' : phase === 'open' ? 'Pre-order tutup dalam' : 'Pre-order telah ditutup'}
      </span>
      <div className="flex items-center gap-1">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1">
            <div className="flex flex-col items-center">
              <div className="glass border border-white/8 rounded-lg px-2.5 py-1.5 min-w-[44px] text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={u.val}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block text-lg font-black text-white tabular-nums leading-none"
                  >
                    {u.val}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[9px] text-white/25 mt-1 tracking-widest uppercase">{u.label}</span>
            </div>
            {i < 3 && (
              <span className="text-white/20 font-bold text-lg mb-4 select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ParticleField() {
  const pts = Array.from({ length: 22 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, delay: Math.random() * 5, dur: Math.random() * 9 + 6,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-slate-300"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.1 }}
          animate={{ y: [0, -22, 0], opacity: [0.05, 0.25, 0.05] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

const ZOOM = 2.5

function ZoomImage({ src, alt }) {
  const imgRef = useRef(null)
  const containerRef = useRef(null)
  const [lens, setLens] = useState(null)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  const lensSize = isTouch ? 110 : 150

  function getPos(clientX, clientY) {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return null
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
    return { x, y, px: clientX - rect.left, py: clientY - rect.top }
  }

  // Native touch listeners with passive:false so we can e.preventDefault()
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onStart = (e) => { e.preventDefault(); const t = e.touches[0]; setLens(getPos(t.clientX, t.clientY)) }
    const onMove  = (e) => { e.preventDefault(); const t = e.touches[0]; setLens(getPos(t.clientX, t.clientY)) }
    const onEnd   = () => setLens(null)
    el.addEventListener('touchstart', onStart, { passive: false })
    el.addEventListener('touchmove',  onMove,  { passive: false })
    el.addEventListener('touchend',   onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [])

  const half = lensSize / 2
  const imgW = imgRef.current?.getBoundingClientRect().width  || 0
  const imgH = imgRef.current?.getBoundingClientRect().height || 0
  const bgX  = lens ? -(lens.x * imgW * ZOOM - half) : 0
  const bgY  = lens ? -(lens.y * imgH * ZOOM - half) : 0

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ cursor: lens ? 'crosshair' : 'zoom-in', touchAction: 'none' }}
      onMouseMove={(e) => setLens(getPos(e.clientX, e.clientY))}
      onMouseLeave={() => setLens(null)}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full object-cover block"
        style={{ maxHeight: 'min(70vh, 540px)', objectPosition: 'top' }}
        draggable={false}
      />

      {lens && imgRef.current && (
        <div
          className="absolute pointer-events-none rounded-full overflow-hidden"
          style={{
            width: lensSize, height: lensSize,
            left: lens.px - half, top: lens.py - half,
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgW * ZOOM}px ${imgH * ZOOM}px`,
            backgroundPosition: `${bgX}px ${bgY}px`,
            boxShadow: '0 0 0 2px rgba(0,200,58,0.5), 0 8px 32px rgba(0,0,0,0.9)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-3 bg-green-400/60" />
            <div className="absolute w-3 h-px bg-green-400/60" />
          </div>
        </div>
      )}

      {!lens && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {isTouch ? 'Sentuh & gerak untuk zum' : 'Gerak tetikus untuk zum'}
          </span>
        </div>
      )}
    </div>
  )
}

function CloseUpModal({ view, setView, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {view && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-3"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/88 backdrop-blur-lg" />

          {/* Close button — fixed top-right, never part of card flow */}
          <button
            onClick={onClose}
            className="fixed z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-sm backdrop-blur-sm"
            style={{ top: 'max(14px, env(safe-area-inset-top, 14px))', right: '14px' }}
          >
            ✕
          </button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full"
            style={{ maxWidth: '440px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Image */}
              <div className="relative overflow-hidden">
                <ZoomImage src={view.src} alt={`Close-up ${view.label}`} />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 pointer-events-none">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-green-400/70 font-medium">Pandangan</span>
                  <div className="text-white font-bold text-lg leading-tight">{view.label}</div>
                </div>
              </div>

              {/* Nav buttons */}
              <div className="flex gap-2 px-4 py-3 bg-black/40">
                {VIEWS.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setView(v)}
                    className={`flex-1 text-xs py-2.5 rounded-xl border transition-all ${
                      view.key === v.key
                        ? 'bg-green-400/15 border-green-400/50 text-green-400'
                        : 'border-white/10 text-white/40 active:bg-white/5'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const MEDIA = [
  { key: 'promo', label: 'Promo', type: 'video', src: '/assets/promo-cinematic.mp4', thumb: '/assets/model-front.jpg', closeUp: VIEWS[0], sublabel: 'Edisi Terhad', title: 'Jersey PAS PRU16' },
  // Disembunyikan buat sementara — buka semula bila perlu video 360°
  // { key: '360',   label: '360°',  type: 'video', src: '/assets/video-promo.mp4',     thumb: '/assets/model-side.jpg',  closeUp: VIEWS[0], sublabel: 'Pusingan Penuh',   title: 'Pandangan 360°' },
]

const TRUST = [
  'Pre-order 22 – 30 Jun',
  'Pos out 8 – 11 Julai',
  'Penghantaran seluruh Malaysia',
]

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

export default function Hero() {
  const videoRef = useRef(null)
  const [media, setMedia] = useState(MEDIA[0])
  const [activeView, setActiveView] = useState(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [media])

  return (
    <section className="relative overflow-hidden">
      {/* ── Background: metallic global + aksen hijau ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(0,120,30,0.02),transparent)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_60%_at_85%_60%,rgba(0,168,40,0.02),transparent)]" />

      {/* Watermark streetwear gergasi */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="text-outline-chrome font-black uppercase whitespace-nowrap leading-none text-center"
          style={{ fontSize: 'clamp(120px, 22vw, 320px)', letterSpacing: '-0.02em' }}>
          PRU16
        </div>
      </div>


      <ParticleField />

      <div className="relative z-10 min-h-[100svh] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12
        flex flex-col items-center justify-center gap-8
        lg:flex-row lg:items-center lg:gap-16">

        {/* ── LEFT: Copy + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl order-2 lg:order-1"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/85 tracking-[0.22em] uppercase font-semibold whitespace-nowrap">
              Edisi PRU16 · Stok Terhad
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05]">
            <span className="text-gradient-hero">Jersey PAS</span>
            <br />
            <span className="text-white">Edisi PRU16</span>
          </h1>

          <p className="text-white/45 text-base sm:text-lg leading-relaxed mt-5 max-w-md">
            Sublimasi premium yang tak pudar, Microfiber Minimesh 160gsm sejuk dipakai.
            Saiz S hingga 5XL — sedia dihantar ke seluruh Malaysia.
          </p>

          {/* CTA + price anchor */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-8">
            <motion.a
              href="https://vt.tiktok.com/ZS9j6F1hV2nSF-4PYIU/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#007A1E] via-[#00A828] to-[#00C83A] text-white font-bold rounded-full text-base tracking-wide glow-sm hover:shadow-[0_0_50px_rgba(0,200,58,0.45)] transition-shadow duration-300"
            >
              <TikTokIcon />
              Pesan Sekarang
            </motion.a>
            <div className="flex flex-col items-center sm:items-start leading-tight">
              <span className="text-white/30 text-[11px] uppercase tracking-widest">Mulai dari</span>
              <span className="text-gradient font-black text-2xl">RM 35</span>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-7">
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-white/40 text-xs sm:text-sm">
                <CheckIcon />
                {t}
              </div>
            ))}
          </div>

          {/* Divider + Countdown */}
          <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent my-7" />
          <Countdown />
        </motion.div>

        {/* ── RIGHT: Media showcase ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center shrink-0 order-1 lg:order-2"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[560px] h-[560px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(220,226,238,0.04) 0%, transparent 68%)' }} />
          </div>

          {/* Media card */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/8"
            style={{
              width: 'clamp(260px, 80vw, 400px)',
              aspectRatio: '3/4',
              maxHeight: 'min(62svh, 560px)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.7), 0 12px 36px rgba(0,0,0,0.8)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={media.key}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {media.type === 'video' ? (
                  <video ref={videoRef} src={media.src}
                    autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={media.src} alt={`Jersey PAS — ${media.label}`}
                    className="w-full h-full object-cover" draggable={false} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Cinematic edge fades */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Zoom close-up button — disimpan untuk kegunaan akan datang, un-comment untuk aktifkan semula */}
            {/*
            <button
              onClick={() => setActiveView(media.closeUp)}
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 glass border border-white/15 rounded-full px-3.5 py-2 text-[11px] font-semibold text-white/75 hover:text-green-400 hover:border-green-400/40 transition-all backdrop-blur-md"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zM10.5 7.5v6m3-3h-6" />
              </svg>
              Zum Detail
            </button>
            */}

            {/* Label */}
            <div className="absolute bottom-4 left-5 pointer-events-none">
              <span className="text-[10px] tracking-[0.25em] uppercase text-green-400/80 font-medium">
                {media.sublabel}
              </span>
              <div className="text-white font-bold text-lg leading-tight">
                {media.title}
              </div>
            </div>
          </div>

          {/* Thumbnail switcher — auto-tersembunyi bila hanya satu media; muncul semula bila entri 360° di-uncomment */}
          {MEDIA.length > 1 && (
          <div className="flex items-center gap-2.5 mt-4">
            {MEDIA.map((m) => (
              <motion.button
                key={m.key}
                onClick={() => setMedia(m)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border transition-all duration-200 ${
                  media.key === m.key
                    ? 'border-green-400/70 shadow-[0_0_20px_rgba(0,200,58,0.3)]'
                    : 'border-white/10 opacity-55 hover:opacity-90'
                }`}
              >
                <img src={m.thumb} alt={m.label} className="w-full h-full object-cover object-top" draggable={false} />
                {m.type === 'video' && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <svg className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
                <span className="absolute bottom-0 left-0 right-0 text-[8px] font-semibold uppercase tracking-wider text-white/90 bg-black/55 py-0.5 text-center">
                  {m.label}
                </span>
              </motion.button>
            ))}
          </div>
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#product"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-1 text-white/25 hover:text-green-400/70 transition-colors"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Skrol</span>
        <motion.svg
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.a>

      {/* Close-up Modal */}
      <CloseUpModal view={activeView} setView={setActiveView} onClose={() => setActiveView(null)} />
    </section>
  )
}
