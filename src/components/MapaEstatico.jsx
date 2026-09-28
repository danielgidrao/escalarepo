// Mapa estático desenhado em SVG — substitui um tile real no protótipo.
export default function MapaEstatico({ label }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-[#eef0ea]">
      <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect x="40" y="30" width="150" height="110" rx="6" fill="#dfe8d3" />
        <rect x="470" y="220" width="140" height="120" rx="6" fill="#dfe8d3" />
        <path d="M0 250 C 160 230, 260 300, 640 270" stroke="#cfe0ef" strokeWidth="26" fill="none" />
        <g stroke="#ffffff" strokeLinecap="round">
          <path d="M0 180 H640" strokeWidth="18" />
          <path d="M320 0 V360" strokeWidth="18" />
          <path d="M0 80 H640 M0 320 H640 M120 0 V360 M520 0 V360" strokeWidth="9" />
          <path d="M210 0 L420 360 M60 360 L260 0" strokeWidth="7" />
        </g>
        <path d="M0 180 H640 M320 0 V360" stroke="#f6d77c" strokeWidth="4" />
      </svg>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="mb-2 rounded-full bg-canvas px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap shadow-float">{label}</span>
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-float ring-4 ring-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 6v12M6 12h12" />
          </svg>
        </span>
      </div>
    </div>
  )
}
