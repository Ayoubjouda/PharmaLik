import { Slot } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';

export default function HomeLayout() {
  NativeWindStyleSheet.setOutput({
    default: 'native',
  });
  return (
    <>
      <Slot />
    </>
  );
}
