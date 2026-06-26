"use client"

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="group relative">
      {/* Search Icon */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-sky-400">
        <Search className="h-5 w-5" />
      </div>

      {/* Input Field */}
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search summaries, topics, or keywords..."
        className="h-14 w-full rounded-2xl border-border bg-secondary! pr-4 pl-12 text-foreground transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:border-sky-500/50 focus-visible:ring-1 focus-visible:ring-sky-500/50"
      />

      {/* Optional: Subtle Glow Effect on focus */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-sky-500 opacity-0 blur-md transition-opacity group-focus-within:opacity-20" />
    </div>
  )
}

