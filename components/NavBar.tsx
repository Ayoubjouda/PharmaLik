import { View } from 'react-native';
import { Button, EmergencyModal } from 'components';
import { SvgXml } from 'react-native-svg';
import { EmergencyIcon } from 'assets/icons';

import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const NavBar = () => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  return (
    <View className="bg-white max-w-[100vw]">
      <View className="flex flex-row justify-between w-full px-4 top-14">
        <Button
          variant={'icon'}
          size={'icon'}
          text={'icon'}
        >
          <Feather
            name="menu"
            size={24}
            color="black"
          />
        </Button>
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
export default NavBar;
