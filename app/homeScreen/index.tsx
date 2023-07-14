import { EmergencyIcon } from 'assets/icons';
import { Button, EmergencyModal } from 'components';
import { FC, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { SvgXml } from 'react-native-svg';

type indexProps = ViewProps;

const index: FC<indexProps> = () => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <View className="relative">
      <View className="absolute flex-row justify-between top-3 ">
        <Button />
        <Button
          variant="emergency"
          text={'emergency'}
          label={'emergency'}
          onPress={() => setisModalOpen(true)}
        >
          <SvgXml
            xml={EmergencyIcon}
            className="fill-white stroke-white"
          />
        </Button>
      </View>
      <EmergencyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setisModalOpen}
      />
    </View>
  );
};

export default index;
