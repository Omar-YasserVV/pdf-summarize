'use client'

import FileUploadZone from './components/FileUploadZone'
import NewSummaryHeader from './components/NewSummaryHeader'
import SegmentedTabs from './components/SegmentedTabs'
import UrlInputSection from './components/UrlInputSection'
import TextInputSection from './components/TextInputSection'
import { useUploadStore } from './store/useUploadStore' // adjust path

export default function Upload() {
  const activeTab = useUploadStore((state) => state.activeTab)

  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <NewSummaryHeader />
      <SegmentedTabs />

      {/* Switch panels conditionally based on state */}
      <div className="w-full transition-all duration-200">
        {activeTab === 'files' && <FileUploadZone />}
        {activeTab === 'link' && <UrlInputSection />}
        {activeTab === 'text' && <TextInputSection />}
      </div>
    </div>
  )
}
