import { create } from 'zustand'

export type FilterType = 'all' | 'files' | 'links' | 'images'
export type FilterLanguage = 'all' | 'english' | 'arabic' | 'both'

interface FilterState {
  type: FilterType
  language: FilterLanguage
  searchQuery: string
  setType: (type: FilterType) => void
  setLanguage: (lang: FilterLanguage) => void
  setSearchQuery: (searchQuery: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  type: 'all',
  language: 'all',
  searchQuery: '',
  setType: (type) => set({ type }),
  setLanguage: (language) => set({ language }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))

