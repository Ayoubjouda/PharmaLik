import { View, Text } from 'react-native';
import Button from 'components/Button';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LocationIcon } from 'assets/icons';
import * as Location from 'expo-location';

export default function Page() {
  const handelAllowLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  };

  return (
    <View className="flex-1 bg-white py-[85] px-4 justify-between items-center">
      <View>
        <Button
          variant="icon"
          text={'icon'}
          label="icon"
          onPress={router.back}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
          />
        </Button>
        <View className="items-center mt-5">
          <SvgXml xml={LocationIcon} />
          <Text className="text-neutral-950 text-[32px] font-bold leading-10">
            Allow location access
          </Text>
          <Text className="mt-2 text-lg leading-normal text-center font-SatoshiRegular text-neutral-500">
            Lorem ipsum dolor sit amet consectetur. Tempor placerat quisque
            adipiscing cursus at porttitor egestas in rhoncus. Nibh sed dictum
            mattis tristique.
          </Text>
        </View>
      </View>
      <View>
        <Button
          variant="primary"
          text={'primary'}
          label="Allow"
          onPress={handelAllowLocation}
        ></Button>
      </View>
    </View>
  );
}
