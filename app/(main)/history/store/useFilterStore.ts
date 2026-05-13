import { create } from 'zustand'

export type FilterType = 'all' | 'files' | 'links' | 'images'
export type FilterLanguage = 'all' | 'english' | 'arabic' | 'both'

interface FilterState {
  type: FilterType
  language: FilterLanguage
  setType: (type: FilterType) => void
  setLanguage: (lang: FilterLanguage) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  type: 'all',
  language: 'all',
  setType: (type) => set({ type }),
  setLanguage: (language) => set({ language }),
}))
