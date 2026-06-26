"use client"

import React, { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useHistoryQuery } from "../history/hooks/useHistory"
import { useChatMutation } from "../history/hooks/useDocumentFeatures"
import {
  Send,
  Lightbulb,
  Loader2,
  User,
  Bot,
  ChevronDown,
  Sparkles,
  MessageCircle,
  FileText,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Message {
  id: string
  sender: "user" | "bot"
  text: string
  timestamp: string
}

function AiAssistantContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlDocId = searchParams ? searchParams.get("docId") : null

  const { data: historyData, isLoading: historyLoading, isError: historyError } = useHistoryQuery()
  const chatMutation = useChatMutation()

  const historyItems = historyData?.data?.history || []

  const [selectedDocId, setSelectedDocId] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle clicking outside the custom dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Auto-select document from URL parameter if available
  useEffect(() => {
    if (urlDocId && historyItems.length > 0) {
      const docExists = historyItems.some((item) => item.id === urlDocId)
      if (docExists) {
        setSelectedDocId(urlDocId)
      }
    }
  }, [urlDocId, historyItems])

  // Reset chat messages when document selection changes
  useEffect(() => {
    if (selectedDocId) {
      const doc = historyItems.find((item) => item.id === selectedDocId)
      const docName = doc ? cleanTitle(doc.filename) : "this document"
      setMessages([
        {
          id: "initial",
          sender: "bot",
          text: `Hi! I'm here to answer questions about "${docName}". What would you like to know?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } else {
      setMessages([])
    }
  }, [selectedDocId])

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const selectedDoc = historyItems.find((item) => item.id === selectedDocId)

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDocId || !inputText.trim() || chatMutation.isPending) return

    const userMessageText = inputText.trim()
    setInputText("")

    // Add user message immediately
    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await chatMutation.mutateAsync({
        session_id: selectedDocId,
        message: userMessageText,
      })

      // Try to parse bot answer
      const botAnswer = response
        ? typeof response === "string"
          ? response
          : response.answer || response.message || response.response || JSON.stringify(response)
        : "Sorry, I didn't get a proper response from the assistant."

      const botMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err: any) {
      const errorMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: `Error: ${err.message || "Could not get response from AI assistant."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return (
    <div className="flex flex-col gap-6 py-5 select-none text-foreground max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1.5 text-left max-md:px-6">
        <div className="flex items-center gap-2.5 text-cyan-400">
          <MessageCircle className="h-6 w-6" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">AI Assistant</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Ask questions, verify details, and discuss key insights of any summarized document in your library.
        </p>
      </div>

      {/* Document Selector Area */}
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-2xl space-y-4 max-md:mx-6 text-left">
        <div className="space-y-2 relative" ref={dropdownRef}>
          <Label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-400" />
            Select Document to Chat With
          </Label>

          {historyLoading ? (
            <div className="h-11 flex items-center justify-center border border-border bg-background rounded-xl text-xs text-slate-405 dark:text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400 mr-2" />
              Loading your document library...
            </div>
          ) : historyError ? (
            <div className="p-3 border border-red-500/20 bg-red-500/5 rounded-xl text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Failed to load document library. Please refresh the page.
            </div>
          ) : historyItems.length === 0 ? (
            <div className="p-4 border border-border bg-secondary/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 text-center space-y-2">
              <p>No summarized documents available in history.</p>
              <Button
                onClick={() => router.push("/upload")}
                className="h-8 text-xs bg-cyan-400 text-slate-900 hover:bg-cyan-500 font-bold rounded-lg px-4"
              >
                Go to Upload
              </Button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-slate-700 dark:text-slate-300 flex items-center justify-between text-sm hover:border-slate-400 dark:hover:border-slate-705 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <span className="truncate">
                  {selectedDoc ? cleanTitle(selectedDoc.filename) : "Select a document from library..."}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 rounded-xl border border-border bg-card shadow-2xl max-h-56 overflow-y-auto p-1.5 space-y-1">
                  {historyItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedDocId(item.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                        selectedDocId === item.id
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200"
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
      </div>

      {/* Main Chat Interface */}
      <div className="max-md:px-6">
        {!selectedDocId ? (
          /* Empty Chat Placeholder */
          <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4 shadow-xl min-h-[400px] flex flex-col justify-center items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse mb-2">
              <Bot className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Document Selected</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Please choose a document from the dropdown above to start a conversation and ask questions about its content.
            </p>
          </div>
        ) : (
          /* Chat Window */
          <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl flex flex-col h-[550px] text-left">
            {/* Informative Lightbulb Badge */}
            <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-secondary/80 p-3.5 text-xs font-semibold text-cyan-500 dark:text-cyan-400 mb-4 select-none">
              <Lightbulb className="h-4.5 w-4.5 shrink-0 text-cyan-500 dark:text-cyan-400" />
              <span>Answers are based only on the contents of the selected document</span>
            </div>

            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 select-text">
              {messages.map((msg) => {
                const isUser = msg.sender === "user"
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isUser ? "ml-auto flex-row-reverse text-right" : "mr-auto text-left"
                    }`}
                  >
                    {/* Icon / Avatar */}
                    <div
                      className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-xl text-xs font-bold ${
                        isUser ? "bg-cyan-500/10 text-cyan-400" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isUser ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
                    </div>

                    {/* Message Bubble */}
                    <div className="space-y-1">
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          isUser
                            ? "bg-cyan-500/10 text-slate-900 dark:text-slate-100 rounded-tr-none border border-cyan-500/15"
                            : "bg-background text-slate-700 dark:text-slate-300 rounded-tl-none border border-border"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 px-1 font-medium tracking-wide block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Chatbot thinking loader */}
              {chatMutation.isPending && (
                <div className="flex items-start gap-2.5 mr-auto text-left max-w-[85%]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none border border-border bg-background px-4 py-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-border">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask a question about "${cleanTitle(selectedDoc?.filename || "")}"...`}
                disabled={chatMutation.isPending}
                className="flex-1 h-11 border-border bg-background px-4 text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl"
              />
              <Button
                type="submit"
                disabled={!inputText.trim() || chatMutation.isPending}
                className="h-11 px-5 rounded-xl bg-[#22d3ee] hover:bg-cyan-500 text-slate-900 font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AiAssistant() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-40 gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
          <p className="text-sm text-slate-400">Loading AI Assistant...</p>
        </div>
      }
    >
      <AiAssistantContent />
    </Suspense>
  )
}
