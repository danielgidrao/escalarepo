import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { getHospital, formatData, formatValor, duracao } from '../data/mock'
import { DatePlate, TurnoBadge } from '../components/PlantaoCard'
import MapaEstatico from '../components/MapaEstatico'
import InstrucoesTroca from '../components/InstrucoesTroca'
import {
  ChevronLeft, CalendarIcon, ClockIcon, StethoscopeIcon, PinIcon, HeartIcon, ShareIcon, CheckIcon,
} from '../components/Icons'
import { Avatar, Button, cx } from '../components/ui'

function InfoRow({ icon: Icon, titulo, texto }) {
  return (
    <div className="flex gap-4 py-3">
      <Icon size={24} className="mt-0.5 shrink-0" />
      <div>
        <p className="text-base font-semibold">{titulo}</p>
        <p className="text-sm text-muted">{texto}</p>
      </div>
    </div>
  )
}

function ModalEnviada({ onClose }) {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center" onClick={onClose}>
      <div className="w-full max-w-md rounded-t-lg bg-canvas p-6 md:rounded-lg" onClick={(e) => e.stopPropagation()}>
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-white">
          <CheckIcon size={24} strokeWidth={3} />
        </span>
        <h2 className="mt-4 text-[22px] font-semibold tracking-[-0.44px]">Candidatura enviada</h2>
        <p className="mt-2 text-body">
          Quem publicou o plantão vai ver seu perfil na lista de candidatos. Você acompanha a resposta em Meus plantões.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button full onClick={() => navigate('/meus-plantoes?aba=assumidos')}>Ver em Meus plantões</Button>
          <Button full variant="secondary" onClick={() => navigate('/')}>Continuar procurando</Button>
        </div>
      </div>
    </div>
  )
}

