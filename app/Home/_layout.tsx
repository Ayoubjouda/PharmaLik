import { Slot } from 'expo-router';

import NavBar from 'components/NavBar';
import { View } from 'react-native';
import { Menu } from 'components';

export default function HomeLayout() {
  return (
    <View>
      <NavBar />
      <Menu isMenuOpen />
      <Slot screenOptions={{ headerShown: false }} />
    </View>
  );
}
