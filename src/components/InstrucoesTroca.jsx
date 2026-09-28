import { getHospital } from '../data/mock'

// Instruções escritas por quem publicou: cada linha vira um passo numerado.
export default function InstrucoesTroca({ plantao, compacto }) {
  const passos = (plantao.instrucoesTroca ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  if (!passos.length) return null

  return (
    <div className={compacto ? '' : 'rounded-md border border-hairline p-5 md:p-6'}>
      {!compacto && (
        <>
          <h2 className="text-[21px] font-bold">Como fazer a troca</h2>
          <p className="mt-1 text-sm text-muted">
            Regras do {getHospital(plantao.hospitalId).nome}, escritas por quem publicou
          </p>
        </>
      )}
      <ol className={compacto ? 'space-y-2.5' : 'mt-5 space-y-4'}>
        {passos.map((passo, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
              {i + 1}
            </span>
            <span className="pt-0.5 text-sm leading-relaxed text-body">{passo}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
