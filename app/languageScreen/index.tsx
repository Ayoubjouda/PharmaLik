import { View, Text } from 'react-native';
import Button from 'components/Button';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { FlagAR, FlagEN, FlagFr } from 'assets/icons';
import { useState } from 'react';

type Language = {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
};

const LANGUAGES = [
  {
    id: 1,
    name: 'العربية',
    icon: FlagAR,
    selected: false,
  },
  {
    id: 2,
    name: 'English',
    icon: FlagEN,
    selected: false,
  },
  {
    id: 3,
    name: 'Francais',
    icon: FlagFr,
    selected: false,
  },
];

export default function Page() {
  const [language, setLanguage] = useState<Language[]>(LANGUAGES);
  const handelSelectLanguage = (id: number) => {
    const newLanguage = language.map((item) => {
      if (item.id === id && !item.selected) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setLanguage(newLanguage);
  };
  return (
    <View className="flex-1 bg-white py-[85] px-4 justify-between">
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
        <View className="mt-5">
          <Text className="text-neutral-100 text-[32px] font-SatoshiBold leading-10">
            Change language
          </Text>
          <Text className="text-lg leading-normal font-SatoshiRegular text-neutral-500">
            Lorem ipsum dolor sit amet consectetur. Tempor placerat.
          </Text>
        </View>
        <View className="gap-3 mt-6">
          {language?.map((item) => (
            <Button
              variant="primary"
              text={'icon'}
              size={'lg'}
              className={`justify-between bg-neutral-5  border ${
                item.selected
                  ? 'border-primary-30  bg-primary-10'
                  : 'border-neutral-5'
              } `}
              key={item.name}
              onPress={() => handelSelectLanguage(item.id)}
            >
              <View className="flex-row items-center gap-2">
                <SvgXml xml={item.icon} />
                <Text className="text-xl font-semibold leading-tight text-gray-800">
                  {item.name}
                </Text>
              </View>
              {item.selected ? (
                <AntDesign
                  name="check"
                  size={20}
                  color="black"
                />
              ) : null}
            </Button>
          ))}
        </View>
      </View>
      <View>
        <Button
          variant="primary"
          text={'primary'}
          label="Save"
        ></Button>
      </View>
    </View>
  );
}
