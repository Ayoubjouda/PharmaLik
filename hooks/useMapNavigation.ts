import { useEffect } from 'react';
import useAppStore from 'services/zustand/store';
import { useDirection } from './useDirections';

const useMapNavigation = () => {
  const { isTripStarted, selectedPharmacy, currentUserLocation } =
    useAppStore();
  const { getDirections } = useDirection();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    // Function to make the request
    const startTracking = async () => {
      // Check if the condition is still true
      if (!isTripStarted && !selectedPharmacy) {
        if (!intervalId) return;
        clearInterval(intervalId);
      }

      if (!currentUserLocation || !selectedPharmacy) return;
      getDirections(currentUserLocation, selectedPharmacy);
      console.log('tracking');
    };

    // Set up the interval to make the request every second
    intervalId = setInterval(startTracking, 1000);

    // Clean up the interval when the component unmounts or when the condition changes
    return () => {
      if (!intervalId) return;
      clearInterval(intervalId);
    };
  }, [isTripStarted]);
};

export default useMapNavigation;
