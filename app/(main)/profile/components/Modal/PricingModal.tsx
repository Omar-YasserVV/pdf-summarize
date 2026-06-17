'use client'

import { useState } from 'react'
import { Check, Circle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PlanId } from '../../types/pricing'
import { plans } from '../../constants/Pricing'

interface PricingModalProps {
  setIsOpened: (open: boolean) => void
}

export default function PricingModal({ setIsOpened }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('pro')

  const handleSubmit = (planId: PlanId) => {
    console.log(`Submitted plan: ${planId}`)
    setIsOpened(false)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-secondary p-6 shadow-2xl">
      {/* Sticky Header Section inside the Modal */}
      <div className="mb-4 pr-2">
        <h2 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
          Choose Your Plan
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Select the best workspace tier to streamline your automated
          summarization workflow.
        </p>
      </div>

      {/* Scrollable Container Elements for the Tiers */}
      {/* Note: Added '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' to hide scrollbars */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id
          const isPro = plan.id === 'pro'
          const isCurrentPlan = plan.id === 'free' // Change according to your actual user state status

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                'relative flex cursor-pointer flex-col rounded-2xl border p-5 transition-all duration-300 select-none',
                isSelected
                  ? 'border-cyan-400 bg-secondary shadow-[0_0_25px_-5px_rgba(34,211,238,0.25)]'
                  : 'border-slate-800/60 bg-[#0e1324]/40 hover:border-slate-700'
              )}
            >
              {/* Top Row: Title, Badges & Selection Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                  {plan.badge && (
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide',
                        isPro
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      )}
                    >
                      {plan.badge.text}
                    </span>
                  )}
                </div>

                {/* Selection Icon */}
                <div className="flex h-5 w-5 items-center justify-center">
                  {isSelected ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                      <Check className="h-3.5 w-3.5 stroke-3" />
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 stroke-[1.5] text-slate-600" />
                  )}
                </div>
              </div>

              {/* Subtitle / Description */}
              <p className="mt-1 text-xs text-slate-400">{plan.description}</p>

              {/* Pricing Display */}
              <div className="mt-3">
                <span className="text-xl font-extrabold tracking-tight text-cyan-400 md:text-2xl">
                  {plan.price}
                </span>
              </div>

              {/* Feature Checkmarks Checklist */}
              <ul className="mt-4 mb-5 space-y-2.5">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 md:text-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[2.5] text-cyan-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Submit Button per Option Panel */}
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent toggling row select loop
                    handleSubmit(plan.id)
                  }}
                  disabled={isCurrentPlan}
                  className={cn(
                    'mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-slate-950 transition-all duration-200 active:scale-[0.99]',
                    isCurrentPlan
                      ? 'cursor-not-allowed border border-slate-700/50 bg-slate-800 text-slate-500'
                      : 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:bg-cyan-300'
                  )}
                >
                  <span>{plan.buttonText}</span>
                  {!isCurrentPlan && (
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  )}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Catchy UI Overlay: Fades out the content at the bottom to naturally prompt scrolling */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 bg-linear-to-t from-secondary via-secondary/80 to-transparent" />
    </div>
  )
}
