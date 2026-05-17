import PageHeader from '@/components/PageHeader'
import SavedItems from './components/SavedItems'
import RecentActivity from './components/RecentActivity'

function Notifications() {
  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Notifications"
          desc="Stay updated on your summaries"
        />
        <button className="cursor-pointer font-medium text-primary">
          Mark all read
        </button>
      </div>
      <SavedItems itemsCount={0} />
      <RecentActivity />
    </div>
  )
}

export default Notifications
