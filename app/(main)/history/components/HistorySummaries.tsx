import { recentData } from '../../dashboard/constants/RecentSummaries'
import { SummaryItem } from '@/components/SummaryItem'

function HistorySummaries() {
  return (
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
  )
}

export default HistorySummaries
