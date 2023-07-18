import { FC } from 'react';
import { Text, View, TextInput, TextInputProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  leftIcon?: string;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  leftIcon,

  ...props
}) => {
  return (
    <View className="gap-y-3">
      {label ? (
        <Text className="text-xl font-bold leading-tight text-neutral-500">
          {label}
        </Text>
      ) : null}

      <View className="relative w-full">
        <TextInput
          placeholder={placeholder}
          className={`inline-flex items-start justify-start ${
            leftIcon ? 'pl-11 pr-4' : 'px-4'
          } py-3 text-lg font-normal leading-[22px] text-black border bg-stone-50 rounded-xl border-neutral-300 `}
          {...props}
        />
        {leftIcon ? (
          <SvgXml
            className="absolute left-4 top-3"
            width={22}
            height={22}
            xml={leftIcon}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Input;
