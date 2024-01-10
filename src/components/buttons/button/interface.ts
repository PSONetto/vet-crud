// eslint-disable-next-line import/named
import { AriaButtonProps } from 'react-aria';

export interface IStandardButtonProps extends AriaButtonProps {
  label?: string;
  theme?: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'text';
  icon?: React.ReactNode;
}
