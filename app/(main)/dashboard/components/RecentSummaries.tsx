"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Loader2,
  FileText,
  Sparkles,
  FileDown,
  Copy,
  Check,
  Calendar,
  Languages,
  AlertCircle,
} from 'lucide-react'
import { SummaryItem } from '@/components/SummaryItem'
import { useHistoryQuery } from '../../history/hooks/useHistory'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useExportPdfMutation, useExportDocxMutation } from '../../upload/hooks/useUpload'

export default function RecentSummaries() {
  const { data, isLoading, isError } = useHistoryQuery()

  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [copied, setCopied] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const exportPdfMutation = useExportPdfMutation()
  const exportDocxMutation = useExportDocxMutation()

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

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleExportPdf = async (item: any) => {
    setExportError(null)
    if (item.id === 'default') {
      setExportError('This document was created without a valid session identifier and cannot be exported as PDF. Please try summarizing the document again.')
      return
    }
    try {
      const blob = await exportPdfMutation.mutateAsync(item.id)
      downloadBlob(blob, `${getTitle(item.filename)}-summary.pdf`)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export PDF summary.')
    }
  }

  const handleExportDocx = async (item: any) => {
    setExportError(null)
    if (item.id === 'default') {
      setExportError('This document was created without a valid session identifier and cannot be exported as DOCX. Please try summarizing the document again.')
      return
    }
    try {
      const blob = await exportDocxMutation.mutateAsync(item.id)
      downloadBlob(blob, `${getTitle(item.filename)}-summary.docx`)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export DOCX summary.')
    }
  }

  const handleExportTxt = (item: any) => {
    setExportError(null)
    try {
      const blob = new Blob([item.summary], { type: 'text/plain;charset=utf-8' })
      downloadBlob(blob, `${getTitle(item.filename)}-summary.txt`)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export TXT summary.')
    }
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
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item)
                setExportError(null)
              }}
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

      <Sheet
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null)
        }}
      >
        <SheetContent className="w-full sm:max-w-lg border-slate-800 bg-[#0e1222] p-6 text-slate-100 flex flex-col h-full overflow-y-auto">
          {selectedItem && (
            <div className="space-y-6 flex-1 flex flex-col h-full">
              {/* Header */}
              <div className="space-y-2 text-left">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                  <Sparkles className="h-3 w-3" /> Recent Summary Detail
                </span>
                <SheetTitle asChild>
                  <h2 className="text-lg font-bold text-white leading-tight break-words pr-8">
                    {getTitle(selectedItem.filename)}
                  </h2>
                </SheetTitle>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    {selectedItem.date}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Languages className="h-3.5 w-3.5 text-slate-500" />
                    Language: {selectedItem.language}
                  </span>
                </div>
              </div>

              {/* Scrollable Summary Body */}
              <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl bg-[#080b15]/60 p-5 border border-slate-800/60 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Summary Text
                  </span>
                  <Button
                    type="button"
                    onClick={() => handleCopySummary(selectedItem.summary)}
                    className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      copied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#0f172a] text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto text-left text-sm leading-relaxed text-slate-300 whitespace-pre-wrap pr-1">
                  {selectedItem.summary}
                </div>
              </div>

              {/* Export Actions Section */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block text-left">
                  Export Options
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    type="button"
                    disabled={exportPdfMutation.isPending}
                    onClick={() => handleExportPdf(selectedItem)}
                    className="h-10 rounded-xl font-bold cursor-pointer text-xs border border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-1.5"
                  >
                    {exportPdfMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                    ) : (
                      <FileDown className="h-4 w-4 text-cyan-400" />
                    )}
                    Export PDF
                  </Button>
                  <Button
                    type="button"
                    disabled={exportDocxMutation.isPending}
                    onClick={() => handleExportDocx(selectedItem)}
                    className="h-10 rounded-xl font-bold cursor-pointer text-xs border border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-1.5"
                  >
                    {exportDocxMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                    ) : (
                      <FileDown className="h-4 w-4 text-cyan-400" />
                    )}
                    Export DOCX
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleExportTxt(selectedItem)}
                    className="h-10 rounded-xl font-bold cursor-pointer text-xs border border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-1.5"
                  >
                    <FileDown className="h-4 w-4 text-cyan-400" />
                    Export TXT
                  </Button>
                </div>
                {exportError && (
                  <div className="flex items-center gap-2 text-red-400 text-xs text-left mt-2 animate-pulse">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{exportError}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
