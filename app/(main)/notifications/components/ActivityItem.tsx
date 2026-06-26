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
    color: 'text-emerald-600 dark:text-[#0fb07b]',
    bgColor: 'bg-emerald-50 dark:bg-[#0d3135]',
  },
  processing: {
    icon: Clock,
    color: 'text-sky-600 dark:text-[#20c1db]',
    bgColor: 'bg-sky-50 dark:bg-[#133b50]',
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-600 dark:text-[#ef4444]',
    bgColor: 'bg-red-50 dark:bg-[#3c2030]',
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
    <div className="group flex items-start gap-3 rounded-xl border border-border bg-card shadow-sm p-4">
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
      <div className="flex flex-col gap-1 text-left">
        <h3 className="text-lg! font-semibold text-foreground md:text-base">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
          {description}
        </p>
        <span className="mt-1 text-[11px] text-muted-foreground/80">{timestamp}</span>
      </div>
    </div>
  )
}
