import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
}

const useAppStore = create<AppState>()((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
export default useAppStore;
