import { PRICING_PLANS } from "../constants/pricing"
import { PricingCard } from "./PricingCard"

function PricingCardSections() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  )
}

export default PricingCardSections
