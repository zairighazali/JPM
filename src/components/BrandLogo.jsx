// Lambang bulan purnama PAS dirender sebagai SVG supaya tajam pada semua saiz,
// dibalut ring gradient + glow — lebih kemas daripada crop imej flag mentah.
export default function BrandLogo({ compact = false }) {
  return (
    <a href="#" className="flex items-center gap-3 group" aria-label="Jersey PAS Malaysia">
      <span className="relative inline-flex">
        {/* Glow halo */}
        <span className="absolute inset-0 rounded-full bg-green-400/25 blur-lg scale-110 group-hover:bg-green-400/40 transition-colors duration-300" />

        {/* Gradient ring */}
        <span
          className="relative w-10 h-10 rounded-full p-[2px] shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          style={{ background: 'conic-gradient(from 210deg, #00E060, #007A1E 35%, #003D0F 60%, #00C83A 85%, #00E060)' }}
        >
          {/* Emblem: bulan purnama putih atas hijau */}
          <svg viewBox="0 0 40 40" className="w-full h-full rounded-full block">
            <defs>
              <radialGradient id="pasDisc" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#00A828" />
                <stop offset="55%" stopColor="#007A1E" />
                <stop offset="100%" stopColor="#004D12" />
              </radialGradient>
              <radialGradient id="pasMoon" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="78%" stopColor="#F4FFF6" />
                <stop offset="100%" stopColor="#D8EEDC" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="20" fill="url(#pasDisc)" />
            {/* Bulan purnama */}
            <circle cx="20" cy="20" r="11.5" fill="url(#pasMoon)" />
            {/* Kilauan atas */}
            <ellipse cx="14" cy="10" rx="10" ry="5.5" fill="rgba(255,255,255,0.18)" />
          </svg>
        </span>
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-[0.18em] text-white uppercase">
            Jersey <span className="text-gradient">PAS</span>
          </span>
          <span className="text-[10px] text-green-400/60 tracking-[0.28em] uppercase mt-1">
            Malaysia · PRU16
          </span>
        </span>
      )}
    </a>
  )
}
