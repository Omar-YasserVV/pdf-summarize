"use client";

import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  Settings,
  Globe,
  Sliders,
  Link2,
  FileDown,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  useSummarizeUrlMutation,
  useExportPdfMutation,
  useExportDocxMutation,
} from '../hooks/useUpload'

export default function UrlInputSection() {
  const [url, setUrl] = useState('')
  const [language, setLanguage] = useState('ar') // 'ar' | 'en' | 'both'
  const [length, setLength] = useState('medium') // 'short' | 'medium' | 'long'
  
  // Success copy feedback state
  const [copied, setCopied] = useState(false)

  // Session state for coordinating summary and exports
  const [sessionId, setSessionId] = useState<string>('')
  const [exportError, setExportError] = useState<string | null>(null)

  // UUID generator helper
  const generateUUID = () => {
    if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID()
    }
    // Fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  useEffect(() => {
    setSessionId(generateUUID())
  }, [])

  const summarizeMutation = useSummarizeUrlMutation()
  const exportPdfMutation = useExportPdfMutation()
  const exportDocxMutation = useExportDocxMutation()

  const summaryText =
    summarizeMutation.data?.data
      ? typeof summarizeMutation.data.data === 'string'
        ? summarizeMutation.data.data
        : summarizeMutation.data.data.summary
      : ''

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleResetForm = () => {
    setUrl('')
    summarizeMutation.reset()
    exportPdfMutation.reset()
    exportDocxMutation.reset()
    setExportError(null)
    setSessionId(generateUUID())
  }

  const getBaseFileName = () => {
    try {
      const parsedUrl = new URL(url)
      let name = parsedUrl.pathname.split('/').filter(Boolean).pop() || parsedUrl.hostname
      // Remove file extension or non-alphanumeric chars
      name = name.replace(/[^a-zA-Z0-9-_]/g, '_')
      return name || 'webpage'
    } catch {
      return 'webpage'
    }
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

  const handleExportPdf = async () => {
    if (!sessionId) return
    setExportError(null)
    try {
      const blob = await exportPdfMutation.mutateAsync(sessionId)
      downloadBlob(blob, `${getBaseFileName()}-summary.pdf`)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export PDF summary.')
    }
  }

  const handleExportDocx = async () => {
    if (!sessionId) return
    setExportError(null)
    try {
      const blob = await exportDocxMutation.mutateAsync(sessionId)
      downloadBlob(blob, `${getBaseFileName()}-summary.docx`)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export DOCX summary.')
    }
  }

  const handleExportTxt = () => {
    if (!summaryText) return
    setExportError(null)
    try {
      const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' })
      downloadBlob(blob, `${getBaseFileName()}-summary.txt`)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export TXT summary.')
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    summarizeMutation.mutate({
      url,
      language,
      length,
      session_id: sessionId || undefined,
    })
  }

  const displayError = summarizeMutation.isError ? summarizeMutation.error.message : null

  return (
    <div className="w-full space-y-6">
      {!summarizeMutation.isPending && !summarizeMutation.isSuccess && (
        <form onSubmit={handleFormSubmit} className="space-y-6 text-slate-200">
          {/* Main Input Field Card */}
          <div className="space-y-3 rounded-3xl border border-slate-800 bg-[#161b2c] p-6 shadow-2xl">
            <Label
              htmlFor="url-input"
              className="text-sm font-semibold tracking-wide text-slate-200 flex items-center gap-1.5"
            >
              <Link2 className="h-4 w-4 text-cyan-400" />
              Enter Webpage URL
            </Label>
            
            <Input
              id="url-input"
              type="url"
              required
              disabled={summarizeMutation.isPending}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              className="h-12 border-slate-800 bg-[#0f172a] px-4 text-slate-300 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
            />
            
            <div className="flex items-center rounded-xl border border-slate-800 bg-[#0f172a]/50 p-4 text-xs text-slate-400 sm:text-sm">
              Paste any article, blog post, or web page URL. We&apos;ll extract and summarize the content for you automatically.
            </div>
          </div>

          {/* Configuration Card */}
          {url.trim() !== '' && (
            <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-cyan-400">
                <Settings className="h-5 w-5" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Summary Settings
                </h4>
              </div>

              {/* Language Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <Label className="font-bold">Output Language</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'ar', label: 'Arabic' },
                    { value: 'en', label: 'English' },
                    { value: 'both', label: 'Both' },
                  ].map((opt) => (
                    <Button
                      key={opt.value}
                      type="button"
                      variant={language === opt.value ? 'default' : 'outline'}
                      onClick={() => setLanguage(opt.value)}
                      className={`h-10 rounded-xl font-bold cursor-pointer text-xs ${
                        language === opt.value
                          ? 'bg-cyan-400 text-slate-900 hover:bg-cyan-500'
                          : 'border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Length Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Sliders className="h-4 w-4 text-cyan-400" />
                  <Label className="font-bold">Summary Length</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'short', label: 'Short' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'long', label: 'Long' },
                  ].map((opt) => (
                    <Button
                      key={opt.value}
                      type="button"
                      variant={length === opt.value ? 'default' : 'outline'}
                      onClick={() => setLength(opt.value)}
                      className={`h-10 rounded-xl font-bold cursor-pointer text-xs ${
                        length === opt.value
                          ? 'bg-cyan-400 text-slate-900 hover:bg-cyan-500'
                          : 'border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Submit Action */}
          {url.trim() !== '' && (
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Sparkles className="h-5 w-5" />
              Summarize Link
            </Button>
          )}
        </form>
      )}

      {/* Loading state */}
      {summarizeMutation.isPending && (
        <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 text-center space-y-6">
          <div className="relative flex justify-center py-4">
            <div className="absolute h-16 w-16 animate-ping rounded-full bg-cyan-500/20"></div>
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-7 w-7" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-100 animate-pulse">
              AI is analyzing the webpage...
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Extracting webpage content and writing a high-quality summary. This might take a few seconds.
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {displayError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <h4 className="font-bold text-sm">Summarization Failed</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {displayError || 'An error occurred while fetching and summarizing the URL.'}
          </p>
          <Button
            type="button"
            onClick={handleResetForm}
            className="h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 rounded-xl cursor-pointer"
          >
            Try Another Link
          </Button>
        </div>
      )}

      {/* Success State Result */}
      {summarizeMutation.isSuccess && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold text-slate-100">Summary Result</h3>
              </div>
              
              <Button
                type="button"
                onClick={() => handleCopySummary(summaryText)}
                className={`h-9 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#0f172a] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-2xl bg-[#0f172a]/50 p-4 border border-slate-800/50">
              <p className="text-sm leading-relaxed text-slate-300 text-left whitespace-pre-wrap">
                {summaryText}
              </p>
            </div>

            {/* Export Section */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block text-left">
                Export Options
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  type="button"
                  disabled={exportPdfMutation.isPending}
                  onClick={handleExportPdf}
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
                  onClick={handleExportDocx}
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
                  onClick={handleExportTxt}
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

            <Button
              type="button"
              onClick={handleResetForm}
              className="h-11 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl cursor-pointer"
            >
              Summarize Another Link
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
