import { StarIcon } from './Icons'

const cx = (...c) => c.filter(Boolean).join(' ')

export function Button({ variant = 'primary', full, className, ...props }) {
  const variants = {
    primary:
      'bg-primary text-white active:bg-primary-active disabled:bg-primary-disabled disabled:cursor-not-allowed',
    secondary: 'bg-canvas text-ink border border-ink hover:bg-surface-soft',
    tertiary: 'bg-transparent text-ink underline-offset-4 hover:underline px-0',
    dark: 'bg-ink text-white hover:bg-black',
  }
  return (
    <button
      className={cx(
        'inline-flex h-12 items-center justify-center gap-2 rounded-sm px-6 text-base font-medium transition-colors',
        variants[variant],
        full && 'w-full',
        className,
      )}
      {...props}
    />
  )
}

export function Chip({ active, className, ...props }) {
  return (
    <button
      className={cx(
        'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors',
        active ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-ink hover:border-ink',
        className,
      )}
      {...props}
    />
  )
}

export function Avatar({ iniciais, size = 40, className }) {
  return (
    <span
      className={cx('inline-flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white', className)}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {iniciais}
    </span>
  )
}

export function Badge({ className, ...props }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-[11px] leading-none font-semibold text-ink shadow-float',
        className,
      )}
      {...props}
    />
  )
}

export function StatusPill({ status }) {
  const map = {
    aberto: ['Aberto', 'bg-surface-strong text-ink'],
    fechado: ['Troca fechada', 'bg-ink text-white'],
    aguardando: ['Aguardando resposta', 'bg-primary-disabled/60 text-primary-active'],
    confirmado: ['Confirmado', 'bg-ink text-white'],
  }
  const [label, cls] = map[status] ?? map.aberto
  return <span className={cx('rounded-full px-2.5 py-1 text-xs font-semibold', cls)}>{label}</span>
}

export function Nota({ valor }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <StarIcon size={11} /> {valor.toFixed(2).replace('.', ',')}
    </span>
  )
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[13px] text-muted">{hint}</span>}
    </label>
  )
}

export const inputCls =
  'h-14 w-full rounded-sm border border-hairline bg-canvas px-3 text-base text-ink placeholder:text-muted outline-none focus:border-2 focus:border-ink focus:px-[11px]'

export { cx }
