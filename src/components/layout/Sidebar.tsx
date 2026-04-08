import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Database,
  Search,
  FormInput,
  Workflow,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: '홈', icon: LayoutDashboard, end: true },
  { to: '/zustand', label: 'Zustand', icon: Database },
  { to: '/query', label: 'TanStack Query', icon: Search },
  { to: '/form', label: 'React Hook Form', icon: FormInput },
  { to: '/flow', label: 'React Flow', icon: Workflow },
  { to: '/components', label: 'shadcn/ui', icon: Layers },
]

export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-sm font-semibold text-foreground">React SPA</h1>
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
      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          React 19 · Vite 8 · TS 6
        </p>
      </div>
    </aside>
  )
}
