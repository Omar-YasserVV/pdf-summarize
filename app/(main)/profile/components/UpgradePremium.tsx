import { ArrowRight } from 'lucide-react'

export default function UpgradePremium() {
  return (
    <div className="w-full rounded-2xl border border-primary/50 bg-primary/10 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      {/* Header and Value Proposition Description */}
      <div className="space-y-1.5">
        <h3 className="text-base font-bold tracking-tight text-white md:text-lg">
          Upgrade to Premium
        </h3>
        <p className="max-w-md text-xs leading-relaxed text-slate-400 md:text-sm">
          Unlock unlimited summaries, advanced AI features, and priority
          support.
        </p>
      </div>

      {/* Prominent Glowing Call-to-Action */}
      <button className="mt-5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-[#2ec8f4] py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all hover:bg-[#22d3ee] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-[0.98]">
        <span>Upgrade Now</span>
        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
      </button>
    </div>
  )
}
