import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../store'
import { getHospital, formatData, formatValor, duracao } from '../data/mock'
import { CheckIcon, PlusIcon, ChevronDown } from '../components/Icons'
import InstrucoesTroca from '../components/InstrucoesTroca'
import { Avatar, Button, Nota, StatusPill, cx } from '../components/ui'

function MiniData({ data, turno }) {
  const d = formatData(data)
  return (
    <div className={cx('flex w-16 shrink-0 flex-col items-center justify-center rounded-sm py-2', turno === 'Noturno' ? 'bg-ink text-white' : 'bg-surface-soft')}>
      <span className="text-[11px] font-semibold uppercase opacity-70">{d.mes}</span>
      <span className="text-2xl leading-none font-bold">{String(d.dia).padStart(2, '0')}</span>
      <span className="text-[11px] opacity-70">{d.semana}</span>
    </div>
  )
}

function Resumo({ p }) {
  const h = getHospital(p.hospitalId)
  return (
    <div className="flex w-full min-w-0 flex-1 gap-4">
      <MiniData data={p.data} turno={p.turno} />
      <div className="min-w-0">
        <p className="truncate font-semibold">{h.nome}</p>
        <p className="text-sm text-muted">{p.especialidade} · {p.setor}</p>
        <p className="mt-1 text-sm">
          {p.inicio}–{p.fim} · {duracao(p.inicio, p.fim)} · <span className="font-semibold">{formatValor(p.valor)}</span>
        </p>
      </div>
    </div>
  )
}

function Publicado({ p, destaque }) {
  const { aceitar } = useStore()
  const fechado = p.status === 'fechado'
  const candidatos = fechado ? p.candidatos.filter((c) => c.id === p.aceito) : p.candidatos
  return (
    <article className={cx('rounded-md border p-5', destaque ? 'border-ink' : 'border-hairline')}>
      <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
        <Resumo p={p} />
        <StatusPill status={p.status} />
      </div>

      <div className="mt-5 border-t border-hairline pt-4">
        <p className="mb-2 text-sm font-semibold">
          {fechado ? 'Troca fechada com' : candidatos.length ? `${candidatos.length} ${candidatos.length === 1 ? 'candidato' : 'candidatos'}` : 'Ainda sem candidatos'}
        </p>
        {!candidatos.length && <p className="text-sm text-muted">Assim que alguém se candidatar, aparece aqui.</p>}
        <ul className="divide-y divide-hairline-soft">
          {candidatos.map((c) => (
            <li key={c.id} className="flex items-center gap-3 py-3">
              <Avatar iniciais={c.iniciais} size={40} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{c.nome}</p>
                <p className="flex flex-wrap items-center gap-x-2 text-[13px] text-muted">
                  <span>{c.especialidade}</span>·<span>{c.trocas} trocas</span>·<Nota valor={c.nota} />
                </p>
              </div>
              {fechado ? (
                <span className="flex size-8 items-center justify-center rounded-full bg-ink text-white"><CheckIcon size={16} strokeWidth={3} /></span>
              ) : (
                <button onClick={() => aceitar(p.id, c.id)} className="h-9 shrink-0 rounded-full bg-primary px-4 text-sm font-medium text-white active:bg-primary-active">
                  Aceitar
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ComoTrocar p={p} />
    </article>
  )
}

function Assumido({ p }) {
  const { cancelarCandidatura } = useStore()
  return (
    <article className="rounded-md border border-hairline p-5">
      <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
        <Resumo p={p} />
        <StatusPill status={p.status} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Avatar iniciais={p.publicadoPor.iniciais} size={28} />
          Repassado por <span className="font-semibold text-ink">{p.publicadoPor.nome}</span>
        </div>
        {p.status === 'aguardando' && (
          <button onClick={() => cancelarCandidatura(p.id)} className="shrink-0 text-sm font-semibold underline underline-offset-4">
            Cancelar
          </button>
        )}
      </div>
      <ComoTrocar p={p} aberto={p.status === 'confirmado'} />
    </article>
  )
}

function ComoTrocar({ p, aberto }) {
  if (!p.instrucoesTroca) return null
  return (
    <details open={aberto} className="group mt-4 rounded-sm bg-surface-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        Como fazer a troca
        <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4"><InstrucoesTroca plantao={p} compacto /></div>
    </details>
  )
}

export default function MeusPlantoes() {
  const { publicados, assumidos } = useStore()
  const [params, setParams] = useSearchParams()
  const aba = params.get('aba') === 'assumidos' ? 'assumidos' : 'publicados'
  const novo = params.get('novo') === '1'

  const abas = [
    { id: 'publicados', label: 'Publicados', n: publicados.length },
    { id: 'assumidos', label: 'Assumidos', n: assumidos.length },
  ]

  return (
    <div className="mx-auto max-w-[880px] px-4 pt-6 md:px-10 md:pt-10">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.44px] md:text-[28px]">Meus plantões</h1>
        <Link to="/publicar" className="hidden md:block">
          <Button variant="secondary" className="h-10 px-4 text-sm"><PlusIcon size={16} /> Publicar plantão</Button>
        </Link>
      </div>

      <div className="mt-6 flex gap-6 border-b border-hairline">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => setParams({ aba: a.id })}
            className={cx(
              '-mb-px flex items-center gap-2 border-b-2 pb-3 text-base font-semibold transition-colors',
              aba === a.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {a.label}
            <span className={cx('rounded-full px-2 py-0.5 text-xs', aba === a.id ? 'bg-ink text-white' : 'bg-surface-strong text-muted')}>{a.n}</span>
          </button>
        ))}
      </div>

      {novo && aba === 'publicados' && (
        <div className="mt-6 flex items-center gap-3 rounded-md bg-surface-soft p-4 text-sm">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-white"><CheckIcon size={16} strokeWidth={3} /></span>
          Plantão publicado. Os candidatos vão aparecer aqui no anúncio.
        </div>
      )}

      <div className="mt-6 space-y-4">
        {aba === 'publicados' &&
          (publicados.length ? publicados.map((p, i) => <Publicado key={p.id} p={p} destaque={novo && i === 0} />) : (
            <Vazio texto="Você ainda não repassou nenhum plantão." to="/publicar" cta="Publicar plantão" />
          ))}
        {aba === 'assumidos' &&
          (assumidos.length ? assumidos.map((p) => <Assumido key={p.id} p={p} />) : (
            <Vazio texto="Você ainda não assumiu nenhum plantão." to="/" cta="Procurar plantões" />
          ))}
      </div>
    </div>
  )
}

function Vazio({ texto, to, cta }) {
  return (
    <div className="rounded-md border border-hairline px-6 py-14 text-center">
      <p className="font-semibold">{texto}</p>
      <Link to={to}><Button variant="dark" className="mt-5">{cta}</Button></Link>
    </div>
  )
}
