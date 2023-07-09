import { View } from 'react-native';
import Button from 'components/Button';
import { SvgXml } from 'react-native-svg';
import { ArrowRight, EmergencyIcon } from 'assets/icons';
import { NativeWindStyleSheet } from 'nativewind';
NativeWindStyleSheet.setOutput({
  default: 'native',
});
export default function Page() {
  return (
    <View className="items-center justify-center flex-1">
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
    </View>
  );
}
