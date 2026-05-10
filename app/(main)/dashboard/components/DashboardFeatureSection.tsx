import { features } from '../constants/FeatureCards'
import { DashboardFeatureCard } from './DashboardFeatureCard'

function DashboardFeatureSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:gap-10">
      {features.map((feature) => (
        <DashboardFeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          color={feature.color}
          bgColor={feature.bgColor}
          hoverRing={feature.hoverRing}
          href={feature.href}
        />
      ))}
    </div>
  )
}

export default DashboardFeatureSection
