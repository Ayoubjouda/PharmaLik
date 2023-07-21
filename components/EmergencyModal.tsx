import { FC } from 'react';
import { View, Text } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import {
  AmbulanceIcon,
  PoliceBadgeIcon,
  PoliceIcon,
  PoliceFemaleIcon,
  PhoneIcon,
} from 'assets/icons';
import { SvgXml } from 'react-native-svg';
import * as Linking from 'expo-linking';
const EMERGENCY_NUMBERS = [
  {
    id: 1,
    name: 'Ambulance',
    number: '15',
    icon: AmbulanceIcon,
  },
  {
    id: 2,
    name: 'Police',
    number: '19',
    icon: PoliceIcon,
  },
  {
    id: 3,
    name: 'Police GSM',
    number: '112',
    icon: PoliceFemaleIcon,
  },
  {
    id: 4,
    name: 'Royal gandarmerie',
    number: '177',
    icon: PoliceBadgeIcon,
  },
];

interface EmergencyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const EmergencyModal: FC<EmergencyModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      title="Emergency numbers"
      isOpen={isModalOpen}
      setIsOpen={() => setIsModalOpen(!isModalOpen)}
    >
      {EMERGENCY_NUMBERS.map((el) => (
        <Button
          variant={'primary'}
          className="justify-between gap-1 px-2 py-4 bg-neutral-5"
          size={'lg'}
          text={'icon'}
          key={el.name}
          onPress={() => Linking.openURL(`tel:${el.number}`)}
        >
          <View className="flex-row items-center gap-x-2 ">
            <SvgXml xml={el.icon} />
            <Text className="text-xl font-bold text-neutral-950">
              {el.name}
            </Text>
          </View>
          <View className="flex-row items-center px-2 rounded-full bg-secondary-10 gap-x-1">
            <SvgXml
              xml={PhoneIcon}
              className="fill-red-600 stroke-red-600"
            />
            <Text className="text-xl font-bold text-red-600">{el.number}</Text>
          </View>
        </Button>
      ))}
    </Modal>
  );
};

export default EmergencyModal;
