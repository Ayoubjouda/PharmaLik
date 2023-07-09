import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';
interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  label?: string;
  loading?: boolean;
}

const buttonVariants = cva(
  `active:scale-95 bg-transparent flex flex-row items-center justify-center rounded-xl transition-colors focus:outline-none`,
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        primary: 'bg-primary-60 w-[361px]',
        secondary: 'w-[361px] border-2 border-primary-60',
        emergency:
          'flex-row-reverse bg-secondary-80 rounded-full min-w-[124px]',
        icon: 'bg-white rounded-full px-1',
      },
      size: {
        default: 'py-2 px-3',
        sm: 'py-1 px-2',
        md: 'py-2 px-4',
        lg: 'py-3 px-6',
        icon: 'p-3',
      },
      text: {
        default: 'text-black font-bold text-[20px]',
        primary: 'text-white font-bold text-[20px]',
        secondary: 'text-primary-60 font-bold text-[20px]',
        emergency: 'text-white font-bold text-[16px] ',
        icon: 'hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      text: 'default',
    },
  }
);

const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  variant,
  label,
  loading,
  text,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ className, size, variant }),
        `${props.disabled === true ? 'bg-neutral-60 border-neutral-60' : ''} `
      )}
      {...props}
      testID="custom-button"
    >
      {loading ? (
        //TODO: change Spinner
        <ActivityIndicator
          color={'white'}
          size="small"
          className="py-1"
        />
      ) : (
        <>
          <Text
            className={cn(
              buttonVariants({ text }),
              `${props.disabled === true ? 'text-white' : ''} `
            )}
            testID="custom-button-text"
          >
            {label}
          </Text>
          {children}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
