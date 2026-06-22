// upload/page.tsx
'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import FileUploadZone from './components/FileUploadZone'
import NewSummaryHeader from './components/NewSummaryHeader'
import SegmentedTabs from './components/SegmentedTabs'
import UrlInputSection from './components/UrlInputSection'
import ImageInputSection from './components/ImageInputSection'
import { useUploadStore, TabValue } from './store/useUploadStore'

export default function Upload() {
  const activeTab = useUploadStore((state) => state.activeTab)
  const setActiveTab = useUploadStore((state) => state.setActiveTab)
  const searchParams = useSearchParams()

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabValue | null

    // Check if the query param is valid before updating the state
    if (tabParam && ['files', 'link', 'image'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams, setActiveTab])

  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <NewSummaryHeader />
      <SegmentedTabs />

      {/* Switch panels conditionally based on state */}
      <div className="w-full transition-all duration-200">
        {activeTab === 'files' && <FileUploadZone />}
        {activeTab === 'link' && <UrlInputSection />}
        {activeTab === 'image' && <ImageInputSection />}
      </div>
    </div>
  )
}
