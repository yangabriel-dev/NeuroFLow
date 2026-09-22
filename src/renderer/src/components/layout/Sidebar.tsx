interface NavItem {
  label: string
  active: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', active: true },
  { label: 'Rotina', active: false },
  { label: 'Métodos', active: false },
  { label: 'Stats', active: false },
  { label: 'Config', active: false }
]

function Sidebar(): React.JSX.Element {
  return (
    <nav className="flex w-60 shrink-0 flex-col gap-1 border-r border-neon-cyan/20 bg-bg-card/40 p-4">
      {NAV_ITEMS.map((item) =>
        item.active ? (
          <div
            key={item.label}
            className="rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 font-bold text-neon-cyan"
          >
            {item.label}
          </div>
        ) : (
          <div
            key={item.label}
            className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-2 text-text-secondary/50"
          >
            <span>{item.label}</span>
            <span className="text-[10px]">em breve</span>
          </div>
        )
      )}
    </nav>
  )
}

export default Sidebar
