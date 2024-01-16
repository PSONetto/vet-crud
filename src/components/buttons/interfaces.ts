/* eslint-disable import/named */
import { RefObject } from 'react';
import { AriaButtonProps } from 'react-aria';

export interface IStandardButtonProps extends AriaButtonProps {
  label?: string;
  theme?: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'text';
  icon?: React.ReactNode;
  className?: string;
  buttonRef?: RefObject<AriaButtonProps>;
}
