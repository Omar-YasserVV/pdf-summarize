interface StatCardProps {
  value: string | number
  label: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  iconBg: string
}

export function StatCard({
  value,
  label,
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-secondary px-4 py-6 text-center shadow-lg transition-all hover:border-slate-700/80 hover:bg-[#0f172a]">
      {/* Icon Wrapper box with themed low opacity accent */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor} mb-4`}
      >
        <Icon className="h-5 w-5 stroke-2" />
      </div>

      {/* Main Metric Value */}
      <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
        {value}
      </span>

      {/* Description Label */}
      <p className="mt-1.5 text-xs font-medium text-slate-400 md:text-sm">
        {label}
      </p>
    </div>
  )
}
