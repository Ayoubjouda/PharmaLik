import Carousrel from 'components/Carousrel';
import React from 'react';
import { View } from 'react-native';

import { BackgroundVector } from 'assets/icons';
import { SvgXml } from 'react-native-svg';

const OnBoarding = () => {
  return (
    <View className="flex-1 w-screen bg-white ">
      <SvgXml
        className="absolute"
        xml={BackgroundVector}
      />
      <Carousrel />
    </View>
  );
};

export default OnBoarding;
