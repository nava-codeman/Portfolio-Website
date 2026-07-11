import { create } from 'zustand';

export const useStore = create((set) => ({
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  closeProject: () => set({ activeProject: null }),
  
  // Audio state
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  // Loading state
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),

  // Scroll state
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
