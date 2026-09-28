import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { usuario } from '../data/mock'
import { FeedIcon, PlusIcon, ListIcon } from './Icons'
import { Avatar, cx } from './ui'

const tabs = [
  { to: '/', label: 'Plantões', icon: FeedIcon, end: true },
  { to: '/publicar', label: 'Publicar', icon: PlusIcon },
  { to: '/meus-plantoes', label: 'Meus plantões', icon: ListIcon },
]

export default function Layout() {
  const { pathname } = useLocation()
  const naDetalhe = pathname.startsWith('/plantao/')

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:h-20 md:px-10">
          <Logo />
          <nav className="hidden h-full items-stretch gap-8 md:flex">
            {tabs.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cx(
                    'flex items-center border-b-2 text-base font-semibold transition-colors',
                    isActive ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden text-right lg:block">
              <p className="text-sm font-semibold">{usuario.nome}</p>
              <p className="text-[13px] text-muted">{usuario.crm}</p>
            </div>
            <Avatar iniciais={usuario.iniciais} size={36} />
          </div>
        </div>
      </header>

      <main className={cx('pb-24 md:pb-16', naDetalhe && 'pb-32')}>
        <Outlet />
      </main>

      {/* Barra inferior no mobile */}
      {!naDetalhe && (
        <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-hairline bg-canvas pb-[env(safe-area-inset-bottom)] md:hidden">
          {tabs.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cx(
                  'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold',
                  isActive ? 'text-primary' : 'text-muted',
                )
              }
            >
              <Icon size={22} />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}
