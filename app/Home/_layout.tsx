import { Slot } from 'expo-router';

import NavBar from 'components/NavBar';

import { Menu } from 'components';

export default function HomeLayout() {
  return (
    <>
      <NavBar />
      <Menu />
      <Slot screenOptions={{ headerShown: false }} />
    </>
  );
}
