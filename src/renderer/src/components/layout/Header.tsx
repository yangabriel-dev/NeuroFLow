function Header(): React.JSX.Element {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-neon-cyan/20 bg-bg-card/40 px-6 backdrop-blur-xl">
      <h1 className="font-mono text-xl font-bold tracking-widest text-neon-cyan">NeuroFlow</h1>
      <div className="flex gap-4 text-lg text-text-secondary">
        <button type="button" disabled className="cursor-not-allowed opacity-40" title="Em breve">
          ⚙️
        </button>
        <button type="button" disabled className="cursor-not-allowed opacity-40" title="Em breve">
          👤
        </button>
      </div>
    </header>
  )
}

export default Header
