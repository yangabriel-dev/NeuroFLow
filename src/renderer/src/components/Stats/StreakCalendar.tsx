interface StreakCalendarProps {
  data: { date: string; studied: boolean }[]
}

function StreakCalendar({ data }: StreakCalendarProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-7 gap-1">
      {data.map((d) => (
        <div
          key={d.date}
          title={d.date}
          className={
            d.studied
              ? 'aspect-square rounded-sm bg-neon-cyan shadow-neon-cyan'
              : 'aspect-square rounded-sm bg-black/30'
          }
        />
      ))}
    </div>
  )
}

export default StreakCalendar
