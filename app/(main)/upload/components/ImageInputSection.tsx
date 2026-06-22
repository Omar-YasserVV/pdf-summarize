"use client";

import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import {
  Upload,
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  Trash2,
  Settings,
  Globe,
  Sliders,
  FileText,
  FileDown,
  Loader2,
  Camera,
} from 'lucide-react'
import CameraScanner from './CameraScanner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  useSummarizeFileMutation,
  useExportPdfMutation,
  useExportDocxMutation,
} from '../hooks/useUpload'

export default function ImageInputSection() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)

  // Customization Form States
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

  const summarizeMutation = useSummarizeFileMutation()
  const exportPdfMutation = useExportPdfMutation()
  const exportDocxMutation = useExportDocxMutation()

  useEffect(() => {
    if (summarizeMutation.isSuccess && sessionId) {
      queryClient.invalidateQueries({ queryKey: ['history'] })
      router.push(`/history/${sessionId}`)
    }
  }, [summarizeMutation.isSuccess, sessionId, router, queryClient])

  const summaryText =
    summarizeMutation.data?.data
      ? typeof summarizeMutation.data.data === 'string'
        ? summarizeMutation.data.data
        : summarizeMutation.data.data.summary
      : ''

  const handleContainerClick = () => {
    if (!file && !summarizeMutation.isPending) {
      fileInputRef.current?.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      summarizeMutation.reset()
      exportPdfMutation.reset()
      exportDocxMutation.reset()
      setExportError(null)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!file && !summarizeMutation.isPending) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setIsDragActive(true)
      } else if (e.type === 'dragleave') {
        setIsDragActive(false)
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (!file && !summarizeMutation.isPending && e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      summarizeMutation.reset()
      exportPdfMutation.reset()
      exportDocxMutation.reset()
      setExportError(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    summarizeMutation.reset()
    exportPdfMutation.reset()
    exportDocxMutation.reset()
    setExportError(null)
    setSessionId(generateUUID())
    setIsCameraActive(false)
  }

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const getBaseFileName = () => {
    if (!file) return 'summary'
    const lastDotIndex = file.name.lastIndexOf('.')
    if (lastDotIndex === -1) return file.name
    return file.name.substring(0, lastDotIndex)
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
    if (!file) return
    summarizeMutation.mutate({
      file,
      language,
      length,
      session_id: sessionId || undefined,
    })
  }

  // Format file size nicely
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const acceptedFormats = ['JPG', 'JPEG', 'PNG']

  return (
    <div className="w-full space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleInputChange}
      />

      {/* 1. Drag & Drop Zone Canvas or Camera Scanner - hidden when a file is selected */}
      {!file && !isCameraActive && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* Upload Card */}
          <div
            onClick={handleContainerClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 select-none ${
              isDragActive
                ? 'border-cyan-400 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                : 'border-slate-800/80 bg-secondary hover:border-slate-700 hover:bg-[#0e1527]'
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-transform group-hover:scale-105 group-active:scale-95">
              <Upload className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="mt-5 text-sm font-bold text-white md:text-base">
              Upload Image
            </h3>
            <p className="mt-2 text-xs font-medium text-slate-400 max-w-[220px]">
              Drag & drop or tap to browse JPG, JPEG, PNG
            </p>
          </div>

          {/* Scan Card */}
          <div
            onClick={() => setIsCameraActive(true)}
            className="group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800/80 bg-secondary hover:border-slate-700 hover:bg-[#0e1527] p-6 text-center transition-all duration-200 select-none"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-transform group-hover:scale-105 group-active:scale-95">
              <Camera className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="mt-5 text-sm font-bold text-white md:text-base">
              Scan Document
            </h3>
            <p className="mt-2 text-xs font-medium text-slate-400 max-w-[220px]">
              Take a photo of your paper document directly using your camera
            </p>
          </div>
        </div>
      )}

      {/* Camera Scanner View */}
      {!file && isCameraActive && (
        <CameraScanner
          onCaptureComplete={(capturedFile) => {
            setFile(capturedFile)
            setIsCameraActive(false)
            summarizeMutation.reset()
            exportPdfMutation.reset()
            exportDocxMutation.reset()
            setExportError(null)
          }}
          onCancel={() => setIsCameraActive(false)}
        />
      )}

      {/* 2. File Selected Info & Customization form */}
      {file && !summarizeMutation.isPending && !summarizeMutation.isSuccess && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* File Badge Card */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#161b2c] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <FileText className="h-5 w-5" />
              </div>
              <div className="max-w-[200px] sm:max-w-[320px] overflow-hidden text-left">
                <p className="truncate text-sm font-bold text-slate-200">{file.name}</p>
                <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleRemoveFile}
              variant="ghost"
              className="h-10 w-10 p-0 text-slate-500 hover:bg-slate-800 hover:text-red-400 rounded-full"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Configuration Grid */}
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

          {/* Submit Action */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            <Sparkles className="h-5 w-5" />
            Summarize Image
          </Button>
        </form>
      )}

      {/* 3. AI Analyzing / Loading state */}
      {summarizeMutation.isPending && (
        <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 text-center space-y-6">
          <div className="relative flex justify-center py-4">
            {/* Pulsing AI Circle */}
            <div className="absolute h-16 w-16 animate-ping rounded-full bg-cyan-500/20"></div>
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="h-7 w-7" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-100 animate-pulse">
              AI is reading your image...
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Analyzing image contents and creating a concise, high-quality summary. This might take a few seconds.
            </p>
          </div>
        </div>
      )}

      {/* 4. Error State Displays */}
      {summarizeMutation.isError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <h4 className="font-bold text-sm">Summarization Failed</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {summarizeMutation.error.message || 'An error occurred while uploading and summarizing.'}
          </p>
          <Button
            type="button"
            onClick={handleRemoveFile}
            className="h-9 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 rounded-xl cursor-pointer"
          >
            Try Another Image
          </Button>
        </div>
      )}

      {/* 5. Success State Result Cards */}
      {summarizeMutation.isSuccess && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Result Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold text-slate-100">Summary Result</h3>
              </div>
              
              {/* Actions */}
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

            {/* Result Text Content */}
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

            {/* Restart Button */}
            <Button
              type="button"
              onClick={handleRemoveFile}
              className="h-11 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl cursor-pointer"
            >
              Summarize Another Image
            </Button>
          </div>
        </div>
      )}

      {/* 6. Formats info board - hidden when file is selected, camera is active, or summary is shown */}
      {!file && !isCameraActive && (
        <div className="rounded-2xl border border-slate-800/80 bg-secondary p-5">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Supported Formats
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {acceptedFormats.map((format) => (
              <span
                key={format}
                className="rounded-xl border border-slate-800 bg-[#0f152a] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
