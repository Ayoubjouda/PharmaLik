import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps';
import useAppStore from 'services/zustand/store';

export const useLocation = () => {
  const { setCurrentUserLocation } = useAppStore();

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 10000,
        timeInterval: 5000,
      });
      setCurrentUserLocation(location.coords as LatLng);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getLocationAsync,
  };
};
