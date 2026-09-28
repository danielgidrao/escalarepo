import { Link } from 'react-router-dom'

// Marca: folha de calendário (o plantão) com setas de troca.
export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="4" width="28" height="26" rx="8" fill="currentColor" />
      <rect x="9" y="1.5" width="3" height="6" rx="1.5" fill="currentColor" stroke="#fff" strokeWidth="1.5" />
      <rect x="20" y="1.5" width="3" height="6" rx="1.5" fill="currentColor" stroke="#fff" strokeWidth="1.5" />
      <path
        d="M9 14.5h13m-3.5-3.5 3.5 3.5-3.5 3.5M23 22.5H10m3.5-3.5L10 22.5l3.5 3.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo() {
  return (
    <Link to="/" aria-label="Escala — início" className="flex items-center gap-2 text-primary">
      <LogoMark size={34} />
      <span className="text-[23px] leading-none font-bold tracking-[-0.6px]">escala</span>
    </Link>
  )
}
