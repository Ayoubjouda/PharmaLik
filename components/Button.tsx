import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import React, { FC, forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';
interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  label?: string;
  loading?: boolean;
}

const buttonVariants = cva(
  `active:scale-95 bg-transparent flex flex-row items-center  justify-center rounded-xl transition-colors focus:outline-none`,
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        primary: 'bg-primary-60 w-[340px]',
        secondary: 'w-[340px] border-2 border-primary-60',
        emergency:
          'flex-row-reverse bg-secondary-80 rounded-full max-w-[160px]	',
        icon: 'bg-neutral-10 w-fit rounded-full  w-[48px] h-[48px]',
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
        icon: 'hidden ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      text: 'default',
    },
  }
);

const Button: FC<ButtonProps> = forwardRef<TouchableOpacity, ButtonProps>(
  (
    { className, children, size, variant, label, loading, text, ...props },
    ref
  ) => {
    return (
      <TouchableOpacity
        className={cn(
          buttonVariants({ className, size, variant }),
          `${props.disabled === true ? 'bg-neutral-60 border-neutral-60' : ''} `
        )}
        {...props}
        ref={ref}
        testID={props.testID ? props.testID : 'custom-button'}
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
  }
);

Button.displayName = 'Button';

export default Button;
