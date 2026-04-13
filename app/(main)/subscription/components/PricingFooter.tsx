import { Button } from "@/components/ui/button"

export default function PricingFooter() {
  return (
    <div className="mt- mx-auto mb-20 w-full max-w-5xl px-4">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-800 bg-[#161b2c] p-8 shadow-xl md:flex-row">
        {/* Text Content */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-semibold text-slate-100">
            Need a custom solution?
          </h3>
          <p className="max-w-xl text-sm text-slate-400 md:text-base">
            Contact our sales team for enterprise pricing, custom integrations,
            and dedicated support.
          </p>
        </div>

        {/* Action Button */}
        <Button className="shrink-0 rounded-xl bg-cyan-400 px-8 py-6 font-bold text-slate-900 shadow-lg shadow-cyan-500/10 transition-all hover:bg-cyan-500">
          Contact Sales
        </Button>
      </div>
    </div>
  )
}
