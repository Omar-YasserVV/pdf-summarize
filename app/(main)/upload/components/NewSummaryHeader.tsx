import { ChevronLeft } from 'lucide-react'
import Link from 'next/link' // Or 'react-router-dom' depending on your framework

export default function NewSummaryHeader() {
  return (
    <div className="flex items-center gap-4 py-3 text-foreground">
      {/* Back Button linked to Dashboard */}
      <Link
        href="/dashboard"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary transition-colors hover:bg-muted"
        aria-label="Back to dashboard"
      >
        <ChevronLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
      </Link>

      {/* Current Page Title */}
      <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        New Summary
      </h1>
    </div>
  )
}
