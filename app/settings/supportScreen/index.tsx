import { Button, Input } from 'components';
import { FC } from 'react';
import {
  View,
  Text,
  ViewProps,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SupportMessageType,
  supportMessageSchema,
} from 'lib/validators/formValidators';
type indexProps = ViewProps;

const index: FC<indexProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SupportMessageType>({
    resolver: zodResolver(supportMessageSchema),
  });

  //TODO: send message to backend
  const onSubmit = (data: SupportMessageType) => console.log(data);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0;

  return (
    <View className="flex-1 bg-white py-[85] px-4  justify-between ">
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                Technical support
              </Text>
              <Text className="text-lg leading-normal font-SatoshiRegular text-neutral-500">
                Lorem ipsum dolor sit amet consectetur. Tempor placerat.
              </Text>
            </View>
            <View className="pt-6 gap-y-5">
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Email address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="E-mail"
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text className="text-lg font-semibold text-secondary-70">
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="type your Message"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Message"
                      multiline
                      numberOfLines={5}
                      className="min-h-[240px]"
                    />
                  )}
                  name="message"
                />
                {errors.message && (
                  <Text className="text-lg font-semibold text-secondary-70">
                    {errors.message.message}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className="items-center">
        <Button
          variant="primary"
          text={'primary'}
          label="Send"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default index;
