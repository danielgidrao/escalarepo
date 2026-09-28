import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getHospital, formatData, formatValor, duracao } from '../data/mock'
import { HeartIcon, SunIcon, MoonIcon, ClockIcon } from './Icons'
import { Badge, cx } from './ui'

// A "foto" do card é uma placa de calendário: data grande + faixa de horário.
export function DatePlate({ plantao, className, children }) {
  const d = formatData(plantao.data)
  const noturno = plantao.turno === 'Noturno'
  return (
    <div
      className={cx(
        'relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-md p-4',
        noturno ? 'bg-ink text-white' : 'bg-surface-soft text-ink',
        className,
      )}
    >
      <div className="flex items-start justify-between">{children}</div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-[64px] leading-none font-bold tracking-[-1px]">{String(d.dia).padStart(2, '0')}</span>
          <span className={cx('text-sm font-medium', noturno ? 'text-white/70' : 'text-muted')}>
            {d.mes}
            <br />
            {d.semana}
          </span>
        </div>
        <div
          className={cx(
            'mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold',
            noturno ? 'bg-white/10 text-white' : 'bg-canvas text-ink shadow-float',
          )}
        >
          <ClockIcon size={14} />
          {plantao.inicio} – {plantao.fim}
          <span className="font-normal opacity-70">· {duracao(plantao.inicio, plantao.fim)}</span>
        </div>
      </div>
    </div>
  )
}

export function TurnoBadge({ turno }) {
  const Icon = turno === 'Noturno' ? MoonIcon : SunIcon
  return (
    <Badge>
      <Icon size={12} /> {turno}
    </Badge>
  )
}

export default function PlantaoCard({ plantao }) {
  const { salvos, toggleSalvo } = useStore()
  const h = getHospital(plantao.hospitalId)
  const salvo = salvos.has(plantao.id)

  return (
    <Link to={`/plantao/${plantao.id}`} className="group block">
      <DatePlate plantao={plantao} className="transition-shadow group-hover:shadow-float">
        <div className="flex gap-1.5">
          {plantao.urgente ? <Badge className="text-primary-active">Urgente</Badge> : <TurnoBadge turno={plantao.turno} />}
        </div>
        <button
          aria-label={salvo ? 'Remover dos salvos' : 'Salvar plantão'}
          onClick={(e) => {
            e.preventDefault()
            toggleSalvo(plantao.id)
          }}
          className="flex size-8 items-center justify-center rounded-full"
        >
          <HeartIcon
            size={24}
            className={cx('drop-shadow-sm', salvo ? 'fill-primary stroke-white' : 'fill-black/40 stroke-white')}
          />
        </button>
      </DatePlate>

      <div className="mt-3 space-y-0.5 text-sm">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base leading-5 font-semibold">{h.nome}</h3>
          <span className="shrink-0 text-muted">{plantao.distancia.toLocaleString('pt-BR')} km</span>
        </div>
        <p className="text-muted">
          {plantao.especialidade} · {plantao.setor}
        </p>
        <p className="pt-1">
          <span className="font-semibold">{formatValor(plantao.valor)}</span>{' '}
          <span className="text-body">o plantão</span>
        </p>
      </div>
    </Link>
  )
}
