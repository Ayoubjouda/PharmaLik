import { FC, useEffect } from 'react';
import { Alert, View, ViewProps } from 'react-native';
import * as Location from 'expo-location';
import { Map } from 'components';
import AsyncStorage from '@react-native-async-storage/async-storage';

type indexProps = ViewProps;

const index: FC<indexProps> = () => {
  AsyncStorage.setItem('isFirstTimeOpen', 'false');

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'Sorry, we need location permissions to make this work!',
            [{ text: 'Okay' }]
          );
          return;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <View
      className="flex-1 bg-black"
      testID="Home-Screen"
    >
      <Map />
    </View>
  );
};

export default index;
