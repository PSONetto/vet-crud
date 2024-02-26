/* eslint-disable import/named */

/* eslint-disable import/no-unresolved */
import { AriaComboBoxProps } from 'react-aria';
import {
  Control,
  FieldError,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

import { ComboBoxProps } from '@react-types/combobox';

export interface IComboBoxProps extends AriaComboBoxProps<object> {
  popoverClassName?: string;
  error?: FieldError;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
}

export interface IComboBoxInputProps extends ComboBoxProps<object> {
  control: Control;
  name: string;
  defaultValue?: string;
  popoverClassName?: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
}
