import SearchBar from '@/components/Searchbar'
import DashboardFeatureSection from './components/DashboardFeatureSection'
import RecentSummaries from './components/RecentSummaries'
import Navbar from '@/components/Navbar'

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 py-5 max-md:px-6">
        <SearchBar />
        <DashboardFeatureSection />
        <RecentSummaries />
      </div>
    </>
  )
}

export default Dashboard
