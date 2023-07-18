import { FC } from 'react';
import { View, Text, ViewProps } from 'react-native';
import Button from './Button';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface ModalProps extends ViewProps {
  title?: string;
  isOpen?: boolean;
  setIsOpen?: () => void;
}

const Modal: FC<ModalProps> = ({
  title,
  isOpen,
  setIsOpen,
  children,
  ...props
}) => {
  return (
    <Animated.View
      className={`absolute inset-0 z-40 w-full h-screen overflow-y-auto bg-black/60 ${
        !isOpen ? 'hidden' : ''
      } `}
      testID="modal-container"
      key={Math.random()}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <View
        className="w-[361px] h-auto pt-6  bg-white rounded-xl flex-col top-[20%] mx-auto"
        {...props}
      >
        {/* Modal Header */}
        <View className="relative pb-4">
          <View className="flex-row items-center justify-between px-5 ">
            <Text className="max-w-[80%] text-2xl font-bold leading-7 text-black">
              {title}
            </Text>
            <Button
              variant={'icon'}
              text={'icon'}
              size={'icon'}
              onPress={setIsOpen}
              testID="close-button"
            >
              <AntDesign
                name="close"
                size={24}
                color="black"
              />
            </Button>
          </View>

          <View className="absolute bottom-0 w-full  h-[1px] bg-neutral-20"></View>
        </View>
        {/* Modal Body */}
        <View className="flex items-center justify-center gap-4 px-5 py-6">
          {children}
        </View>
      </View>
    </Animated.View>
  );
};

export default Modal;
