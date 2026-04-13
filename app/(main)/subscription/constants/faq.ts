export interface FAQItem {
  question: string
  answer: string
}

export const FAQS: FAQItem[] = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "New users get a 7-day free trial with access to all Professional features. No credit card required to start your trial.",
  },
  {
    question: "What happens to my documents if I downgrade?",
    answer:
      "Your previously processed documents remain accessible. However, you'll be limited to the number of new documents allowed by your new plan.",
  },
]
