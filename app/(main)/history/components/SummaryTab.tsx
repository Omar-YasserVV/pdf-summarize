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
    <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          Summary Text
        </span>
        <Button
          type="button"
          onClick={handleCopy}
          className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            copied
              ? "bg-emerald-500 text-white"
              : "bg-[#0f172a] text-slate-300 hover:bg-slate-800 border border-slate-800"
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

      <div className="rounded-2xl bg-[#0f172a]/50 p-5 border border-slate-800/50 min-h-[250px]">
        <p className="text-sm leading-relaxed text-slate-300 text-left whitespace-pre-wrap">
          {summary || "No summary text available."}
        </p>
      </div>
    </div>
  )
}
