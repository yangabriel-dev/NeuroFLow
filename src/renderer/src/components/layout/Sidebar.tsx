import { useNavStore } from '../../store/useNavStore'
import type { NavView } from '../../store/useNavStore'

interface NavItem {
  label: string
  view: NavView
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', view: 'home' },
  { label: 'Rotina', view: 'routine' },
  { label: 'Métodos', view: 'methods' },
  { label: 'Stats', view: 'stats' },
  { label: 'Config', view: 'settings' }
]

function Sidebar(): React.JSX.Element {
  const activeView = useNavStore((s) => s.activeView)
  const setActiveView = useNavStore((s) => s.setActiveView)

  return (
    <nav className="flex w-60 shrink-0 flex-col gap-1 border-r border-neon-cyan/20 bg-bg-card/40 p-4">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.view}
          type="button"
          onClick={() => setActiveView(item.view)}
          className={
            activeView === item.view
              ? 'rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 text-left font-bold text-neon-cyan'
              : 'rounded-lg px-4 py-2 text-left text-text-secondary transition-colors hover:bg-bg-hover/50 hover:text-text-primary'
          }
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export default Sidebar
