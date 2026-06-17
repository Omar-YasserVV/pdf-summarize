export type PlanId = 'free' | 'pro' | 'team'

export interface PricingPlan {
  id: PlanId
  title: string
  badge?: {
    text: string
    variant: 'current' | 'popular'
  }
  description: string
  price: string
  features: string[]
  buttonText: string
}
