import { View } from 'react-native';
import Button from 'components/Button';
import { SvgXml } from 'react-native-svg';
import { ArrowRight } from 'assets/icons';
import { NativeWindStyleSheet } from 'nativewind';
NativeWindStyleSheet.setOutput({
  default: 'native',
});
export default function Page() {
  return (
    <View className="items-center justify-center flex-1">
      <Button
        variant="primary"
        label="Continue"
        text={'primary'}
        loading
      >
        <SvgXml
          xml={ArrowRight}
          className="fill-white stroke-white"
        />
      </Button>
    </View>
  );
}
