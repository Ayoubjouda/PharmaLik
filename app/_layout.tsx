import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { useFonts } from 'expo-font';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  }),
});

export default function HomeLayout() {
  NativeWindStyleSheet.setOutput({
    default: 'native',
  });
  const customFonts = {
    'Satoshi-Black': require('assets/fonts/Satoshi-Black.otf'),
    'Satoshi-Bold': require('assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Light': require('assets/fonts/Satoshi-Light.otf'),
    'Satoshi-Medium': require('assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Regular': require('assets/fonts/Satoshi-Regular.otf'),
  };
  const [loadedFont] = useFonts(customFonts);

  if (!loadedFont) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </QueryClientProvider>
  );
}
