import BottomSheet from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, View, Text } from 'react-native';
import Input from './Input';
import { SearchIcon } from 'assets/icons';
import { i18n } from '../services/i18n/i18next';
import axios from 'axios';
import { MapPin } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { useDebounce } from '@uidotdev/usehooks';
const ModalSheet = forwardRef<BottomSheet>((props, ref) => {
  const [Adresses, setAdresses] = useState([]);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    }
  }, []);
  const snapPoints = useMemo(() => ['25%', '85%'], []);
  const getdAdress = async (text: string) => {
    axios
      .get(`http://141.145.200.78:2322/api?q=${text}`)
      .then((resp) => setAdresses(resp.data.features));
  };

  const panRef = useRef(null);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      keyboardBehavior="fillParent"
    >
      <View className="h-full">
        <Text className="mx-5 mt-6 text-2xl font-bold leading-7 text-black">
          {i18n.t('search')}
        </Text>
        <View className="h-[1px] my-5 bg-neutral-30"></View>
        <View className="mx-5">
          <Input
            placeholder="Search for a pharmacy"
            className="bg-neutral-10"
            leftIcon={SearchIcon}
            placeholderTextColor={'#798D87'}
            onChangeText={(text) => getdAdress(text)}
            onPressIn={() => {
              if (typeof ref === 'function') return;
              if (ref && ref.current) {
                ref.current?.snapToIndex(1);
                handleSheetChanges(1);
              }
            }}
          />
        </View>
        {Adresses.length > 0 && (
          <View className="flex-1 h-full px-4">
            <PanGestureHandler>
              <FlashList
                data={Adresses}
                className="h-full px-4 pb-10"
                showsVerticalScrollIndicator={false}
                renderScrollComponent={ScrollView}
                estimatedItemSize={20}
                renderItem={({ item }) => {
                  return (
                    <View
                      key={item.properties.name}
                      className="flex flex-row items-center px-3 py-4 gap-x-2"
                    >
                      <MapPin color="black" />
                      <Text className="text-xl font-bold text-neutral-950 font-SatoshiBold">
                        {item.properties.name}
                      </Text>
                    </View>
                  );
                }}
              />
              {/* {Adresses.map((item: any) => (
              
            ))} */}
            </PanGestureHandler>
          </View>
        )}
      </View>
    </BottomSheet>
  );
});

ModalSheet.displayName = 'ModalSheet';
export default ModalSheet;
