import { FC, useRef } from 'react';
import { View, ViewProps } from 'react-native';

import { Map, ModalSheet } from 'components';
import BottomSheet from '@gorhom/bottom-sheet';

type indexProps = ViewProps;

const index: FC<indexProps> = () => {
  const modalSheetRef = useRef<BottomSheet>(null);

  return (
    <View
      className="flex-1 bg-black"
      testID="Home-Screen"
    >
      <Map />
      <ModalSheet ref={modalSheetRef} />
    </View>
  );
};

export default index;
