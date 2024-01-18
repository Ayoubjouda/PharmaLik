import React from 'react';
import { Image, Text, Dimensions, View } from 'react-native';

type SlideData = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const Slide = ({ data }: { data: SlideData }) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  return (
    <View className={`w-screen overflow-hidden px-10 mt-20`}>
      <Image
        source={{ uri: data.image }}
        style={{
          maxWidth: windowWidth - 40,
          width: '100%',
          height: windowHeight * 0.6,
          objectFit: 'fill',
        }}
      />
      <View className={`items-center w-full `}>
        <Text className="text-xl leading-tight text-center text-black font-SatoshiBold font-AvenirHeavy">
          {data.title}
        </Text>
        <Text className="text-xl leading-snug text-center text-gray-500 font-SatoshiMedium ">
          {data.subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Slide;
