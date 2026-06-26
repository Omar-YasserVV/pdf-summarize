"use client"

import React, { useState } from "react"
import { Sparkles, Loader2, AlertCircle, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHistoryQuery } from "../hooks/useHistory"
import { useCompareMutation } from "../hooks/useDocumentFeatures"

interface CompareTabProps {
  currentId: string
  currentTitle: string
}

export default function CompareTab({ currentId, currentTitle }: CompareTabProps) {
  const { data: historyData, isLoading: historyLoading } = useHistoryQuery()
  const compareMutation = useCompareMutation()

  const [selectedDocId, setSelectedDocId] = useState("")
  const [topicQuery, setTopicQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const otherSummaries = (historyData?.data?.history || []).filter(
    (item) => item.id !== currentId
  )

  const selectedDoc = otherSummaries.find((item) => item.id === selectedDocId)

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDocId || !topicQuery.trim()) return

    compareMutation.mutate({
      book_a_session_id: currentId,
      book_b_session_id: selectedDocId,
      topic_query: topicQuery.trim(),
    })
  }

  const cleanTitle = (filename: string) => {
    if (!filename) return "Document"
    try {
      if (filename.startsWith("http://") || filename.startsWith("https://")) {
        const url = new URL(filename)
        const path = url.pathname.split("/").filter(Boolean).pop()
        return path ? decodeURIComponent(path) : filename
      }
    } catch {}
    return filename
  }

  const comparisonResult = compareMutation.data

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-4 text-cyan-500 dark:text-cyan-400">
        <Sparkles className="h-5 w-5" />
        <h3 className="font-bold text-foreground">Compare Topics</h3>
      </div>

      <form onSubmit={handleCompare} className="space-y-5 text-left">
        {/* Document Selection */}
        <div className="space-y-2 relative">
          <Label className="font-bold text-muted-foreground">Compare with document</Label>
          {historyLoading ? (
            <div className="h-11 flex items-center justify-center border border-border bg-background rounded-xl text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary dark:text-cyan-400 mr-2" />
              Loading history...
            </div>
          ) : otherSummaries.length === 0 ? (
            <div className="p-3 border border-border bg-muted/50 rounded-xl text-xs text-muted-foreground">
              No other documents available in history to compare with. Please upload another document first.
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground flex items-center justify-between text-sm hover:border-border/80 hover:text-foreground/80 transition-colors dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100"
              >
                <span className="truncate">
                  {selectedDoc ? cleanTitle(selectedDoc.filename) : "Select a document from history..."}
                </span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground/80 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 rounded-xl border border-border bg-card shadow-2xl max-h-56 overflow-y-auto p-1.5 space-y-1 dark:border-slate-800 dark:bg-[#0e1324]">
                  {otherSummaries.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedDocId(item.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                        selectedDocId === item.id
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{cleanTitle(item.filename)}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Topic input */}
        <div className="space-y-2">
          <Label className="font-bold text-muted-foreground">Topic to compare</Label>
          <Input
            value={topicQuery}
            onChange={(e) => setTopicQuery(e.target.value)}
            placeholder="e.g. Revenue targets, key highlights, etc."
            className="h-11 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary rounded-xl dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus-visible:ring-cyan-500"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!selectedDocId || !topicQuery.trim() || compareMutation.isPending}
          className="h-11 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {compareMutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Comparing documents...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 animate-pulse" />
              Compare Documents
            </>
          )}
        </Button>
      </form>

      {/* Error state */}
      {compareMutation.isError && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-2.5 text-left text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Comparison Failed</h4>
            <p className="text-xs text-muted-foreground">
              {compareMutation.error.message || "An unexpected error occurred during comparison."}
            </p>
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {compareMutation.isSuccess && (
        <div className="space-y-4 pt-4 border-t border-border animate-fade-in text-left">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
            Comparison Results
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Document A Column */}
            <div className="rounded-2xl border border-border bg-secondary/40 p-5 space-y-3 dark:border-slate-800 dark:bg-[#0f172a]/40">
              <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block border-b border-border pb-1.5 truncate">
                {cleanTitle(currentTitle)}
              </span>
              <div className="text-xs leading-relaxed text-foreground min-h-[120px] whitespace-pre-wrap">
                {/* Try to format if return contains structural info, otherwise show fallback or parts */}
                {typeof comparisonResult === "string" 
                  ? comparisonResult 
                  : (comparisonResult.document_a || comparisonResult.doc_a || comparisonResult.result || JSON.stringify(comparisonResult))}
              </div>
            </div>

            {/* Document B Column */}
            <div className="rounded-2xl border border-border bg-secondary/40 p-5 space-y-3 dark:border-slate-800 dark:bg-[#0f172a]/40">
              <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block border-b border-border pb-1.5 truncate">
                {cleanTitle(selectedDoc?.filename || "")}
              </span>
              <div className="text-xs leading-relaxed text-foreground min-h-[120px] whitespace-pre-wrap">
                {/* Try to format if return contains structural info, otherwise show fallback or parts */}
                {typeof comparisonResult === "string" 
                  ? "Comparison analysis provided in unified summary." 
                  : (comparisonResult.document_b || comparisonResult.doc_b || comparisonResult.analysis || "Details compared in document A column.")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
