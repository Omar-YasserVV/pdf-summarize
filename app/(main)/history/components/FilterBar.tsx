'use client'

import { FileText, Link2, Image as ImageIcon } from 'lucide-react'
import {
  useFilterStore,
  FilterType,
  FilterLanguage,
} from '../store/useFilterStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function FilterBar() {
  const { type, language, setType, setLanguage } = useFilterStore()

  const typeFilters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'links', label: 'Links', icon: Link2 },
    { id: 'images', label: 'Images', icon: ImageIcon },
  ]

  const langFilters = [
    { id: 'all', label: 'All Languages' },
    { id: 'english', label: 'English' },
    { id: 'arabic', label: 'Arabic' },
    { id: 'both', label: 'Both' },
  ]

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Row 1: Content Type */}
      <div className="flex flex-wrap gap-3">
        {typeFilters.map((f) => (
          <Button
            key={f.id}
            onClick={() => setType(f.id as FilterType)}
            className={cn(
              'h-9 cursor-pointer rounded-lg border px-4 text-[15px] font-medium transition-all',
              type === f.id
                ? 'border-cyan-500/50 bg-primary/20 text-primary hover:bg-cyan-500/20'
                : 'border-transparent bg-[#0f1323] text-slate-300 hover:bg-slate-800 hover:text-slate-200'
            )}
          >
            {f.icon && <f.icon className="mr-2 h-4 w-4" />}
            {f.label}
          </Button>
        ))}
      </div>

      {/* Row 2: Languages */}
      <div className="flex flex-wrap gap-3">
        {langFilters.map((f) => (
          <Button
            key={f.id}
            onClick={() => setLanguage(f.id as FilterLanguage)}
            className={cn(
              'h-9 cursor-pointer rounded-lg border px-4 text-[15px] font-medium transition-all',
              language === f.id
                ? 'border-cyan-500/50 bg-primary/20 text-cyan-400 hover:bg-cyan-500/20'
                : 'border-transparent bg-[#0f1323] text-slate-300 hover:bg-slate-800 hover:text-slate-200'
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
