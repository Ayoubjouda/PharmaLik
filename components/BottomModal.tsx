import Button from './Button';

import { useMemo, useCallback, forwardRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PhoneIcon, DistanceIcon } from 'assets/icons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import useAppStore from 'zustand/store';
import { useQueryClient } from '@tanstack/react-query';

const BottomModal = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '35%'], []);
  const { selectedPharmacy, setSelectedPharmacy, setCoords } = useAppStore();
  const queryClient = useQueryClient();
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClose = () => {
    if (typeof ref === 'function') return;
    if (ref && ref.current) {
      ref.current.close();
    }
    setSelectedPharmacy(null);
    setCoords([]);
    queryClient.invalidateQueries({ queryKey: ['pharmacies'] });
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        handleComponent={() => null}
      >
        <View className="relative items-center gap-10 ">
          <Button
            variant={'icon'}
            size={'icon'}
            text={'icon'}
            onPress={handleClose}
            className="absolute z-30 w-8 h-8 p-1 top-3 right-8"
          >
            <Feather
              name="x"
              size={24}
              color="black"
            />
          </Button>
          <View className="w-[361px]  bg-white rounded-xl shadow flex-col justify-start items-start inline-flex ">
            <View className="w-full px-4 py-4 gap-y-3">
              <View className="">
                <View className="flex-row justify-between w-full">
                  <Text className="text-lg font-bold leading-normal text-black">
                    {selectedPharmacy?.title}
                  </Text>
                </View>
                <View>
                  <Text
                    className="max-w-full text-lg font-normal leading-normal text-neutral-500 "
                    numberOfLines={1}
                  >
                    {selectedPharmacy?.address}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <TouchableOpacity className="flex-row items-center self-start justify-center p-2 gap-x-1 bg-neutral-10 rounded-xl">
                  <SvgXml
                    xml={PhoneIcon}
                    className="fill-neutral-50 stroke-neutral-50"
                  />
                  <Text className="text-lg font-normal leading-normal text-neutral-80 ">
                    {selectedPharmacy?.Phone}
                  </Text>
                </TouchableOpacity>
                <View className="flex-row items-center gap-1">
                  <SvgXml xml={DistanceIcon} />
                  <Text className="text-lg font-bold text-neutral-80">
                    {selectedPharmacy?.distance.toFixed(2)} KM
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Button
            variant={'primary'}
            text={'primary'}
            label="Go to pharmacy"
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});
BottomModal.displayName = 'BottomModal';

export default BottomModal;
