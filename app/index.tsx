import { Redirect, useRootNavigationState } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
export default function Page() {
  const rootNavigationState = useRootNavigationState();
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchFirstTimeOpen = async () => {
      const result = await AsyncStorage.getItem('isFirstTimeOpen');
      if (result === null) setIsFirstTimeLoad(true);
      setLoading(false);
    };

    fetchFirstTimeOpen();
  }, []);
  if (!rootNavigationState?.key) return null;

  if (loading) return null;
  if (isFirstTimeLoad) return <Redirect href="/onboarding" />;
  if (!isFirstTimeLoad) return <Redirect href="/Home" />;
}
