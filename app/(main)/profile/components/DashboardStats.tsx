import { FileText, Clock, Award } from 'lucide-react'
import { StatCard } from './ProfileStatCard'

export default function DashboardStats() {
  const stats = [
    {
      id: 'total-summaries',
      value: '47',
      label: 'Total Summaries',
      icon: FileText,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10',
    },
    {
      id: 'hours-saved',
      value: '23.5',
      label: 'Hours Saved',
      icon: Clock,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
    },
    {
      id: 'this-week',
      value: '12',
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
