"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Lightbulb, Loader2, User, Bot, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatMutation } from "../hooks/useDocumentFeatures"

interface ChatTabProps {
  sessionId: string
}

interface Message {
  id: string
  sender: "user" | "bot"
  text: string
  timestamp: string
}

export default function ChatTab({ sessionId }: ChatTabProps) {
  const chatMutation = useChatMutation()
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hi! I'm here to answer questions about this summary. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || chatMutation.isPending) return

    const userMessageText = inputText.trim()
    setInputText("")

    // Add user message immediately
    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await chatMutation.mutateAsync({
        session_id: sessionId,
        message: userMessageText,
      })

      // Try to parse the answer from response
      const botAnswer = response
        ? typeof response === "string"
          ? response
          : response.answer || response.message || response.response || JSON.stringify(response)
        : "Sorry, I didn't get a proper response."

      const botMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err: any) {
      const errorMessage: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: `Error: ${err.message || "Could not get response from AI assistant."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col h-[550px]">
      {/* Informative Lightbulb Badge */}
      <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 p-3.5 text-xs font-semibold text-cyan-800 mb-4 text-left dark:border-cyan-500/20 dark:bg-[#0e172a]/80 dark:text-cyan-400">
        <Lightbulb className="h-4.5 w-4.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
        <span>Answers are based only on this summary</span>
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
                  isUser
                    ? "bg-cyan-150 text-cyan-750 dark:bg-cyan-500/10 dark:text-cyan-400"
                    : "bg-secondary text-foreground dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {isUser ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? "bg-cyan-50 text-foreground rounded-tr-none border border-cyan-200 dark:bg-cyan-500/10 dark:text-slate-100 dark:border-cyan-500/15"
                      : "bg-secondary text-foreground rounded-tl-none border border-border dark:bg-[#0f172a] dark:text-slate-300 dark:border-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-muted-foreground/70 px-1 font-medium tracking-wide">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          )
        })}

        {/* Loading Spinner for chatbot thinking */}
        {chatMutation.isPending && (
          <div className="flex items-start gap-2.5 mr-auto text-left max-w-[85%]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary text-foreground dark:bg-slate-800 dark:text-slate-300">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div className="rounded-2xl rounded-tl-none border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-muted-foreground flex items-center gap-2 dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-450">
              <Loader2 className="h-4 w-4 animate-spin text-cyan-600 dark:text-cyan-400" />
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
          placeholder="Ask about this summary..."
          disabled={chatMutation.isPending}
          className="flex-1 h-11 border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary rounded-xl dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus-visible:ring-cyan-500"
        />
        <Button
          type="submit"
          disabled={!inputText.trim() || chatMutation.isPending}
          className="h-11 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
          <span>Send</span>
        </Button>
      </form>
    </div>
  )
}
