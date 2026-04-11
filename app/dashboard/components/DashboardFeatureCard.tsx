import { LucideIcon } from "lucide-react"

interface DashboardFeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
}

export function DashboardFeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: DashboardFeatureCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-secondary p-8 transition-all hover:border-slate-700">
      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${color} text-white shadow-lg`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mb-4 text-xl font-semibold text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}
