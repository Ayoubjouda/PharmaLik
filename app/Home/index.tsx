import { Input } from 'components';
import { FC, useRef, useMemo, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
  Text,
  Keyboard,
} from 'react-native';
import { SearchIcon } from 'assets/icons';

import BottomSheet from '@gorhom/bottom-sheet';
type indexProps = ViewProps;

const index: FC<indexProps> = () => {
  // secound bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '85%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    }
  }, []);

  return (
    <View
      className="flex-1"
      testID="Home-Screen"
    >
      <View className="flex-1 bg-black -z-1">
        <TouchableOpacity
          className="mt-16"
          onPress={() => console.log('f')}
        >
          <Text className="text-white">Open the modal</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        keyboardBehavior="fillParent"
      >
        <View>
          <Text className="mx-5 mt-6 text-2xl font-bold leading-7 text-black">
            Search for a pharmacy
          </Text>
          <View className="h-[1px] my-5 bg-neutral-30"></View>
          <View className="mx-5">
            <Input
              placeholder="Search for a pharmacy"
              className="bg-neutral-10"
              leftIcon={SearchIcon}
              placeholderTextColor={'#798D87'}
              onPressIn={() => {
                bottomSheetRef.current?.snapToIndex(1);
                handleSheetChanges(1);
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default index;
