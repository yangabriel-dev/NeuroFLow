interface ProgressBarProps {
  progress: number
}

function ProgressBar({ progress }: ProgressBarProps): React.JSX.Element {
  const clamped = Math.min(100, Math.max(0, progress))
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/50">
      <div
        className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-neon-cyan transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export default ProgressBar
