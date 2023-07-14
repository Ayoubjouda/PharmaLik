import { FC } from 'react';
import { View, Text, ViewProps } from 'react-native';
import Button from './Button';
import { AntDesign } from '@expo/vector-icons';

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
    <View
      className={`fixed inset-0 w-full h-full overflow-y-auto bg-black/60 ${
        !isOpen ? 'hidden' : ''
      } `}
      testID="modal-container"
    >
      <View
        className="w-[361px] min-h-[450px] py-6  bg-white rounded-xl flex-col top-[20%] mx-auto"
        {...props}
      >
        {/* Modal Header */}
        <View className="relative pb-4">
          <View className="flex-row items-center justify-between px-5">
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

          <View className="absolute bottom-0 w-full  h-[0px] border border-neutral-300"></View>
        </View>
        {/* Modal Body */}
        <View className="flex items-center justify-center px-5">
          {children}
        </View>
      </View>
    </View>
  );
};

export default Modal;
