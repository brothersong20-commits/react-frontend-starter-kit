import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Database,
  Search,
  FormInput,
  Workflow,
  Layers,
  Sun,
  Moon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/store/useThemeStore'

const navItems = [
  { to: '/', label: '홈', icon: LayoutDashboard, end: true },
  { to: '/zustand', label: 'Zustand', icon: Database },
  { to: '/query', label: 'TanStack Query', icon: Search },
  { to: '/form', label: 'React Hook Form', icon: FormInput },
  { to: '/flow', label: 'React Flow', icon: Workflow },
  { to: '/components', label: 'shadcn/ui', icon: Layers },
]

export function Sidebar() {
  const { isDark, toggle } = useThemeStore()

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-sm font-semibold text-foreground">React</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Starter Kit</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border px-3 py-3 space-y-3">
        <button
          onClick={toggle}
          aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {isDark ? <Sun className="size-4 shrink-0" /> : <Moon className="size-4 shrink-0" />}
          {isDark ? '라이트 모드' : '다크 모드'}
        </button>
        <p className="px-3 text-xs text-muted-foreground">
          React 19 · Vite 8 · TS 6
        </p>
      </div>
    </aside>
  )
}
