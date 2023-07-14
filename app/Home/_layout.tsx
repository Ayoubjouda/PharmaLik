import { Slot } from 'expo-router';

import NavBar from 'components/NavBar';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View>
      <NavBar />
      <Slot screenOptions={{ headerShown: false }} />
    </View>
  );
}
