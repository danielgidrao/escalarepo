import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { hospitais, especialidades, usuario, formatValor, formatData, duracao, getHospital, normalizar } from '../data/mock'
import { DatePlate, TurnoBadge } from '../components/PlantaoCard'
import InstrucoesTroca from '../components/InstrucoesTroca'
import { ChevronLeft, ChevronRight, CheckIcon, SunIcon, MoonIcon, ClockIcon, SearchIcon, PinIcon } from '../components/Icons'
import { Button, Field, inputCls, cx } from '../components/ui'

const etapas = ['Hospital e data', 'Horário e valor', 'Revisão']
const nomesMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const presets = [
  { turno: 'Diurno', inicio: '07:00', fim: '19:00', icon: SunIcon },
  { turno: 'Noturno', inicio: '19:00', fim: '07:00', icon: MoonIcon },
  { turno: '24h', inicio: '07:00', fim: '07:00', icon: ClockIcon },
]
const iso = (a, m, d) => `${a}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

function Calendario({ valor, onChange }) {
  const [ref, setRef] = useState({ a: 2026, m: 9 })
  const primeiro = new Date(ref.a, ref.m, 1).getDay()
  const dias = new Date(ref.a, ref.m + 1, 0).getDate()
  const hoje = '2026-09-27'
  const mover = (n) => setRef(({ a, m }) => ({ a: a + Math.floor((m + n) / 12), m: (m + n + 12) % 12 }))

  return (
    <div className="rounded-md border border-hairline p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => mover(-1)} aria-label="Mês anterior" className="flex size-8 items-center justify-center rounded-full hover:bg-surface-strong"><ChevronLeft size={16} /></button>
        <p className="font-semibold">{nomesMes[ref.m]} {ref.a}</p>
        <button type="button" onClick={() => mover(1)} aria-label="Próximo mês" className="flex size-8 items-center justify-center rounded-full hover:bg-surface-strong"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((l, i) => <span key={i} className="py-2">{l}</span>)}
      </div>
      <div className="grid grid-cols-7 place-items-center gap-y-1">
        {Array.from({ length: primeiro }).map((_, i) => <span key={`v${i}`} />)}
        {Array.from({ length: dias }).map((_, i) => {
          const data = iso(ref.a, ref.m, i + 1)
          const passado = data < hoje
          const sel = valor === data
          return (
            <button
              type="button"
              key={data}
              disabled={passado}
              onClick={() => onChange(data)}
              className={cx(
                'size-10 rounded-full text-sm transition-colors',
                sel ? 'bg-ink font-semibold text-white' : passado ? 'text-muted-soft line-through' : 'hover:border hover:border-ink',
              )}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function BuscaHospital({ valor, onChange }) {
  const [busca, setBusca] = useState('')
  const q = normalizar(busca.trim())
  const resultados = hospitais.filter((h) =>
    normalizar(`${h.nome} ${h.bairro} ${h.cidade} ${h.endereco}`).includes(q),
  )
  const selecionado = getHospital(valor)
  // O selecionado continua visível mesmo que a busca não o encontre.
  const lista = selecionado && !resultados.includes(selecionado) ? [selecionado, ...resultados] : resultados

  return (
    <div>
      <label className="relative block">
        <SearchIcon size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por hospital, bairro, cidade ou endereço"
          className={cx(inputCls, 'pl-11 focus:pl-[43px]')}
        />
      </label>
      <p className="mt-2 mb-3 text-[13px] text-muted">
        {q ? `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'} para “${busca.trim()}”` : `${hospitais.length} hospitais cadastrados`}
      </p>

      {lista.length ? (
        <div className="grid max-h-[392px] gap-3 overflow-y-auto p-px sm:grid-cols-2">
          {lista.map((h) => {
            const sel = valor === h.id
            return (
              <button
                type="button"
                key={h.id}
                onClick={() => onChange(h.id)}
                className={cx(
                  'flex items-start justify-between gap-3 rounded-md border p-4 text-left transition-colors',
                  sel ? 'border-2 border-ink bg-surface-soft p-[15px]' : 'border-hairline hover:border-ink',
                )}
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{h.nome}</span>
                  <span className="block text-sm text-muted">{h.bairro}, {h.cidade}</span>
                  <span className="mt-1 flex items-center gap-1 text-[13px] text-muted">
                    <PinIcon size={13} className="shrink-0" /> <span className="truncate">{h.endereco}</span>
                  </span>
                </span>
                {sel && <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-white"><CheckIcon size={14} strokeWidth={3} /></span>}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="rounded-md border border-hairline px-6 py-10 text-center">
          <p className="font-semibold">Nenhum hospital encontrado</p>
          <p className="mt-1 text-sm text-muted">Confira a grafia ou busque pelo bairro ou pela cidade.</p>
        </div>
      )}
    </div>
  )
}

export default function Publicar() {
  const navigate = useNavigate()
  const { publicar } = useStore()
  const [etapa, setEtapa] = useState(0)
  const [f, setF] = useState({
    hospitalId: '', data: '', turno: 'Diurno', inicio: '07:00', fim: '19:00',
    especialidade: usuario.especialidade, setor: '', valor: '', descricao: '', instrucoesTroca: '',
  })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [etapa])
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e?.target ? e.target.value : e }))

  const podeAvancar = [f.hospitalId && f.data, f.setor && Number(f.valor) > 0, true][etapa]
  const preview = { ...f, valor: Number(f.valor) || 0, distancia: 0 }

  const concluir = () => {
    publicar(preview)
    navigate('/meus-plantoes?aba=publicados&novo=1')
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 pt-6 md:px-10 md:pt-10">
      <p className="text-sm font-semibold text-muted">Etapa {etapa + 1} de 3</p>
      <h1 className="mt-1 text-[26px] leading-tight font-semibold tracking-[-0.44px] md:text-[28px]">{etapas[etapa]}</h1>

      {/* Progresso */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {etapas.map((e, i) => (
          <div key={e}>
            <div className={cx('h-1 rounded-full', i <= etapa ? 'bg-ink' : 'bg-hairline')} />
            <p className={cx('mt-2 hidden text-[13px] md:block', i === etapa ? 'font-semibold text-ink' : 'text-muted')}>{e}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {etapa === 0 && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Em qual hospital?</h2>
              <BuscaHospital valor={f.hospitalId} onChange={set('hospitalId')} />
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold">Qual a data do plantão?</h2>
              <Calendario valor={f.data} onChange={set('data')} />
              {f.data && <p className="mt-3 text-sm text-muted">Selecionado: <span className="font-semibold text-ink">{formatData(f.data).extenso}</span></p>}
            </div>
          </div>
        )}

        {etapa === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 text-lg font-semibold">Turno</h2>
              <div className="grid grid-cols-3 gap-3">
                {presets.map(({ turno, inicio, fim, icon: Icon }) => {
                  const sel = f.turno === turno
                  return (
                    <button
                      type="button"
                      key={turno}
                      onClick={() => setF((s) => ({ ...s, turno, inicio, fim }))}
                      className={cx(
                        'flex flex-col items-start gap-3 rounded-md border p-4 text-left',
                        sel ? 'border-2 border-ink bg-surface-soft p-[15px]' : 'border-hairline hover:border-ink',
                      )}
                    >
                      <Icon size={24} />
                      <span>
                        <span className="block font-semibold">{turno}</span>
                        <span className="block text-[13px] text-muted">{inicio}–{fim}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Field label="Início"><input type="time" value={f.inicio} onChange={set('inicio')} className={inputCls} /></Field>
                <Field label="Fim"><input type="time" value={f.fim} onChange={set('fim')} className={inputCls} /></Field>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Especialidade">
                <select value={f.especialidade} onChange={set('especialidade')} className={inputCls}>
                  {especialidades.map((e) => <option key={e}>{e}</option>)}
                </select>
              </Field>
              <Field label="Setor">
                <input value={f.setor} onChange={set('setor')} placeholder="Ex.: Pronto-atendimento" className={inputCls} />
              </Field>
            </div>

            <Field label="Valor do plantão" hint={Number(f.valor) > 0 ? `≈ ${formatValor(Math.round(f.valor / parseInt(duracao(f.inicio, f.fim))))} por hora` : 'O valor é só informativo — o pagamento é combinado entre os médicos.'}>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-base text-muted">R$</span>
                <input type="number" inputMode="numeric" min="0" value={f.valor} onChange={set('valor')} placeholder="1.800" className={cx(inputCls, 'pl-10 focus:pl-[39px]')} />
              </div>
            </Field>

            <Field label="Descrição do setor (opcional)">
              <textarea
                rows={4}
                value={f.descricao}
                onChange={set('descricao')}
                placeholder="Volume de atendimentos, equipe, retaguarda…"
                className={cx(inputCls, 'h-auto py-3.5 focus:py-[13px]')}
              />
            </Field>

            <div className="rounded-md border border-hairline p-4 md:p-5">
              <h2 className="text-lg font-semibold">Como fazer a troca neste hospital</h2>
              <p className="mt-1 mb-4 text-sm text-muted">
                Cada hospital tem seu jeito: com quem falar, prazo, documentos. Escreva um passo por linha — quem se candidatar vê isso no anúncio.
              </p>
              <textarea
                rows={5}
                value={f.instrucoesTroca}
                onChange={set('instrucoesTroca')}
                aria-label="Instruções de troca"
                placeholder={'Ex.:\nMandar e-mail para escala@hospital.com.br até 48h antes, com nome e CRM.\nA coordenação confirma a troca no sistema.\nRetirar o crachá provisório na portaria.'}
                className={cx(inputCls, 'h-auto py-3.5 focus:py-[13px]')}
              />
            </div>
          </div>
        )}

        {etapa === 2 && (
          <div className="grid gap-8 sm:grid-cols-[260px_1fr]">
            <div>
              <DatePlate plantao={preview}><TurnoBadge turno={preview.turno} /></DatePlate>
              <p className="mt-3 font-semibold">{getHospital(f.hospitalId).nome}</p>
              <p className="text-sm text-muted">{f.especialidade} · {f.setor}</p>
              <p className="mt-1 text-sm"><span className="font-semibold">{formatValor(preview.valor)}</span> o plantão</p>
            </div>
            <dl className="divide-y divide-hairline border-y border-hairline">
              {[
                ['Hospital', getHospital(f.hospitalId).nome, 0],
                ['Data', formatData(f.data).extenso, 0],
                ['Horário', `${f.inicio} às ${f.fim} (${duracao(f.inicio, f.fim)})`, 1],
                ['Especialidade', f.especialidade, 1],
                ['Setor', f.setor, 1],
                ['Valor', formatValor(preview.valor), 1],
              ].map(([k, v, e]) => (
                <div key={k} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                  <button type="button" onClick={() => setEtapa(e)} className="text-sm font-semibold underline underline-offset-4">Editar</button>
                </div>
              ))}
            </dl>
            <div className="sm:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold">Como fazer a troca</h2>
                <button type="button" onClick={() => setEtapa(1)} className="text-sm font-semibold underline underline-offset-4">Editar</button>
              </div>
              {f.instrucoesTroca.trim() ? (
                <div className="mt-4"><InstrucoesTroca plantao={preview} compacto /></div>
              ) : (
                <p className="mt-2 text-sm text-muted">Sem instruções. Candidatos vão precisar perguntar como a troca funciona neste hospital.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Rodapé de navegação */}
      <div className="sticky bottom-[64px] z-20 mt-10 -mx-4 flex items-center justify-between border-t border-hairline bg-canvas px-4 py-4 md:bottom-0 md:mx-0 md:px-0">
        <Button variant="tertiary" className={cx(etapa === 0 && 'invisible')} onClick={() => setEtapa((e) => e - 1)}>
          Voltar
        </Button>
        {etapa < 2 ? (
          <Button variant="dark" disabled={!podeAvancar} className="disabled:bg-hairline disabled:text-muted" onClick={() => setEtapa((e) => e + 1)}>
            Continuar
          </Button>
        ) : (
          <Button onClick={concluir}>Publicar plantão</Button>
        )}
      </div>
    </div>
  )
}
