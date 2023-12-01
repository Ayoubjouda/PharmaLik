import { FC, useState } from 'react';
import { View, Text, Switch, ViewProps, ScrollView } from 'react-native';
import Button from './Button';
import { SvgXml } from 'react-native-svg';
import {
  ChevronRightIcon,
  CihIcon,
  ExternalLinkIcon,
  FAQIcon,
  LanguageIcon,
  NightIcon,
  PaypalIcon,
  QuestionMarkIcon,
  SupportAgentIcon,
} from 'assets/icons';
import useAppStore from 'services/zustand/store';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Link } from 'expo-router';
type MenuProps = ViewProps;

const Menu: FC<MenuProps> = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const { isMenuOpen } = useAppStore();

  return (
    <ScrollView
      className={`absolute bg-white inset-0 gap-y-6 pt-28  flex-1 max-w-[100vw] z-10 ${
        !isMenuOpen ? 'hidden' : ''
      }`}
      contentContainerStyle={{ alignItems: 'center', flex: 1 }}
    >
      <Animated.View
        key={'nav'}
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(400)}
        className="flex-1 w-screen h-screen "
      >
        {isMenuOpen ? (
          <View className="w-[100vw] h-[1px] bg-gray-400 mb-3"></View>
        ) : null}
        {/* //section 1 */}
        <View className="w-full px-3">
          <Text className="w-full text-2xl font-bold leading-7 text-neutral-950">
            Settings
          </Text>
          <View className={`flex-row  w-full justify-between  py-5 bg-white`}>
            <View className="flex-row items-center gap-2">
              <SvgXml xml={NightIcon} />
              <Text className="text-lg font-bold leading-normal text-neutral-500">
                Dark mode
              </Text>
            </View>

            <Switch
              onValueChange={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
              value={isDarkModeEnabled}
            />
          </View>
          <View className="w-full h-[1px]  bg-gray-300"></View>
          <Link
            href={'/settings/languageScreen'}
            asChild
          >
            <Button
              variant="primary"
              text={'icon'}
              size={'lg'}
              className={`justify-between w-full px-0 bg-white py-5`}
            >
              <View className="flex-row items-center gap-2">
                <SvgXml xml={LanguageIcon} />
                <Text className="text-lg font-bold leading-normal text-neutral-500">
                  Change language
                </Text>
              </View>

              <SvgXml xml={ChevronRightIcon} />
            </Button>
          </Link>
        </View>
        <View className="w-full px-3">
          <Text className="w-full text-2xl font-bold leading-7 text-neutral-950">
            Support
          </Text>
          <Button
            variant="primary"
            text={'icon'}
            size={'lg'}
            className={`justify-between w-full px-0 bg-white py-5`}
          >
            <View className="flex-row items-center gap-2">
              <SvgXml xml={QuestionMarkIcon} />
              <Text className="text-lg font-bold leading-normal text-neutral-500">
                How to use?
              </Text>
            </View>

            <SvgXml xml={ChevronRightIcon} />
          </Button>
          <View className="w-full h-[1px]  bg-gray-300"></View>
          <Link
            href={'/settings/supportScreen'}
            asChild
          >
            <Button
              variant="primary"
              text={'icon'}
              size={'lg'}
              className={`justify-between w-full px-0 bg-white py-5`}
            >
              <View className="flex-row items-center gap-2">
                <SvgXml xml={SupportAgentIcon} />
                <Text className="text-lg font-bold leading-normal text-neutral-500">
                  Technical support
                </Text>
              </View>

              <SvgXml xml={ChevronRightIcon} />
            </Button>
          </Link>
          <View className="w-full h-[1px]  bg-gray-300"></View>

          <Button
            variant="primary"
            text={'icon'}
            size={'lg'}
            className={`justify-between w-full px-0 bg-white py-5`}
          >
            <View className="flex-row items-center gap-2">
              <SvgXml xml={FAQIcon} />
              <Text className="text-lg font-bold leading-normal text-neutral-500">
                FAQ
              </Text>
            </View>

            <SvgXml xml={ChevronRightIcon} />
          </Button>
        </View>
        <View className="w-full px-3">
          <Text className="w-full text-2xl font-bold leading-7 text-neutral-950">
            Donate
          </Text>
          <Text className="mt-2 text-lg font-normal leading-normal text-neutral-500">
            Pharmalik is a non-profit application, if you want to help donate or
            whatever.
          </Text>
          <Button
            variant="primary"
            text={'icon'}
            size={'lg'}
            className={`justify-between w-full px-0 bg-white py-5`}
          >
            <View className="flex-row items-center gap-2">
              <SvgXml xml={PaypalIcon} />
              <Text className="text-lg font-bold leading-normal text-neutral-500">
                Paypal
              </Text>
            </View>

            <SvgXml xml={ExternalLinkIcon} />
          </Button>
          <View className="w-full h-[1px]  bg-gray-300"></View>
          <Button
            variant="primary"
            text={'icon'}
            size={'lg'}
            className={`justify-between w-full px-0 bg-white py-5`}
          >
            <View className="flex-row items-center gap-2">
              <SvgXml xml={CihIcon} />
              <Text className="text-lg font-bold leading-normal text-neutral-500">
                CIH Bank
              </Text>
            </View>

            <SvgXml xml={ExternalLinkIcon} />
          </Button>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default Menu;
