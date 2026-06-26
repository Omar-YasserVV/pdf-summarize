"use client"

import React, { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SummaryTabProps {
  summary: string
}

export default function SummaryTab({ summary }: SummaryTabProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
          Summary Text
        </span>
        <Button
          type="button"
          onClick={handleCopy}
          className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            copied
              ? "bg-emerald-500 text-white"
              : "bg-secondary text-foreground hover:bg-secondary/80 border border-border dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800"
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

      <div className="rounded-2xl bg-secondary/40 p-5 border border-border min-h-[250px] dark:bg-[#0f172a]/50 dark:border-slate-800/50">
        <p className="text-sm leading-relaxed text-foreground text-left whitespace-pre-wrap">
          {summary || "No summary text available."}
        </p>
      </div>
    </div>
  )
}
