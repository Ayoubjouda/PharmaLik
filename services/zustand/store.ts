import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  pharmacies: Pharmacy[];
  selectedPharmacy: Pharmacy | null;
  coords: LatLng[];
  isTripStarted: boolean;
  language: string;
  currentUserLocation: LatLng | null;
  selectedAdress: LatLng;
  setPharmacies: (pharmacies: Pharmacy[]) => void;
  setCoords: (coords: LatLng[]) => void;
  setIsMenuOpen: () => void;
  setIsTripStarted: (isTripStarted: boolean) => void;
  setSelectedPharmacy: (pharmacy: Pharmacy | null) => void;
  setSelectedLanguage: (language: string) => void;
  setCurrentUserLocation: (currentUserLocation: LatLng) => void;
  setSelectedAdress: (selectedAdress: LatLng) => void;
}

const useAppStore = create<AppState>()((set) => ({
  currentUserLocation: null,
  isMenuOpen: false,
  isTripStarted: false,
  selectedPharmacy: null,
  pharmacies: [],
  coords: [],
  selectedAdress: {} as LatLng,
  language: 'en',
  setCurrentUserLocation: (currentUserLocation: LatLng) =>
    set(() => ({ currentUserLocation })),
  setSelectedLanguage: (language: string) => set(() => ({ language })),
  setCoords: (coords: LatLng[]) => set(() => ({ coords })),
  setPharmacies: (pharmacies: Pharmacy[]) => set(() => ({ pharmacies })),
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setIsTripStarted: (isTripStarted: boolean) =>
    set(() => ({ isTripStarted: isTripStarted })),
  setSelectedPharmacy: (pharmacy) =>
    set(() => ({ selectedPharmacy: pharmacy })),
  setSelectedAdress: (selectedAdress) => set(() => ({ selectedAdress })),
}));
export default useAppStore;
