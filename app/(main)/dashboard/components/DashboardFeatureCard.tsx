import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardFeatureCardProps {
  title: string
  description?: string // Made optional to match the "Action" look
  icon: LucideIcon
  color: string // Tailored for the icon text color (e.g., 'text-cyan-400')
  bgColor: string // Tailored for the icon bg (e.g., 'bg-cyan-500/10')
  hoverRing: string // Tailored for the glow (e.g., 'hover:ring-cyan-500/50')
  href?: string
}

export function DashboardFeatureCard({
  title,
  description,
  icon: Icon,
  color,
  bgColor,
  hoverRing,
  href = '#',
}: DashboardFeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col items-center justify-center space-y-3 rounded-2xl border border-slate-800 bg-secondary p-8 transition-all duration-300',
        'hover:border-transparent hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.3)] hover:ring-2 active:scale-95',
        hoverRing
      )}
    >
      {/* Icon Container - Squircle style */}
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
          bgColor
        )}
      >
        <Icon className={cn('h-7 w-7', color)} />
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h3 className="text-sm font-bold text-slate-100 group-hover:text-white md:text-base">
          {title}
        </h3>
      </div>
    </Link>
  )
}
