/* eslint-disable import/named */
import {
  AriaNumberFieldProps,
  AriaRadioGroupProps,
  AriaRadioProps,
  AriaTextFieldProps,
} from 'react-aria';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

export interface INumberField extends AriaNumberFieldProps {
  control?: Control;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

export interface ITextArea extends AriaTextFieldProps {
  control?: Control;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
}

export interface ITextField extends AriaTextFieldProps {
  control?: Control;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
}

export interface IRadioGroup extends AriaRadioGroupProps {
  children: React.ReactNode;
}

export interface IRadioProps extends AriaRadioProps {
  children: React.ReactNode;
}

export interface IRadioItem {
  label: string;
  value: string;
}

export interface IRadioInput extends AriaRadioGroupProps {
  control: Control;
  items: IRadioItem[];
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
}
