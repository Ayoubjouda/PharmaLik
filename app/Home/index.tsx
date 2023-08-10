import { FC } from 'react';
import { View, ViewProps } from 'react-native';

import { Map } from 'components';

type indexProps = ViewProps;

const index: FC<indexProps> = () => {
  return (
    <View
      className="flex-1 bg-black"
      testID="Home-Screen"
    >
      <Map />
    </View>
  );
};

export default index;
