import BottomSheet from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { Keyboard, View, Text } from 'react-native';
import Input from './Input';
import { SearchIcon } from 'assets/icons';

const ModalSheet = forwardRef<BottomSheet>((props, ref) => {
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    }
  }, []);
  const snapPoints = useMemo(() => ['25%', '85%'], []);

  return (
    <BottomSheet
      ref={ref}
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
              if (typeof ref === 'function') return;
              if (ref && ref.current) {
                ref.current?.snapToIndex(1);
                handleSheetChanges(1);
              }
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

ModalSheet.displayName = 'ModalSheet';
export default ModalSheet;
