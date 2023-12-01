import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  Text,
} from 'react-native';
import Slide from './Slide';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

const slideList = [
  {
    id: 1,
    image:
      'https://ik.imagekit.io/zb5z1u26qn/PharmaLik/2.png?updatedAt=1699969663156',
    title: 'Search for near open pharmacies',
    subtitle:
      'Search by location or find near open pharmacies near you on the map.',
  },
  {
    id: 2,
    image:
      'https://ik.imagekit.io/zb5z1u26qn/PharmaLik/3.png?updatedAt=1699969663077',
    title: 'Go and get your medicines',
    subtitle:
      'Drive or walk to the selected pharmacy and pick up your medicines.',
  },
  {
    id: 3,
    image:
      'https://ik.imagekit.io/zb5z1u26qn/PharmaLik/1.png?updatedAt=1699969663004',
    title: 'Get back home quickly and safely',
    subtitle:
      'Pharmalik memorizes your starting location and helps you get back safely',
  },
];

function Pagination({ index }: { index: number }) {
  return (
    <View
      className="flex-row justify-center "
      pointerEvents="none"
    >
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            className={`${
              index === i
                ? 'bg-primary-60 w-10 h-2 rounded-md'
                : 'bg-gray-300 w-2 h-2 rounded'
            } mx-2`}
          />
        );
      })}
    </View>
  );
}
const Carousrel = () => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);

      const distance = Math.abs(roundIndex - index);

      // Prevent one pixel triggering setIndex in the middle
      // of the transition. With this we have to scroll a bit
      // more to trigger the index change.
      const isNoMansLand = 0.4 < distance;

      if (roundIndex !== indexRef.current && !isNoMansLand) {
        setIndex(roundIndex);
      }
    },
    []
  );

  // Use the index

  return (
    <View className="relative flex-1 w-screen">
      <FlatList
        data={slideList}
        style={{ flex: 1, width: '100%' }}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Slide data={item} />;
        }}
      />
      <View className="absolute flex items-center justify-center w-screen bottom-8">
        <Pagination index={index}></Pagination>
        {index === 2 ? (
          <Link
            href="/settings/languageScreen"
            asChild
          >
            <TouchableOpacity>
              <Text>Done</Text>
            </TouchableOpacity>
          </Link>
        ) : null}
      </View>
    </View>
  );
};

export default Carousrel;
