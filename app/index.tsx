import { View } from 'react-native';
import { Button, Modal } from 'components';
import { SvgXml } from 'react-native-svg';
import { ArrowRight, EmergencyIcon } from 'assets/icons';
import { Link } from 'expo-router';
import { useState } from 'react';
export default function Page() {
  const [isModalOpen, setisModalOpen] = useState<boolean>(true);
  return (
    <View className="items-center justify-center flex-1 bg-white">
      {/* <Link
        href="/authorizationScreen"
        asChild
      >
        <Button
          variant="emergency"
          text={'emergency'}
          label={'emergency'}
        >
          <SvgXml
            xml={EmergencyIcon}
            className="fill-white stroke-white"
          />
        </Button>
      </Link> */}
      <Modal
        title="emerency number in you area"
        isOpen={isModalOpen}
        setIsOpen={() => setisModalOpen(!isModalOpen)}
      >
        <Button variant={'primary'} />
      </Modal>
    </View>
  );
}
