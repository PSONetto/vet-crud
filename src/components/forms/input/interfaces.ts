/* eslint-disable import/named */
import {
  AriaCheckboxGroupProps,
  AriaCheckboxProps,
  AriaNumberFieldProps,
  AriaTextFieldProps,
} from 'react-aria';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

interface IControlledInput {
  control?: Control;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

export interface INumberFieldProps
  extends IControlledInput,
    AriaNumberFieldProps {
  name: string;
}

export interface ITextAreaProps extends IControlledInput, AriaTextFieldProps {}

export interface ITextFieldProps extends IControlledInput, AriaTextFieldProps {}

export interface ICheckbox extends IControlledInput, AriaCheckboxProps {
  defaultValue?: boolean;
  description?: string;
}

export interface ICheckboxGroupProps extends AriaCheckboxGroupProps {}
