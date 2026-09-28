import { useMemo, useState } from 'react'
import { useStore } from '../store'
import { especialidades, turnos, distancias, getHospital } from '../data/mock'
import PlantaoCard from '../components/PlantaoCard'
import { SearchIcon, SunIcon, MoonIcon, ClockIcon, PinIcon } from '../components/Icons'
import { Chip, cx } from '../components/ui'

const turnoIcon = { Diurno: SunIcon, Noturno: MoonIcon, '24h': ClockIcon }

function Segment({ label, children, className }) {
  return (
    <label className={cx('flex min-w-0 flex-1 cursor-pointer flex-col justify-center rounded-full px-6 py-2 hover:bg-surface-soft', className)}>
      <span className="text-xs font-bold text-ink">{label}</span>
      {children}
    </label>
  )
}

const selectCls = 'w-full cursor-pointer appearance-none bg-transparent text-sm text-muted outline-none'

export default function Feed() {
  const { plantoes } = useStore()
  const [busca, setBusca] = useState('')
  const [esp, setEsp] = useState(null)
  const [turno, setTurno] = useState(null)
  const [dist, setDist] = useState(null)

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return plantoes.filter((p) => {
      const h = getHospital(p.hospitalId)
      if (esp && p.especialidade !== esp) return false
      if (turno && p.turno !== turno) return false
      if (dist && p.distancia > dist) return false
      if (q && !`${h.nome} ${h.bairro} ${p.setor} ${p.especialidade}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [plantoes, busca, esp, turno, dist])

  const limpar = () => {
    setBusca('')
    setEsp(null)
    setTurno(null)
    setDist(null)
  }

  return (
    <>
      {/* Busca */}
      <section className="border-b border-hairline-soft bg-canvas">
        <div className="mx-auto max-w-[1280px] px-4 pt-5 pb-4 md:px-10 md:pt-6 md:pb-6">
          {/* Desktop/tablet: pílula segmentada */}
          <div className="mx-auto hidden h-16 max-w-[850px] items-center rounded-full border border-hairline bg-canvas p-2 pl-0 shadow-float md:flex">
            <Segment label="Buscar" className="flex-[1.6]">
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Hospital, bairro ou setor"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
            </Segment>
            <span className="h-8 w-px bg-hairline" />
            <Segment label="Turno">
              <select value={turno ?? ''} onChange={(e) => setTurno(e.target.value || null)} className={selectCls}>
                <option value="">Qualquer turno</option>
                {turnos.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Segment>
            <span className="h-8 w-px bg-hairline" />
            <Segment label="Distância">
              <select value={dist ?? ''} onChange={(e) => setDist(Number(e.target.value) || null)} className={selectCls}>
                <option value="">Qualquer distância</option>
                {distancias.map((d) => <option key={d} value={d}>Até {d} km</option>)}
              </select>
            </Segment>
            <button aria-label="Buscar" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white active:bg-primary-active">
              <SearchIcon size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Mobile: pílula única */}
          <label className="flex h-14 items-center gap-3 rounded-full border border-hairline px-5 shadow-float md:hidden">
            <SearchIcon size={18} strokeWidth={2.5} />
            <div className="min-w-0 flex-1">
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Onde você quer plantonar?"
                className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-ink"
              />
              <p className="text-xs text-muted">Hospital · bairro · setor</p>
            </div>
          </label>

          {/* Chips */}
          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:mt-6 md:px-0">
            <div className="flex shrink-0 gap-2 md:hidden">
              {turnos.map((t) => {
                const Icon = turnoIcon[t]
                return (
                  <Chip key={t} active={turno === t} onClick={() => setTurno(turno === t ? null : t)}>
                    <Icon size={15} /> {t}
                  </Chip>
                )
              })}
              <Chip active={!!dist} onClick={() => setDist(dist === 10 ? null : 10)}>
                <PinIcon size={15} /> Até 10 km
              </Chip>
              <span className="mx-1 w-px shrink-0 bg-hairline" />
            </div>
            <Chip active={!esp} onClick={() => setEsp(null)}>Todas</Chip>
            {especialidades.map((e) => (
              <Chip key={e} active={esp === e} onClick={() => setEsp(esp === e ? null : e)}>{e}</Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Lista */}
      <section className="mx-auto max-w-[1280px] px-4 pt-6 md:px-10 md:pt-8">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.44px]">
            {lista.length} {lista.length === 1 ? 'plantão disponível' : 'plantões disponíveis'}
            <span className="text-muted font-normal"> perto de você</span>
          </h1>
          {(busca || esp || turno || dist) && (
            <button onClick={limpar} className="shrink-0 text-sm font-semibold underline underline-offset-4">
              Limpar filtros
            </button>
          )}
        </div>

        {lista.length ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lista.map((p) => <PlantaoCard key={p.id} plantao={p} />)}
          </div>
        ) : (
          <div className="rounded-md border border-hairline px-6 py-16 text-center">
            <p className="text-lg font-semibold">Nenhum plantão com esses filtros</p>
            <p className="mt-1 text-sm text-muted">Tente ampliar a distância ou trocar a especialidade.</p>
          </div>
        )}
      </section>
    </>
  )
}
