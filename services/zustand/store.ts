import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  pharmacies: Pharmacy[];
  selectedPharmacy: Pharmacy | null;
  coords: LatLng[];
  isTripStarted: boolean;
  language: string;
  setPharmacies: (pharmacies: Pharmacy[]) => void;
  setCoords: (coords: LatLng[]) => void;
  setIsMenuOpen: () => void;
  setIsTripStarted: (isTripStarted: boolean) => void;
  setSelectedPharmacy: (pharmacy: Pharmacy | null) => void;
  setSelectedLanguage: (language: string) => void;
}

const useAppStore = create<AppState>()((set) => ({
  isMenuOpen: false,
  isTripStarted: false,
  selectedPharmacy: null,
  pharmacies: [],
  coords: [],
  language: 'en',
  setSelectedLanguage: (language: string) => set(() => ({ language })),
  setCoords: (coords: LatLng[]) => set(() => ({ coords })),
  setPharmacies: (pharmacies: Pharmacy[]) => set(() => ({ pharmacies })),
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setIsTripStarted: (isTripStarted: boolean) =>
    set(() => ({ isTripStarted: isTripStarted })),

  setSelectedPharmacy: (pharmacy) =>
    set(() => ({ selectedPharmacy: pharmacy })),
}));
export default useAppStore;
