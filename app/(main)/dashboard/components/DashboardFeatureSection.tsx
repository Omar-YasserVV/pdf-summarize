import { features } from "../constants/FeatureCards"
import { DashboardFeatureCard } from "./DashboardFeatureCard"

function DashboardFeatureSection() {
  return (
    <div className="grid grid-cols-3 gap-10">
      {features.map((feature) => (
        <DashboardFeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          color={feature.color}
        />
      ))}
    </div>
  )
}

export default DashboardFeatureSection