export default function Detalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plantoes, assumidos, candidatar, salvos, toggleSalvo } = useStore()
  const [modal, setModal] = useState(false)

  const p = plantoes.find((x) => x.id === id)
  if (!p)
    return (
      <div className="mx-auto max-w-[1080px] px-4 py-16 text-center">
        <p className="text-lg font-semibold">Plantão não encontrado</p>
        <Link to="/" className="mt-2 inline-block underline">Voltar ao feed</Link>
      </div>
    )

  const h = getHospital(p.hospitalId)
  const d = formatData(p.data)
  const horas = parseInt(duracao(p.inicio, p.fim))
  const jaCandidatou = assumidos.some((a) => a.id === p.id)
  const salvo = salvos.has(p.id)

  const enviar = () => {
    candidatar(p)
    setModal(true)
  }

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-4 md:px-10 md:pt-8">
      {/* Barra de ações */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} aria-label="Voltar" className="flex size-10 items-center justify-center rounded-full bg-surface-strong hover:bg-hairline">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-1">
          <button className="flex h-10 items-center gap-2 rounded-sm px-3 text-sm font-semibold underline underline-offset-4 hover:bg-surface-soft">
            <ShareIcon size={16} /> Compartilhar
          </button>
          <button onClick={() => toggleSalvo(p.id)} className="flex h-10 items-center gap-2 rounded-sm px-3 text-sm font-semibold underline underline-offset-4 hover:bg-surface-soft">
            <HeartIcon size={16} className={cx(salvo && 'fill-primary stroke-primary')} /> {salvo ? 'Salvo' : 'Salvar'}
          </button>
        </div>
      </div>

      <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.44px] md:text-[28px]">{h.nome}</h1>
      <p className="mt-1 text-sm text-muted">
        {p.especialidade} · {p.setor} · {h.bairro}, {h.cidade}
      </p>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
        {/* Coluna principal */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            <DatePlate plantao={p} className="aspect-auto min-h-[200px]">
              <TurnoBadge turno={p.turno} />
            </DatePlate>
            <div className="flex flex-col justify-between rounded-md border border-hairline p-4">
              <span className="text-sm text-muted">Valor do plantão</span>
              <div>
                <p className="text-[34px] leading-none font-bold tracking-[-1px] md:text-[44px]">{formatValor(p.valor)}</p>
                <p className="mt-2 text-sm text-muted">≈ {formatValor(Math.round(p.valor / horas))} / hora</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 border-b border-hairline pb-6">
            <Avatar iniciais={p.publicadoPor.iniciais} size={48} />
            <div>
              <p className="text-base font-semibold">Publicado por {p.publicadoPor.nome}</p>
              <p className="text-sm text-muted">{p.publicadoPor.trocas} trocas concluídas no Escala</p>
            </div>
          </div>

          <div className="border-b border-hairline py-4">
            <InfoRow icon={CalendarIcon} titulo={d.extenso} texto={`Plantão ${p.turno.toLowerCase()} de ${duracao(p.inicio, p.fim)}`} />
            <InfoRow icon={ClockIcon} titulo={`${p.inicio} às ${p.fim}`} texto="Chegar 15 min antes para a passagem de plantão" />
            <InfoRow icon={StethoscopeIcon} titulo={p.especialidade} texto={p.setor} />
          </div>

          <div className="border-b border-hairline py-8">
            <h2 className="text-[21px] font-bold">Sobre o setor</h2>
            <p className="mt-3 leading-relaxed text-body">{p.descricao}</p>
          </div>

          {p.instrucoesTroca && (
            <div className="border-b border-hairline py-8">
              <InstrucoesTroca plantao={p} />
            </div>
          )}

          <div className="py-8">
            <h2 className="text-[21px] font-bold">Onde fica</h2>
            <p className="mt-1 mb-4 flex items-center gap-1.5 text-sm text-muted">
              <PinIcon size={15} /> {h.endereco} · {p.distancia.toLocaleString('pt-BR')} km de você
            </p>
            <MapaEstatico label={h.nome} />
          </div>
        </div>

        {/* Card de candidatura (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-md border border-hairline p-6 shadow-float">
            <p>
              <span className="text-[22px] font-semibold">{formatValor(p.valor)}</span>{' '}
              <span className="text-body">o plantão</span>
            </p>
            <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-sm border border-border-strong text-left">
              <div className="border-r border-border-strong px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase">Data</p>
                <p className="text-sm">{String(d.dia).padStart(2, '0')} {d.mes}, {d.semana}</p>
              </div>
              <div className="px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase">Turno</p>
                <p className="text-sm">{p.inicio} – {p.fim}</p>
              </div>
              <div className="col-span-2 border-t border-border-strong px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase">Setor</p>
                <p className="text-sm">{p.setor}</p>
              </div>
            </div>
            <Button full className="mt-4" disabled={jaCandidatou} onClick={enviar}>
              {jaCandidatou ? 'Candidatura enviada' : 'Candidatar-me'}
            </Button>
            <p className="mt-3 text-center text-sm text-muted">Você só assume o plantão se for aceito.</p>
            <div className="mt-6 space-y-3 border-t border-hairline pt-5 text-body">
              <div className="flex justify-between"><span>{horas}h × {formatValor(Math.round(p.valor / horas))}</span><span>{formatValor(p.valor)}</span></div>
              <div className="flex justify-between"><span>Taxa Escala</span><span>R$ 0</span></div>
              <div className="flex justify-between border-t border-hairline pt-3 font-semibold text-ink"><span>Total a receber</span><span>{formatValor(p.valor)}</span></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Barra inferior fixa (mobile/tablet) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-hairline bg-canvas px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
        <div>
          <p className="font-semibold">{formatValor(p.valor)}</p>
          <p className="text-sm text-muted underline">{String(d.dia).padStart(2, '0')} {d.mes} · {p.inicio}–{p.fim}</p>
        </div>
        <Button disabled={jaCandidatou} onClick={enviar}>
          {jaCandidatou ? 'Enviada' : 'Candidatar-me'}
        </Button>
      </div>

      {modal && <ModalEnviada onClose={() => setModal(false)} />}
    </div>
  )
}
