import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  pharmacies: Pharmacy[];
  selectedPharmacy: Pharmacy | null;
  coords: LatLng[];
  setPharmacies: (pharmacies: Pharmacy[]) => void;
  setCoords: (coords: LatLng[]) => void;
  setIsMenuOpen: () => void;
  setSelectedPharmacy: (pharmacy: Pharmacy | null) => void;
}

const useAppStore = create<AppState>()((set) => ({
  isMenuOpen: false,
  selectedPharmacy: null,
  pharmacies: [],
  coords: [],
  setCoords: (coords: LatLng[]) => set(() => ({ coords })),
  setPharmacies: (pharmacies: Pharmacy[]) => set(() => ({ pharmacies })),
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setSelectedPharmacy: (pharmacy) =>
    set(() => ({ selectedPharmacy: pharmacy })),
}));
export default useAppStore;
