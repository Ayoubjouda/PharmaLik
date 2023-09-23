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
    <>
      <Button
        variant={'icon'}
        size={'icon'}
        text={'icon'}
        onPress={setIsMenuOpen}
        className="absolute z-30 bg-white shadow top-14 left-4"
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
        className="absolute z-30 top-14 right-4"
      >
        <SvgXml
          xml={EmergencyIcon}
          className="fill-white stroke-white"
        />
      </Button>

      <EmergencyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setisModalOpen}
      />
    </>
  );
};
export default NavBar;
