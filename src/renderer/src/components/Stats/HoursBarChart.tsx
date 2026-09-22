interface HoursBarChartProps {
  data: { date: string; hours: number }[]
}

const WEEKDAY_LABELS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

function HoursBarChart({ data }: HoursBarChartProps): React.JSX.Element {
  const max = Math.max(1, ...data.map((d) => d.hours))

  return (
    <div className="flex h-40 items-end justify-between gap-2">
      {data.map((d) => {
        const dayOfWeek = new Date(d.date).getUTCDay()
        const heightPercent = Math.max(2, (d.hours / max) * 100)
        return (
          <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-xs font-mono text-text-secondary">{d.hours}h</span>
            <div className="flex h-28 w-full items-end overflow-hidden rounded-t-md bg-black/30">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-neon-cyan to-neon-purple shadow-neon-cyan"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className="text-xs text-text-secondary">{WEEKDAY_LABELS[dayOfWeek]}</span>
          </div>
        )
      })}
    </div>
  )
}

export default HoursBarChart
