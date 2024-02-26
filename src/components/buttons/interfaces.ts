/* eslint-disable import/named */
import { RefObject } from 'react';
import { AriaButtonProps } from 'react-aria';

export interface IButtonProps extends AriaButtonProps {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  buttonRef?: RefObject<AriaButtonProps>;
  iconPosition?: 'right' | 'left';
  isLoading?: boolean;
}

export interface IPrimaryButtonProps extends IButtonProps {
  triggerProps?: AriaButtonProps<'button'>;
}
