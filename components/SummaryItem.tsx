import { FileText, Link2, Image as ImageIcon, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SummaryType = 'file' | 'link' | 'image'

interface SummaryItemProps {
  title: string
  timestamp: string
  language: 'BOTH' | 'EN' | 'AR'
  type: SummaryType
  isFavorite?: boolean
}

const typeConfig = {
  file: { icon: FileText, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-500/10' },
  link: { icon: Link2, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10' },
  image: { icon: ImageIcon, color: 'text-teal-600 dark:text-teal-400', bgColor: 'bg-teal-500/10' },
}

const langBadgeStyles = {
  BOTH: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/5',
  EN: 'text-green-600 dark:text-green-400 border-green-500/30 bg-green-500/5',
  AR: 'text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/5',
}

export function SummaryItem({
  title,
  timestamp,
  language,
  type,
  isFavorite,
}: SummaryItemProps) {
  const { icon: Icon, color, bgColor } = typeConfig[type]

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border bg-card shadow-sm p-6 transition-all hover:border-border/80 hover:bg-muted dark:hover:bg-[#0f172a]">
      {/* Left Icon Container */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          bgColor
        )}
      >
        <Icon className={cn('h-5 w-5', color)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <h3 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100 md:text-base">
          {title}
        </h3>
        <p className="text-xs text-slate-500">{timestamp}</p>
      </div>

      {/* Right Side: Badge & Star */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-6 w-10 items-center justify-center rounded border text-[9px] font-bold',
            langBadgeStyles[language]
          )}
        >
          {language}
        </div>

        <button className="transition-transform active:scale-90">
          <Star
            className={cn(
              'h-5 w-5 transition-colors',
              isFavorite
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-600 hover:text-slate-400'
            )}
          />
        </button>
      </div>
    </div>
  )
}
