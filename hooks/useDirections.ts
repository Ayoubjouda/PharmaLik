import api from 'lib/axiosConfig';
import { LatLng } from 'react-native-maps';
import useAppStore from 'services/zustand/store';

export const useDirection = () => {
  const { setCoords } = useAppStore();
  const getDirections = async (
    currentUserLocation: LatLng,
    pharmacyDestination: Pharmacy
  ) => {
    try {
      const resp = await api.get(`pharmacy/direction`, {
        params: {
          start: `${currentUserLocation?.longitude},${currentUserLocation?.latitude}`,
          dest: `${pharmacyDestination.lng},${pharmacyDestination.lat}`,
        },
      });
      setCoords(resp.data as LatLng[]);
    } catch (error) {
      return error;
    }
  };
  return {
    getDirections,
  };
};
