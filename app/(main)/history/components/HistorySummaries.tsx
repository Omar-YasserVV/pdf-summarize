"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Loader2,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { SummaryItem } from '@/components/SummaryItem'
import { useHistoryQuery } from '../hooks/useHistory'
import { useFilterStore } from '../store/useFilterStore'

function HistorySummaries() {
  const router = useRouter()
  const { data, isLoading, isError, error } = useHistoryQuery()
  const { type, language, searchQuery } = useFilterStore()

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

  const filteredItems = historyItems.filter((item) => {
    // 1. Search Query Filter (filename or summary)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesFilename = (item.filename || '').toLowerCase().includes(query)
      const matchesSummary = (item.summary || '').toLowerCase().includes(query)
      if (!matchesFilename && !matchesSummary) return false
    }

    // 2. Type Filter
    if (type !== 'all') {
      const itemType = getType(item.filename)
      if (type === 'files' && itemType !== 'file') return false
      if (type === 'links' && itemType !== 'link') return false
      if (type === 'images' && itemType !== 'image') return false
    }

    // 3. Language Filter
    if (language !== 'all') {
      const itemLang = (item.language || '').toLowerCase()
      if (language === 'english' && itemLang !== 'en' && itemLang !== 'english') return false
      if (language === 'arabic' && itemLang !== 'ar' && itemLang !== 'arabic') return false
      if (language === 'both' && itemLang !== 'both') return false
    }

    return true
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-cyan-400" />
        <p className="text-sm text-muted-foreground">Loading your history...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center space-y-3 text-destructive">
        <AlertCircle className="h-8 w-8 shrink-0 mx-auto" />
        <h4 className="font-bold text-sm text-foreground">Failed to load history</h4>
        <p className="text-xs text-muted-foreground">
          {error?.message || 'An unexpected error occurred while fetching your previous summaries.'}
        </p>
      </div>
    )
  }

  if (filteredItems.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-secondary/30 p-12 text-center space-y-2">
        <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
        <h4 className="font-bold text-sm text-foreground">No summaries found</h4>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          {searchQuery || type !== 'all' || language !== 'all'
            ? "Try adjusting your search query or filters to find what you're looking for."
            : 'You don\'t have any previous summaries yet. Start by uploading a file or entering a webpage URL.'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          onClick={() => router.push(`/history/${item.id}`)}
          className="cursor-pointer text-left"
        >
          <SummaryItem
            title={getTitle(item.filename)}
            timestamp={item.date}
            language={mapLanguage(item.language)}
            type={getType(item.filename)}
          />
        </div>
      ))}
    </div>
  )
}

export default HistorySummaries
