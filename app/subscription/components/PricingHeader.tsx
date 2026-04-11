import { Zap } from "lucide-react"

export default function PricingHeader() {
  return (
    <div className="w-full space-y-8">
      {/* Top Text Section */}
      <div className="space-y-2 text-center">
        <h2 className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
          Select the perfect plan for your document summarization needs. Upgrade
          or downgrade anytime.
        </h2>
      </div>

      {/* Trial Banner */}
      <div className="px-4">
        <div className="group relative overflow-hidden rounded-2xl border border-[#fbbf24]/30 bg-[#161b2c] p-4 shadow-2xl shadow-amber-900/10 md:p-5">
          <div className="flex items-center gap-4">
            {/* Icon Box */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fbbf24] text-slate-900">
              <Zap className="h-6 w-6 fill-current" />
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-slate-100">
                Trial Period Active
              </h3>
              <p className="text-sm text-slate-400">
                5 days remaining - Upgrade to unlock full features
              </p>
            </div>
          </div>

          {/* Subtle Background Glow Effect */}
          <div className="pointer-events-none absolute inset-0 bg-[#fbbf24]/6 to-transparent" />
        </div>
      </div>
    </div>
  )
}
