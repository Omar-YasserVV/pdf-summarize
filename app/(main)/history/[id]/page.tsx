"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Calendar,
  Languages,
  Loader2,
  AlertCircle,
  FileDown,
  Volume2,
  VolumeX,
  Share2,
} from "lucide-react"
import { useHistoryQuery } from "../hooks/useHistory"
import { useExportPdfMutation, useExportDocxMutation } from "../../upload/hooks/useUpload"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import Tab Content Components
import SummaryTab from "../components/SummaryTab"
import CompareTab from "../components/CompareTab"
import ChatTab from "../components/ChatTab"
import QuizTab from "../components/QuizTab"

export default function SummaryDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: historyData, isLoading, isError, error } = useHistoryQuery()
  const exportPdfMutation = useExportPdfMutation()
  const exportDocxMutation = useExportDocxMutation()

  const [activeTab, setActiveTab] = useState("summary")
  const [exportError, setExportError] = useState<string | null>(null)
  
  // TTS (Text to Speech) State
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [ttsUtterance, setTtsUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  const historyItems = historyData?.data?.history || []
  const item = historyItems.find((h) => h.id === id)

  // Clean TTS Synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
        <p className="text-sm text-slate-400">Loading summary details...</p>
      </div>
    )
  }

  if (isError || !item) {
    return (
      <div className="py-10 max-w-lg mx-auto">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
          <h3 className="font-bold text-slate-200">Details Not Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error?.message || "We couldn't find the summary details for this document. It might have been deleted or the session has expired."}
          </p>
          <Button
            onClick={() => router.push("/history")}
            className="h-10 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold px-6"
          >
            Back to History
          </Button>
        </div>
      </div>
    )
  }

  const cleanTitle = (filename: string) => {
    if (!filename) return "Document Summary"
    try {
      if (filename.startsWith("http://") || filename.startsWith("https://")) {
        const url = new URL(filename)
        const path = url.pathname.split("/").filter(Boolean).pop()
        return path ? decodeURIComponent(path) : filename
      }
    } catch {}
    return filename
  }

  // Helper Downloads
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleExportPdf = async () => {
    setExportError(null)
    try {
      const blob = await exportPdfMutation.mutateAsync(item.id)
      downloadBlob(blob, `${cleanTitle(item.filename)}-summary.pdf`)
    } catch (err: any) {
      setExportError(err.message || "Failed to export PDF summary.")
    }
  }

  const handleExportDocx = async () => {
    setExportError(null)
    try {
      const blob = await exportDocxMutation.mutateAsync(item.id)
      downloadBlob(blob, `${cleanTitle(item.filename)}-summary.docx`)
    } catch (err: any) {
      setExportError(err.message || "Failed to export DOCX summary.")
    }
  }

  const handleExportTxt = () => {
    setExportError(null)
    try {
      const blob = new Blob([item.summary], { type: "text/plain;charset=utf-8" })
      downloadBlob(blob, `${cleanTitle(item.filename)}-summary.txt`)
    } catch (err: any) {
      setExportError(err.message || "Failed to export TXT summary.")
    }
  }

  // Handle Share/Copy Link
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // TTS Read Control
  const handleListen = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.")
      return
    }

    const synth = window.speechSynthesis

    if (isSpeaking) {
      if (isPaused) {
        synth.resume()
        setIsPaused(false)
      } else {
        synth.pause()
        setIsPaused(true)
      }
    } else {
      synth.cancel() // Stop any ongoing speech
      const textToRead = item.summary
      const utterance = new SpeechSynthesisUtterance(textToRead)
      
      // Auto-detect language voice fallback
      if (item.language.toLowerCase() === "ar" || item.language.toLowerCase() === "arabic") {
        utterance.lang = "ar-SA"
      } else {
        utterance.lang = "en-US"
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        setIsPaused(false)
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setIsPaused(false)
      }

      synth.speak(utterance)
      setTtsUtterance(utterance)
      setIsSpeaking(true)
      setIsPaused(false)
    }
  }

  const handleStopListen = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 py-5 max-md:px-6 select-none text-slate-100">
      {/* Back button and Meta Header */}
      <div className="flex flex-col gap-3 text-left">
        <div className="flex items-start gap-2">
          <button
            onClick={() => {
              handleStopListen()
              router.push("/history")
            }}
            className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="space-y-1 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white break-words pr-4 leading-tight">
              {cleanTitle(item.filename)}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                {item.date}
              </span>
              <span className="flex items-center gap-1.5 capitalize">
                <Languages className="h-3.5 w-3.5 text-slate-500" />
                Language: {item.language}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons (Listen & Export Capsule) */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3">
        {/* Listen / Speak Button */}
        <button
          onClick={handleListen}
          className={`flex-1 min-h-[48px] rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border ${
            isSpeaking && !isPaused
              ? "bg-[#3b1c6e]/70 border-[#5e2eab] text-[#c0a2f5] animate-pulse"
              : "bg-[#2e1a47] hover:bg-[#3d235e] border-[#4c2d75] text-[#d6bdf2]"
          }`}
        >
          {isSpeaking && !isPaused ? (
            <>
              <VolumeX className="h-5 w-5" />
              Pause Listening
            </>
          ) : (
            <>
              <Volume2 className="h-5 w-5" />
              {isPaused ? "Resume Listening" : "Listen Summary"}
            </>
          )}
        </button>

        {/* Dropdown / Export Selection (PDF, DOCX, TXT Options grouped side-by-side or stacked) */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <Button
            type="button"
            disabled={exportPdfMutation.isPending}
            onClick={handleExportPdf}
            className="flex-1 sm:flex-initial h-12 rounded-xl font-bold border border-[#1f5c80] bg-[#0f2c3d] text-[#7dd3fc] hover:bg-[#184661] flex items-center justify-center gap-1.5 cursor-pointer text-xs"
          >
            {exportPdfMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            PDF
          </Button>
          <Button
            type="button"
            disabled={exportDocxMutation.isPending}
            onClick={handleExportDocx}
            className="flex-1 sm:flex-initial h-12 rounded-xl font-bold border border-[#1f5c80] bg-[#0f2c3d] text-[#7dd3fc] hover:bg-[#184661] flex items-center justify-center gap-1.5 cursor-pointer text-xs"
          >
            {exportDocxMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            DOCX
          </Button>
          <Button
            type="button"
            onClick={handleExportTxt}
            className="flex-1 sm:flex-initial h-12 rounded-xl font-bold border border-[#1f5c80] bg-[#0f2c3d] text-[#7dd3fc] hover:bg-[#184661] flex items-center justify-center gap-1.5 cursor-pointer text-xs"
          >
            <FileDown className="h-4 w-4" />
            TXT
          </Button>
          
          {/* Share Link */}
          <button
            onClick={handleShare}
            className="h-12 w-12 rounded-xl border border-slate-800 bg-[#0e1324] hover:bg-slate-800 text-slate-300 flex items-center justify-center cursor-pointer shrink-0 transition-colors"
          >
            <Share2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {exportError && (
        <div className="flex items-center gap-2 text-red-400 text-xs text-left animate-pulse">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{exportError}</span>
        </div>
      )}

      {/* Tabs list (Styled with tabs layout) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex h-13 w-full items-center gap-1 rounded-full border border-slate-800/60 bg-[#0e1324]/60 p-1">
          <TabsTrigger
            value="summary"
            className="flex-1 cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold text-slate-400 transition-all data-[state=active]:bg-[#16223f] data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-cyan-500/20 max-md:text-[11px] sm:text-sm"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="compare"
            className="flex-1 cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold text-slate-400 transition-all hover:text-slate-200 data-[state=active]:bg-[#16223f] data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-cyan-500/20 max-md:text-[11px] sm:text-sm"
          >
            Compare
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex-1 cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold text-slate-400 transition-all hover:text-slate-200 data-[state=active]:bg-[#16223f] data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-cyan-500/20 max-md:text-[11px] sm:text-sm"
          >
            Chat
          </TabsTrigger>
          <TabsTrigger
            value="quiz"
            className="flex-1 cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold text-slate-400 transition-all hover:text-slate-200 data-[state=active]:bg-[#16223f] data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-cyan-500/20 max-md:text-[11px] sm:text-sm"
          >
            Quiz
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Selected Tab Content Container */}
      <div className="w-full transition-all duration-200">
        {activeTab === "summary" && <SummaryTab summary={item.summary} />}
        {activeTab === "compare" && <CompareTab currentId={item.id} currentTitle={item.filename} />}
        {activeTab === "chat" && <ChatTab sessionId={item.id} />}
        {activeTab === "quiz" && <QuizTab sessionId={item.id} docLanguage={item.language} />}
      </div>
    </div>
  )
}
