import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRICING_PLANS } from "../constants/pricing"

export function PricingCard({ plan }: { plan: (typeof PRICING_PLANS)[0] }) {
  const Icon = plan.icon

  return (
    <div
      className={`relative flex flex-col rounded-3xl border bg-card p-8 ${plan.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/10`}
    >
      {/* Badge (Current Plan / Most Popular) */}
      {plan.badge && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1 text-[10px] font-bold tracking-wider uppercase ${plan.badgeColor} bg-card`}
        >
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`rounded-lg bg-secondary p-2 ${plan.isPopular ? "text-cyan-600 dark:text-cyan-400" : "text-muted-foreground"}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-lg font-medium text-foreground">{plan.name}</span>
      </div>

      {/* Pricing */}
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-foreground">${plan.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <p className="mb-8 text-xs text-muted-foreground">{plan.docsPerMonth}</p>

      {/* Features List */}
      <div className="mb-8 flex-1 space-y-4">
        {plan.features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 text-sm text-foreground/90"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button
        className={`h-11 w-full rounded-xl font-semibold transition-all ${
          plan.isCurrent
            ? "cursor-default bg-secondary text-muted-foreground hover:bg-secondary"
            : plan.isPopular
              ? "bg-cyan-400 text-slate-900 hover:bg-cyan-500"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {plan.buttonText}
      </Button>
    </div>
  )
}
