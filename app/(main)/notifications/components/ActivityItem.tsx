import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ActivityStatus = 'success' | 'processing' | 'error'

interface ActivityItemProps {
  title: string
  description: string
  timestamp: string
  status: ActivityStatus
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: 'text-[#0fb07b]',
    bgColor: 'bg-[#0d3135]',
  },
  processing: {
    icon: Clock,
    color: 'text-[#20c1db]',
    bgColor: 'bg-[#133b50]',
  },
  error: {
    icon: AlertCircle,
    color: 'text-[#ef4444]',
    bgColor: 'bg-[#3c2030]',
  },
}

export function ActivityItem({
  title,
  description,
  timestamp,
  status,
}: ActivityItemProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="group flex items-start gap-3 rounded-xl border border-slate-800 bg-secondary p-4">
      {/* Status Icon Wrapper */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          config.bgColor
        )}
      >
        <Icon className={cn('h-5 w-5', config.color)} />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg! font-semibold text-slate-100 md:text-base">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
          {description}
        </p>
        <span className="mt-1 text-[11px] text-slate-500">{timestamp}</span>
      </div>
    </div>
  )
}
