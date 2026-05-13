import PageHeader from '@/components/PageHeader'
import SearchBar from '@/components/Searchbar'
import FilterBar from './components/FilterBar'
import HistorySummaries from './components/HistorySummaries'

function History() {
  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <PageHeader title="History" desc="View your previous summaries" />
      <SearchBar />
      <FilterBar />
      <HistorySummaries />
    </div>
  )
}

export default History
