import { View, Text } from 'react-native';
import Button from 'components/Button';
import { SvgXml } from 'react-native-svg';
import { router, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { FlagAR, FlagEN, FlagFr } from 'assets/icons';
import { useEffect, useState } from 'react';
import { i18n } from 'services/i18n/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
  locale: string;
};

const LANGUAGES = [
  {
    id: 1,
    name: 'العربية',
    icon: FlagAR,
    selected: false,
    locale: 'ar',
  },
  {
    id: 2,
    name: 'English',
    icon: FlagEN,
    selected: false,
    locale: 'en',
  },
  {
    id: 3,
    name: 'Francais',
    icon: FlagFr,
    selected: false,
    locale: 'fr',
  },
];

export default function Page() {
  const [language, setLanguage] = useState<Language[]>(LANGUAGES);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    i18n.locale
  );
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchFirstTimeOpen = async () => {
      const result = await AsyncStorage.getItem('isFirstTimeOpen');
      if (result === null) setIsFirstTimeLoad(true);
      setLoading(false);
    };

    fetchFirstTimeOpen();
  }, []);
  const router = useRouter();
  useEffect(() => {
    const newLanguage = language.map((item) => {
      if (item.locale === i18n.locale) {
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
  }, []);
  const selectLanguage = language.find(
    (item) => item.selected === true
  )?.locale;
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

  const onSave = async () => {
    i18n.locale = language.find((item) => item.selected)?.locale || 'en';
    await setSelectedLanguage(i18n.locale);
    if (isFirstTimeLoad) router.push('/settings/authorizationScreen');
  };
  console.log(selectLanguage, selectedLanguage);

  return (
    <View className="flex-1 bg-white py-[85] px-4 justify-between ">
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
      <View className="items-center">
        <Button
          variant="primary"
          text={'primary'}
          label={isFirstTimeLoad ? 'Continue' : 'Save'}
          onPress={onSave}
          disabled={
            isFirstTimeLoad && !loading
              ? false
              : selectLanguage === selectedLanguage
          }
        />
      </View>
    </View>
  );
}
