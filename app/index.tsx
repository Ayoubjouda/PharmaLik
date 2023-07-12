import { View } from 'react-native';
import Button from 'components/Button';
import { SvgXml } from 'react-native-svg';
import { ArrowRight, EmergencyIcon } from 'assets/icons';
import { Link } from 'expo-router';
export default function Page() {
  return (
    <View className="items-center justify-center flex-1">
      <Link
        href="/languageScreen"
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
      </Link>
    </View>
  );
}
