import SearchBar from '@/components/Searchbar'
import DashboardFeatureSection from './components/DashboardFeatureSection'
import RecentSummaries from './components/RecentSummaries'
// import DashboardFileUploadZone from './components/DashboardFileUploadZone'
// import DashboardSummarySettings from './components/DashboardSummarySettings'

function Dashboard() {
  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <SearchBar />
      <DashboardFeatureSection />
      <RecentSummaries />
      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DashboardFileUploadZone />
        </div>
        <div className="md:col-span-1">
          <DashboardSummarySettings />
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard
