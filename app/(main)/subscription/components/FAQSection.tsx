import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS, FAQItem } from "../constants/faq"

export default function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      {/* Title */}
      <h2 className="mb-10 text-center text-2xl font-semibold text-foreground">
        Frequently Asked Questions
      </h2>

      {/* Accordion List */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {FAQS.map((faq: FAQItem, index: number) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-none" // Removing default shadcn border
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-border/80">
              <AccordionTrigger className="px-6 py-5 text-left font-medium text-foreground hover:text-foreground/80 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
