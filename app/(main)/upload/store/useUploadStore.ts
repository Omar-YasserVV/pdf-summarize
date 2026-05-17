// store/useUploadStore.ts
import { create } from 'zustand'

export type TabValue = 'files' | 'link' | 'text'

interface UploadState {
  activeTab: TabValue
  setActiveTab: (tab: TabValue) => void
}

export const useUploadStore = create<UploadState>((set) => ({
  activeTab: 'files', // default view
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
