import Button from './Button';

import { useMemo, useCallback, forwardRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { PhoneIcon, StarIcon } from 'assets/icons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SvgXml } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

const BottomModal = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClose = () => {
    if (typeof ref === 'function') return;
    if (ref && ref.current) {
      ref.current.close();
    }
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'transparent' }}
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
          <View className="w-[361px] h-[268px] bg-white rounded-xl shadow flex-col justify-start items-start inline-flex ">
            <View className="self-stretch h-[125px] rounded-tl-xl rounded-tr-xl justify-start items-start inline-flex">
              <Image
                className="w-full h-[125px] relative rounded-t-xl"
                source={{ uri: 'https://via.placeholder.com/125x125' }}
              />
            </View>
            <View className="w-full px-4 py-4 gap-y-3">
              <View className="">
                <View className="flex-row justify-between w-full">
                  <Text className="text-lg font-bold leading-normal text-black">
                    Pharmacie Haj Fateh
                  </Text>
                  <View className="flex-row items-center gap-x-1">
                    <SvgXml xml={StarIcon} />
                    <Text className="text-lg font-bold leading-normal text-black">
                      4.7
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    className="max-w-full text-lg font-normal leading-normal text-neutral-500 "
                    numberOfLines={1}
                  >
                    Lissassfa II Bloc D N° 250 Boulevard Ha eleme
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="flex-row items-center self-start justify-center p-2 gap-x-1 bg-neutral-10 rounded-xl">
                <SvgXml
                  xml={PhoneIcon}
                  className="fill-neutral-50 stroke-neutral-50"
                />
                <Text className="text-lg font-normal leading-normal text-neutral-80 ">
                  05 22 65 10 74
                </Text>
              </TouchableOpacity>
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
