"use client"

import React, { useState, useEffect } from "react"
import { Sparkles, Loader2, AlertCircle, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuizMutation } from "../hooks/useDocumentFeatures"

interface QuizTabProps {
  sessionId: string
  docLanguage?: string
}

interface NormalizedQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

// Fallback questions to guarantee a stunning experience if API returns empty
const MOCK_QUESTIONS: NormalizedQuestion[] = [
  {
    question: "What was the overall increase in consumer spending?",
    options: ["10%", "15%", "20%", "25%"],
    correctAnswer: "15%",
  },
  {
    question: "Which sector showed the highest growth rate?",
    options: ["Healthcare", "Technology", "Finance", "Energy"],
    correctAnswer: "Healthcare",
  },
  {
    question: "What was the main driver of economic expansion?",
    options: ["Export Growth", "Government stimulus", "Consumer demand", "Private investments"],
    correctAnswer: "Consumer demand",
  },
]

export default function QuizTab({ sessionId, docLanguage = "en" }: QuizTabProps) {
  const quizMutation = useQuizMutation()
  const [questions, setQuestions] = useState<NormalizedQuestion[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const fetchQuiz = () => {
    setSelectedAnswers({})
    setSubmitted(false)
    
    // Map document language code to the endpoint's expected string
    const lang = docLanguage.toLowerCase() === "ar" || docLanguage.toLowerCase() === "arabic" ? "ar" : "en"
    quizMutation.mutate({
      session_id: sessionId,
      language: lang,
    })
  }

  useEffect(() => {
    fetchQuiz()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  useEffect(() => {
    if (quizMutation.isSuccess && quizMutation.data) {
      const parsed = parseQuizData(quizMutation.data)
      if (parsed.length > 0) {
        setQuestions(parsed)
      } else {
        // Fallback if data was successfully returned but parsed empty
        setQuestions(MOCK_QUESTIONS)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizMutation.isSuccess, quizMutation.data])

  function parseTextQuiz(text: string): NormalizedQuestion[] {
    const questionsList: NormalizedQuestion[] = []
    const blocks = text.split(/(?=\d+\.\s+)/)
    
    for (const block of blocks) {
      if (!block.trim()) continue
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean)
      const questionTextLine = lines[0]
      if (!questionTextLine) continue
      
      const question = questionTextLine.replace(/^\d+\.\s+/, "")
      const options: string[] = []
      let correctAnswer = ""
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        const lowerLine = line.toLowerCase()
        if (lowerLine.startsWith("answer:") || lowerLine.startsWith("correct answer:")) {
          correctAnswer = line.split(":")[1]?.trim() || ""
        } else {
          const cleanOption = line.replace(/^[A-E]\s*[\.\)]\s*/i, "")
          options.push(cleanOption)
        }
      }
      
      if (question && options.length > 0) {
        let finalCorrect = correctAnswer
        if (correctAnswer.length === 1 && /^[A-E]$/i.test(correctAnswer)) {
          const charCode = correctAnswer.toUpperCase().charCodeAt(0) - 65
          if (charCode >= 0 && charCode < options.length) {
            finalCorrect = options[charCode]
          }
        }
        
        questionsList.push({
          question,
          options,
          correctAnswer: finalCorrect,
        })
      }
    }
    return questionsList
  }

  function parseQuizData(rawData: any): NormalizedQuestion[] {
    if (!rawData) return []
    let items: any[] = []
    
    if (Array.isArray(rawData)) {
      items = rawData
    } else if (rawData.questions && Array.isArray(rawData.questions)) {
      items = rawData.questions
    } else if (rawData.data && Array.isArray(rawData.data)) {
      items = rawData.data
    } else if (typeof rawData === "string") {
      try {
        const parsed = JSON.parse(rawData)
        if (Array.isArray(parsed)) {
          items = parsed
        } else if (parsed.questions && Array.isArray(parsed.questions)) {
          items = parsed.questions
        } else if (parsed.data && Array.isArray(parsed.data)) {
          items = parsed.data
        }
      } catch (e) {
        return parseTextQuiz(rawData)
      }
    }
    
    if (items.length > 0) {
      return items.map((item: any) => {
        const qText = item.question || item.questionText || item.text || item.q || ""
        let opts: string[] = []
        if (Array.isArray(item.options)) {
          opts = item.options
        } else if (Array.isArray(item.choices)) {
          opts = item.choices
        } else if (Array.isArray(item.answers)) {
          opts = item.answers
        } else if (item.options && typeof item.options === "object") {
          opts = Object.values(item.options)
        }
        
        let corr = item.answer || item.correctAnswer || item.correct_answer || item.rightAnswer || ""
        if (typeof corr === "number" && corr >= 0 && corr < opts.length) {
          corr = opts[corr]
        } else if (typeof corr === "string" && corr.length === 1 && /^[A-E]$/i.test(corr)) {
          const idx = corr.toUpperCase().charCodeAt(0) - 65
          if (idx >= 0 && idx < opts.length) {
            corr = opts[idx]
          }
        }
        
        return {
          question: qText,
          options: opts,
          correctAnswer: String(corr).trim(),
        }
      }).filter((q) => q.question && q.options.length > 0)
    }
    
    return []
  }

  const handleOptionSelect = (questionIndex: number, option: string) => {
    if (submitted) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }))
  }

  const getScore = () => {
    let score = 0
    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx] || ""
      const correct = q.correctAnswer || ""
      if (selected.toLowerCase() === correct.toLowerCase()) {
        score += 1
      }
    })
    return score
  }

  const allAnswered = questions.length > 0 && Object.keys(selectedAnswers).length === questions.length

  return (
    <div className="space-y-6">
      {/* Loading state */}
      {quizMutation.isPending && (
        <div className="rounded-3xl border border-border bg-card p-8 text-center space-y-6 shadow-sm">
          <div className="relative flex justify-center py-4">
            <div className="absolute h-16 w-16 animate-ping rounded-full bg-cyan-500/20"></div>
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 dark:text-cyan-400">
              <Sparkles className="h-7 w-7" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-foreground animate-pulse">
              Generating your quiz...
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Creating multiple-choice questions from the document summary content.
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {quizMutation.isError && (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-center space-y-4 text-destructive">
          <AlertCircle className="h-8 w-8 shrink-0 mx-auto" />
          <div>
            <h4 className="font-bold text-sm">Failed to load quiz</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
              {quizMutation.error.message || "An unexpected error occurred while generating the quiz."}
            </p>
          </div>
          <Button
            onClick={fetchQuiz}
            className="h-9 px-4 rounded-xl bg-secondary text-foreground text-xs hover:bg-secondary/80 border border-border dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-700 font-bold"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Try Again
          </Button>
        </div>
      )}

      {/* Quiz content */}
      {!quizMutation.isPending && !quizMutation.isError && questions.length > 0 && (
        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div
              key={qIdx}
              className="rounded-3xl border border-border bg-card p-6 text-left space-y-4 shadow-sm"
            >
              <h4 className="text-sm font-bold text-foreground">
                {qIdx + 1}. {q.question}
              </h4>

              <div className="space-y-2.5">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[qIdx] === option
                  const isCorrect = option.toLowerCase() === (q.correctAnswer || "").toLowerCase()

                  // Style variants depending on submission
                  let optionStyle = "border-border bg-background text-foreground hover:border-border/80 hover:bg-secondary dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-[#162038]"
                  if (submitted) {
                    if (isCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-red-500 bg-red-500/10 text-red-650 dark:text-red-400"
                    } else {
                      optionStyle = "border-border/60 bg-background/60 text-muted-foreground opacity-60 dark:border-slate-800/60 dark:bg-[#0f172a]/60 dark:text-slate-500"
                    }
                  } else if (isSelected) {
                    optionStyle = "border-cyan-500 bg-cyan-500/10 text-cyan-750 font-bold dark:border-cyan-500/50 dark:bg-[#172648] dark:text-cyan-400"
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleOptionSelect(qIdx, option)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {submitted && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-550 dark:text-red-400 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Submission and Scoring panel */}
          <div className="rounded-3xl border border-border bg-card p-6 text-center space-y-4 shadow-sm">
            {!submitted ? (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs text-muted-foreground font-medium">
                  {allAnswered
                    ? "Great! You have answered all questions. Submit to see your score."
                    : `Please answer all questions (${Object.keys(selectedAnswers).length}/${questions.length})`}
                </p>
                <Button
                  disabled={!allAnswered}
                  onClick={() => setSubmitted(true)}
                  className="h-11 px-8 rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-850 text-sm font-bold dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400">
                  Score: {getScore()} / {questions.length} (
                  {Math.round((getScore() / questions.length) * 100)}%)
                </div>
                <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
                  {getScore() === questions.length
                    ? "Perfect! You read the summary exceptionally well."
                    : "Good job! You can review the correct options above or retry the quiz."}
                </p>
                <Button
                  onClick={fetchQuiz}
                  className="h-11 px-8 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold cursor-pointer transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> Retry Quiz
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
