import { ActivityItem, ActivityStatus } from './ActivityItem'

const activityData = [
  {
    id: 1,
    title: 'Summary ready',
    description: 'Q3 Market Analysis Report has been summarized successfully',
    timestamp: '5 min ago',
    status: 'success' as ActivityStatus,
  },
  {
    id: 2,
    title: 'Upload completed',
    description: 'Your file has been uploaded and processed',
    timestamp: '1 hour ago',
    status: 'success' as ActivityStatus,
  },
  {
    id: 3,
    title: 'Processing large file',
    description: 'Annual Report 2025.docx is being analyzed',
    timestamp: '2 hours ago',
    status: 'processing' as ActivityStatus,
  },
  {
    id: 4,
    title: 'File too large',
    description:
      'The uploaded file exceeds the 50MB limit. Please try a smaller file.',
    timestamp: 'Yesterday',
    status: 'error' as ActivityStatus,
  },
  {
    id: 5,
    title: 'Export completed',
    description: 'Your summary has been exported as PDF',
    timestamp: '2 days ago',
    status: 'success' as ActivityStatus,
  },
]

export default function RecentActivity() {
  return (
    <section className="w-full space-y-4">
      {/* Section Title */}
      <div className="px-1">
        <h2 className="text-lg font-bold text-white">Recent Activity</h2>
      </div>

      {/* Feed List Container */}
      <div className="flex flex-col gap-3">
        {activityData.map((activity) => (
          <ActivityItem
            key={activity.id}
            title={activity.title}
            description={activity.description}
            timestamp={activity.timestamp}
            status={activity.status}
          />
        ))}
      </div>
    </section>
  )
}
