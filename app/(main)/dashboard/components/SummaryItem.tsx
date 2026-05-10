import { cn } from '@/lib/utils'

interface SummaryItemProps {
  title: string
  timestamp: string
  size?: string
  language: 'BOTH' | 'EN' | 'AR'
}

const badgeStyles = {
  BOTH: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  EN: 'text-green-400 bg-green-500/10 border-green-500/20',
  AR: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
}

export function SummaryItem({
  title,
  timestamp,
  size,
  language,
}: SummaryItemProps) {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-slate-800 bg-secondary p-5 transition-all hover:border-slate-700 hover:bg-[#0f172a]">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-slate-100 md:text-base">
          {title}
        </h3>
        <p className="text-xs text-slate-500">
          {timestamp} {size && `• ${size}`}
        </p>
      </div>

      <div
        className={cn(
          'flex h-8 w-12 items-center justify-center rounded-md border text-[10px] font-bold tracking-wider',
          badgeStyles[language]
        )}
      >
        {language}
      </div>
    </div>
  )
}
