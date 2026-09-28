import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store'
import Layout from './components/Layout'
import Feed from './pages/Feed'
import Detalhe from './pages/Detalhe'
import Publicar from './pages/Publicar'
import MeusPlantoes from './pages/MeusPlantoes'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="plantao/:id" element={<Detalhe />} />
            <Route path="publicar" element={<Publicar />} />
            <Route path="meus-plantoes" element={<MeusPlantoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
