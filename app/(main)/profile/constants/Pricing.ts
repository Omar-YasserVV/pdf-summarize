import { PricingPlan } from '../types/pricing'

export const plans: PricingPlan[] = [
  {
    id: 'free',
    title: 'Free',
    badge: { text: 'Current Plan', variant: 'current' },
    description: 'Perfect for getting started',
    price: '$0',
    buttonText: 'Your Current Plan',
    features: [
      'Limited summaries per month',
      'Basic summary formats',
      'Standard processing',
      'History access',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    badge: { text: 'Most Popular', variant: 'popular' },
    description: 'For power users',
    price: '$9.99/month',
    buttonText: 'Upgrade to Pro',
    features: [
      'Unlimited summaries',
      'Arabic + English comparison',
      'OCR for images',
      'MCQ generation',
      'Voice playback',
      'Export to PDF / Word',
      'Faster processing',
    ],
  },
  {
    id: 'team',
    title: 'Team',
    description: 'For teams and businesses',
    price: '$19.99/month',
    buttonText: 'Upgrade to Team',
    features: [
      'Everything in Pro',
      'Shared workspace',
      'Multi-user access',
      'Priority support',
    ],
  },
]
