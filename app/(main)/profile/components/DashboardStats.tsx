import { FileText, Clock, Award } from 'lucide-react'
import { StatCard } from './ProfileStatCard'

interface DashboardStatsProps {
  counters: {
    totalSummaries: number
    hoursSaved: number
  }
  thisWeekCount: number
}

export default function DashboardStats({ counters, thisWeekCount }: DashboardStatsProps) {
  const stats = [
    {
      id: 'total-summaries',
      value: String(counters.totalSummaries || 0),
      label: 'Total Summaries',
      icon: FileText,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10',
    },
    {
      id: 'hours-saved',
      value: String(counters.hoursSaved || 0),
      label: 'Hours Saved',
      icon: Clock,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
    },
    {
      id: 'this-week',
      value: String(thisWeekCount || 0),
      label: 'This Week',
      icon: Award,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10',
    },
  ]

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          value={stat.value}
          label={stat.label}
          icon={stat.icon}
          iconColor={stat.iconColor}
          iconBg={stat.iconBg}
        />
      ))}
    </div>
  )
}

