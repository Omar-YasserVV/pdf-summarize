"use client";

import React, { useState } from 'react'
import { Sparkles, Settings, Globe, Sliders } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function TextInputSection() {
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('ar') // 'ar' | 'en' | 'both'
  const [length, setLength] = useState('medium') // 'short' | 'medium' | 'long'

  return (
    <div className="w-full space-y-6 text-slate-200">
      {/* Main Input Field Card */}
      <div className="space-y-4 rounded-3xl border border-slate-800 bg-[#161b2c] p-6 shadow-2xl">
        <Label
          htmlFor="text-input"
          className="text-sm font-semibold tracking-wide text-slate-200"
        >
          Paste or type your text
        </Label>

        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste the text you want to summarize..."
          className="min-h-[160px] resize-none border-slate-800 bg-[#0f172a] px-4 py-3 text-slate-300 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500"
        />

        <div className="flex items-center rounded-xl border border-slate-800 bg-[#0f172a]/50 p-4 text-xs text-slate-400 sm:text-sm">
          You can paste text from any source. Minimum 100 words recommended for best results.
        </div>
      </div>

      {/* Configuration Card */}
      {text.trim() !== '' && (
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
      {text.trim() !== '' && (
        <Button
          type="button"
          className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="h-5 w-5" />
          Summarize Text
        </Button>
      )}
    </div>
  )
}
