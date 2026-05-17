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
          ? 'border-sky-500/40 bg-[#0a0f1d] shadow-[0_0_20px_rgba(56,189,248,0.1)]'
          : 'border-slate-800/80 bg-[#0a0f1d]/60 opacity-80 hover:border-slate-700/80 hover:opacity-100'
      }`}
    >
      {/* 3D-Style Emoji Graphic Container */}
      <div className="mb-3 transform text-3xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform duration-300 select-none hover:scale-110">
        {emoji}
      </div>

      {/* Achievement Metric Tag Description */}
      <span className="text-xs font-semibold tracking-tight text-slate-300 md:text-sm">
        {label}
      </span>
    </div>
  )
}

export default function AchievementsGrid() {
  const achievements = [
    {
      id: 'first-summary',
      label: 'First Summary',
      emoji: '🎯',
      isActive: false,
    },
    {
      id: 'week-streak',
      label: 'Week Streak',
      emoji: '🔥',
      isActive: true, // Highlights the middle active item with an illuminated outline
    },
    {
      id: 'fifty-summaries',
      label: '50 Summaries',
      emoji: '⭐',
      isActive: false,
    },
  ]

  return (
    <div className="w-full space-y-3.5">
      {/* Section Label Title */}
      <h3 className="px-1 text-base font-bold tracking-tight text-white md:text-lg">
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
