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
      <h2 className="mb-10 text-center text-2xl font-semibold text-slate-100">
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
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#161b2c] transition-all hover:border-slate-700">
              <AccordionTrigger className="px-6 py-5 text-left font-medium text-slate-200 hover:text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 leading-relaxed text-slate-400">
                {faq.answer}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
