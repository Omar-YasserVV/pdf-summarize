interface AchievementCardProps {
  label: string
  emoji: string
  isActive?: boolean
}

function AchievementCard({ label, emoji, isActive }: AchievementCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border px-4 py-6 text-center transition-all duration-300 ${
        isActive
          ? 'border-sky-200 dark:border-sky-500/40 bg-sky-50/50 dark:bg-[#0a0f1d] shadow-[0_0_20px_rgba(56,189,248,0.1)]'
          : 'border-border bg-secondary/50 opacity-85 hover:border-slate-400 dark:hover:border-slate-750/80 hover:opacity-100'
      }`}
    >
      {/* 3D-Style Emoji Graphic Container */}
      <div className="mb-3 transform text-3xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform duration-300 select-none hover:scale-110">
        {emoji}
      </div>

      {/* Achievement Metric Tag Description */}
      <span className="text-xs font-semibold tracking-tight text-slate-700 dark:text-slate-300 md:text-sm">
        {label}
      </span>
    </div>
  )
}

interface AchievementsGridProps {
  counters: {
    totalSummaries: number
  }
  activity: {
    thisWeek: number
  }
}

export default function AchievementsGrid({ counters, activity }: AchievementsGridProps) {
  const achievements = [
    {
      id: 'first-summary',
      label: 'First Summary',
      emoji: '🎯',
      isActive: counters.totalSummaries >= 1,
    },
    {
      id: 'week-streak',
      label: 'Week Streak',
      emoji: '🔥',
      isActive: activity.thisWeek >= 1,
    },
    {
      id: 'fifty-summaries',
      label: '50 Summaries',
      emoji: '⭐',
      isActive: counters.totalSummaries >= 50,
    },
  ]

  return (
    <div className="w-full space-y-3.5 text-left">
      {/* Section Label Title */}
      <h3 className="px-1 text-base font-bold tracking-tight text-slate-900 dark:text-white md:text-lg">
        Achievements
      </h3>

      {/* 3-Column Flexible Adaptive Grid */}
      <div className="grid w-full grid-cols-3 gap-3.5">
        {achievements.map((item) => (
          <AchievementCard
            key={item.id}
            label={item.label}
            emoji={item.emoji}
            isActive={item.isActive}
          />
        ))}
      </div>
    </div>
  )
}

