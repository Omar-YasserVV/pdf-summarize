"use client"

import Link from 'next/link'
import { Loader2, FileText } from 'lucide-react'
import { SummaryItem } from '@/components/SummaryItem'
import { useHistoryQuery } from '../../history/hooks/useHistory'

export default function RecentSummaries() {
  const { data, isLoading, isError } = useHistoryQuery()

  const historyItems = data?.data?.history || []

  // Helpers
  const getTitle = (filename: string) => {
    if (!filename) return 'Document Summary'
    try {
      if (filename.startsWith('http://') || filename.startsWith('https://')) {
        const url = new URL(filename)
        const path = url.pathname.split('/').filter(Boolean).pop()
        return path ? decodeURIComponent(path) : filename
      }
    } catch {}
    return filename
  }

  const getType = (filename: string): 'file' | 'link' | 'image' => {
    if (!filename) return 'file'
    const lower = filename.toLowerCase()
    if (
      lower.endsWith('.pdf') ||
      lower.endsWith('.docx') ||
      lower.endsWith('.txt') ||
      lower.endsWith('.doc')
    ) {
      return 'file'
    }
    if (
      lower.endsWith('.jpg') ||
      lower.endsWith('.jpeg') ||
      lower.endsWith('.png') ||
      lower.endsWith('.gif') ||
      lower.endsWith('.webp')
    ) {
      return 'image'
    }
    if (lower.startsWith('http://') || lower.startsWith('https://')) {
      return 'link'
    }
    return 'file'
  }

  const mapLanguage = (lang: string): 'AR' | 'EN' | 'BOTH' => {
    const upper = (lang || '').toUpperCase()
    if (upper === 'ARABIC' || upper === 'AR') return 'AR'
    if (upper === 'ENGLISH' || upper === 'EN') return 'EN'
    if (upper === 'BOTH') return 'BOTH'
    return 'EN'
  }

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-white">Recent Summaries</h2>
        <Link
          href="/history"
          className="text-sm font-medium text-sky-500 transition-colors hover:text-sky-400"
        >
          View All →
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
          </div>
        )}

        {isError && (
          <p className="text-xs text-red-400 py-4 text-center">
            Failed to load recent summaries.
          </p>
        )}

        {!isLoading && !isError && historyItems.length === 0 && (
          <div className="rounded-xl border border-slate-800/80 bg-secondary/20 p-8 text-center space-y-2">
            <FileText className="h-6 w-6 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-500">No recent summaries found.</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          historyItems.slice(0, 6).map((item) => (
            <SummaryItem
              key={item.id}
              title={getTitle(item.filename)}
              timestamp={item.date}
              language={mapLanguage(item.language)}
              type={getType(item.filename)}
            />
          ))}
      </div>
    </section>
  )
}
