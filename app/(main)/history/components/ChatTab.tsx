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
    <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-6 shadow-2xl flex flex-col h-[550px]">
      {/* Informative Lightbulb Badge */}
      <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-[#0e172a]/80 p-3.5 text-xs font-semibold text-cyan-400 mb-4 text-left">
        <Lightbulb className="h-4.5 w-4.5 shrink-0 text-cyan-400" />
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
                  isUser ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-800 text-slate-300"
                }`}
              >
                {isUser ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? "bg-cyan-500/10 text-slate-100 rounded-tr-none border border-cyan-500/15"
                      : "bg-[#0f172a] text-slate-300 rounded-tl-none border border-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 px-1 font-medium tracking-wide">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          )
        })}

        {/* Loading Spinner for chatbot thinking */}
        {chatMutation.isPending && (
          <div className="flex items-start gap-2.5 mr-auto text-left max-w-[85%]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div className="rounded-2xl rounded-tl-none border border-slate-800 bg-[#0f172a] px-4 py-3 text-sm leading-relaxed text-slate-400 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form */}
      <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-800/80">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about this summary..."
          disabled={chatMutation.isPending}
          className="flex-1 h-11 border-slate-800 bg-[#0f172a] px-4 text-slate-300 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl"
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
  )
}
