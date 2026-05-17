'use client'

import { useUploadStore, TabValue } from '../store/useUploadStore' // adjust path

export default function SegmentedTabs() {
  const { activeTab, setActiveTab } = useUploadStore()

  const tabs = [
    { id: 'files', label: 'Files' },
    { id: 'link', label: 'Link' },
    { id: 'text', label: 'Text' },
  ] as const

  return (
    <div className="w-full">
      {/* Structural Outer Frame Wrapper */}
      <div className="relative grid w-full grid-cols-3 rounded-full border border-slate-800/60 bg-[#0e1324]/60 p-1.5 shadow-inner">
        {/* Dynamic Sliding Highlighting Background Capsule Track */}
        <div
          className="absolute top-1.5 bottom-1.5 rounded-full border border-cyan-500/20 bg-[#16223f] shadow-md transition-all duration-300 ease-out"
          style={{
            width: 'calc(33.3333% - 8px)',
            left: `calc(${tabs.findIndex((t) => t.id === activeTab) * 33.3333}% + ${
              tabs.findIndex((t) => t.id === activeTab) === 0
                ? '6px'
                : tabs.findIndex((t) => t.id === activeTab) === 1
                  ? '4px'
                  : '2px'
            })`,
          }}
        />

        {/* Individual Interactive Trigger Segment Controls */}
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabValue)}
              className={`relative z-10 flex h-9 w-full items-center justify-center rounded-full text-xs font-bold tracking-wide transition-colors duration-200 select-none md:text-sm ${
                isSelected
                  ? 'font-extrabold text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
