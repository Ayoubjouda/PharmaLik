import Button from './Button';

import { useMemo, useCallback, forwardRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { PhoneIcon, DistanceIcon, ClockIcon } from 'assets/icons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import useAppStore from 'services/zustand/store';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from 'lib/utils';

interface BottomModalProps {
  handleOpenModalSheet: () => void;
}

const BottomModal = forwardRef<BottomSheetModal, BottomModalProps>(
  (props, ref) => {
    const { width: windowWidth, height: windowHeight } =
      Dimensions.get('window');

    const snapPoints = useMemo(() => ['25%', '40%'], []);
    const {
      selectedPharmacy,
      setSelectedPharmacy,
      setCoords,
      isTripStarted,
      setIsTripStarted,
    } = useAppStore();
    const queryClient = useQueryClient();
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    const handleClose = () => {
      if (typeof ref === 'function') return;
      if (ref && ref.current) {
        ref.current.close();
        props.handleOpenModalSheet();
      }
      setIsTripStarted(false);
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
          style={{
            maxWidth: windowWidth,
            width: '100%',
          }}
        >
          <View className="absolute flex flex-col items-center justify-center w-full mx-auto gap-y-10 bottom-8 h-fit">
            <View className="w-[361px]  bg-white rounded-xl shadow flex-col justify-start items-start inline-flex relative ">
              <Button
                variant={'icon'}
                size={'icon'}
                text={'icon'}
                onPress={handleClose}
                className="absolute z-30 w-8 h-8 p-1 top-3 right-5"
              >
                <Feather
                  name="x"
                  size={24}
                  color="black"
                />
              </Button>
              {!isTripStarted ? (
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
              ) : (
                <View className="w-full px-4 py-4 gap-y-3">
                  <View className="">
                    <View className="flex-row justify-between w-full">
                      <Text className="text-2xl font-bold leading-7 text-black max-w-[90%]">
                        You’re on your way to {selectedPharmacy?.title}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-1">
                      <SvgXml
                        xml={ClockIcon}
                        className="fill-neutral-50 stroke-neutral-50"
                        width={24}
                        height={24}
                      />
                      <Text className="text-neutral-500 text-[32px] font-normal leading-10">
                        5 Min
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-1">
                      <SvgXml
                        xml={DistanceIcon}
                        width={24}
                        height={24}
                      />
                      <Text className="text-neutral-500 text-[32px] font-normal leading-10">
                        {selectedPharmacy?.distance.toFixed(2)} KM
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <Button
              variant={'primary'}
              text={'primary'}
              label={isTripStarted ? 'Cancel Trip' : 'Go to pharmacy'}
              onPress={() => setIsTripStarted(!isTripStarted)}
              className={cn({ 'bg-red-500 ': isTripStarted })}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);
BottomModal.displayName = 'BottomModal';

export default BottomModal;
