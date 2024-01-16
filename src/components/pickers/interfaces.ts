/* eslint-disable import/named */

/* eslint-disable import/no-unresolved */
import { AriaComboBoxProps } from 'react-aria';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

import { ComboBoxProps } from '@react-types/combobox';

export interface IComboBox extends AriaComboBoxProps<object> {
  popoverClassName?: string;
}

export interface IComboBoxInput extends ComboBoxProps<object> {
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
