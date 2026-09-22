import { create } from 'zustand'

export type NavView = 'home' | 'routine' | 'stats' | 'methods' | 'settings'

interface NavState {
  activeView: NavView
  setActiveView: (view: NavView) => void
}

export const useNavStore = create<NavState>((set) => ({
  activeView: 'home',
  setActiveView: (view) => set({ activeView: view })
}))
