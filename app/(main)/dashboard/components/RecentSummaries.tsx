import Link from 'next/link'
import { SummaryItem } from '@/components/SummaryItem'
import { recentData } from '../constants/RecentSummaries'

export default function RecentSummaries() {
  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-white">Recent Summaries</h2>
        <Link
          href="/history"
          className="text-sm font-medium text-sky-500 transition-colors hover:text-sky-400"
        >
          View All →
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {recentData.map((item) => (
          <SummaryItem
            key={item.id}
            title={item.title}
            timestamp={item.timestamp}
            language={item.language}
            type={item.type}
            isFavorite={item.isFavorite}
          />
        ))}
      </div>
    </section>
  )
}
