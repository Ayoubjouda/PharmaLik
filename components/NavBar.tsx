import { View } from 'react-native';
import { Button, EmergencyModal } from 'components';
import { SvgXml } from 'react-native-svg';
import { EmergencyIcon } from 'assets/icons';

import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import useAppStore from 'zustand/store';

const NavBar = () => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  const { isMenuOpen, setIsMenuOpen } = useAppStore();
  return (
    <View className={`bg-white max-w-[100vw] z-10 `}>
      <View
        className={`relative flex flex-row justify-between w-full px-4 top-14 pb-3 ${
          isMenuOpen ? 'bg-white' : ''
        }`}
      >
        <Button
          variant={'icon'}
          size={'icon'}
          text={'icon'}
          onPress={setIsMenuOpen}
        >
          {!isMenuOpen ? (
            <Feather
              name="menu"
              size={24}
              color="black"
            />
          ) : (
            <Feather
              name="x"
              size={24}
              color="black"
            />
          )}
        </Button>
        <Button
          variant="emergency"
          text={'emergency'}
          label={'Emergency'}
          onPress={() => setisModalOpen(true)}
        >
          <SvgXml
            xml={EmergencyIcon}
            className="fill-white stroke-white"
          />
        </Button>
        {isMenuOpen ? (
          <View className="absolute w-[100vw] h-[1px] bottom-0 left-0  bg-gray-400"></View>
        ) : null}
      </View>
      <EmergencyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setisModalOpen}
      />
    </View>
  );
};
export default NavBar;
