import { create } from 'zustand'
import type { MetadataResponse, DownloadHistoryItem } from '../types'

interface AppStore {
  metadata: MetadataResponse | null
  setMetadata: (metadata: MetadataResponse | null) => void
  
  isAnalyzing: boolean
  setIsAnalyzing: (analyzing: boolean) => void
  
  downloadHistory: DownloadHistoryItem[]
  setDownloadHistory: (history: DownloadHistoryItem[]) => void
  addToHistory: (item: DownloadHistoryItem) => void
  
  darkMode: boolean
  toggleDarkMode: () => void
  
  analyticsId: string | null
  setAnalyticsId: (id: string | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
  metadata: null,
  setMetadata: (metadata) => set({ metadata }),
  
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  downloadHistory: [],
  setDownloadHistory: (history) => set({ downloadHistory: history }),
  addToHistory: (item) => set((state) => ({
    downloadHistory: [item, ...state.downloadHistory],
  })),
  
  darkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.darkMode
    localStorage.setItem('darkMode', String(newDarkMode))
    return { darkMode: newDarkMode }
  }),
  
  analyticsId: localStorage.getItem('analyticsId'),
  setAnalyticsId: (id) => {
    if (id) localStorage.setItem('analyticsId', id)
    set({ analyticsId: id })
  },
}))
