import { FC } from 'react';
import { Text, View, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ label, placeholder, ...props }) => {
  return (
    <View className="gap-y-3">
      <Text className="text-xl font-bold leading-tight text-neutral-500">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        className="inline-flex items-start justify-start px-4 py-3 text-lg font-normal leading-[22px] text-black border bg-stone-50 rounded-xl border-neutral-300 "
        {...props}
      />
    </View>
  );
};

export default Input;
