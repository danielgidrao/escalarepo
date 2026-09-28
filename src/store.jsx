import { createContext, useContext, useState } from 'react'
import { plantoes as plantoesIniciais, meusPublicados, meusAssumidos } from './data/mock'

// Estado em memória do protótipo. Some ao recarregar a página.
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [plantoes, setPlantoes] = useState(plantoesIniciais)
  const [publicados, setPublicados] = useState(meusPublicados)
  const [assumidos, setAssumidos] = useState(meusAssumidos)
  const [salvos, setSalvos] = useState(new Set())

  const toggleSalvo = (id) =>
    setSalvos((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const candidatar = (plantao) => {
    if (assumidos.some((a) => a.id === plantao.id)) return
    setAssumidos((a) => [{ ...plantao, status: 'aguardando' }, ...a])
  }

  const cancelarCandidatura = (id) => setAssumidos((a) => a.filter((p) => p.id !== id))

  const publicar = (novo) => {
    const p = { ...novo, id: `m${Date.now()}`, distancia: 0, status: 'aberto', candidatos: [] }
    setPublicados((l) => [p, ...l])
    return p
  }

  const aceitar = (plantaoId, candidatoId) =>
    setPublicados((l) =>
      l.map((p) => (p.id === plantaoId ? { ...p, status: 'fechado', aceito: candidatoId } : p)),
    )

  return (
    <StoreContext.Provider
      value={{ plantoes, setPlantoes, publicados, assumidos, salvos, toggleSalvo, candidatar, cancelarCandidatura, publicar, aceitar }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
