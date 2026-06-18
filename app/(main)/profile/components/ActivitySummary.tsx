interface ActivityRowProps {
  period: string
  count: number
  isLast?: boolean
}

function ActivityRow({ period, count, isLast }: ActivityRowProps) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-slate-800/20 ${
        !isLast ? 'border-b border-slate-800/60' : ''
      }`}
    >
      {/* Time Period Label */}
      <span className="text-sm font-medium text-slate-300 md:text-base">
        {period}
      </span>

      {/* Numerical Metrics Count Label */}
      <span className="text-sm font-bold text-primary md:text-base">
        {count} summaries
      </span>
    </div>
  )
}

interface ActivitySummaryProps {
  activity: {
    today: number
    yesterday: number
    thisWeek: number
    thisMonth: number
  }
}

export default function ActivitySummary({ activity }: ActivitySummaryProps) {
  const activityData = [
    { id: 'today', period: 'Today', count: activity.today || 0 },
    { id: 'yesterday', period: 'Yesterday', count: activity.yesterday || 0 },
    { id: 'this-week', period: 'This Week', count: activity.thisWeek || 0 },
    { id: 'this-month', period: 'This Month', count: activity.thisMonth || 0 },
  ]

  return (
    <div className="w-full space-y-3.5 text-left">
      {/* Component Title */}
      <h3 className="px-1 text-base font-bold tracking-tight text-white md:text-lg">
        Activity Summary
      </h3>

      {/* Main Structural Wrapper Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-secondary shadow-xl">
        {activityData.map((item, index) => (
          <ActivityRow
            key={item.id}
            period={item.period}
            count={item.count}
            isLast={index === activityData.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

