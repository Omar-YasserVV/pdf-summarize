import FAQSection from "./components/FAQSection"
import PricingCardSections from "./components/PricingCardSections"
import PricingFooter from "./components/PricingFooter"
import PricingHeader from "./components/PricingHeader"

function Subscription() {
  return (
    <div className="flex flex-col gap-5 py-5">
      <PricingHeader />
      <PricingCardSections />
      <FAQSection />
      <PricingFooter />
    </div>
  )
}

export default Subscription
