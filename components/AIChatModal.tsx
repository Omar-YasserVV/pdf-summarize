'use client'

import { X, MessageSquare, Send, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AIChatModal({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-125 w-125 flex-col overflow-hidden rounded-lg border border-slate-700 bg-white shadow-2xl">
      {/* Header - Cyan Blue */}
      <div className="flex items-center justify-between bg-[#38bdf8] p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-white/20 p-1.5">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm leading-none font-semibold">AI Assistant</h3>
            <p className="mt-1 text-[11px] opacity-90">Ready to help</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:opacity-70">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        <div className="flex items-start space-x-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#38bdf8] text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div className="relative rounded-2xl rounded-tl-none bg-[#1e293b] p-3 text-xs leading-relaxed text-slate-200">
            <p>
              Hello! I&apos;m your AI assistant. Upload a document and I&apos;ll
              help you understand its content!
            </p>
            <span className="mt-2 block text-[10px] text-slate-500">
              02:35 PM
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Input Area */}
      <div className="border-t border-slate-100 p-4">
        <div className="relative flex items-center gap-2">
          <Input
            placeholder="Ask a question..."
            className="h-10 border-none bg-slate-100 pr-10 text-sm focus-visible:ring-0"
          />
          <Button
            size="icon"
            className="h-8 w-8 rounded-lg bg-[#99f1ff] text-[#0891b2] hover:bg-[#99f1ff]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] text-orange-500">
          Upload a document to start chatting
        </p>
      </div>
    </div>
  )
}
