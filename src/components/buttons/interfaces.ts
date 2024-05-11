/* eslint-disable import/named */
import { RefObject } from 'react';
import { AriaButtonProps } from 'react-aria';

export interface IButtonProps extends AriaButtonProps {
  label?: string;
  icon?: React.ReactNode;
  buttonRef?: RefObject<AriaButtonProps>;
  iconPosition?: 'right' | 'left';
  isLoading?: boolean;
  theme?: 'primary' | 'secondary' | 'danger' | 'text';
}

export interface IStyledButtonProps extends IButtonProps {
  triggerProps?: AriaButtonProps<'button'>;
}
