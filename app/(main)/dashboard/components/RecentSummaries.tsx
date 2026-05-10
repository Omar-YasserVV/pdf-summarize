import Link from 'next/link'
import { SummaryItem } from './SummaryItem'

const recentData = [
  {
    id: 1,
    title: 'Q3 Market Analysis Report.pdf',
    timestamp: 'Yesterday, 02:45 AM',
    size: '2.1 MB',
    language: 'BOTH' as const,
  },
  {
    id: 2,
    title: 'The Future of Generative AI is Here...',
    timestamp: 'Yesterday',
    language: 'EN' as const,
  },
  {
    id: 3,
    title: 'Meeting Notes Whiteboard.jpg',
    timestamp: 'Jan 3, 2026',
    language: 'AR' as const,
  },
]

export default function RecentSummaries() {
  return (
    <section className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-white">Recent Summaries</h2>
        <Link
          href="/history"
          className="text-sm font-medium text-sky-500 transition-colors hover:text-sky-400"
        >
          View All →
        </Link>
      </div>

      {/* List of Summaries */}
      <div className="flex flex-col gap-3">
        {recentData.map((item) => (
          <SummaryItem
            key={item.id}
            title={item.title}
            timestamp={item.timestamp}
            size={item.size}
            language={item.language}
          />
        ))}
      </div>
    </section>
  )
}
