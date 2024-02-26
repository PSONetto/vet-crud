/* eslint-disable import/named */
import { DOMAttributes, ReactNode } from 'react';
import { LabelAriaProps } from 'react-aria';
import { FieldError, ValidationRule } from 'react-hook-form';

export interface ILabelProps {
  props?: LabelAriaProps;
  required: string | ValidationRule<boolean> | undefined;
  children: React.ReactNode;
}

export interface IInvalidProps {
  errorMessageProps: DOMAttributes<Element>;
  validationErrors?: FieldError;
}

export interface IDescriptionProps {
  descriptionProps: DOMAttributes<Element>;
  description:
    | string
    | number
    | true
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | Iterable<React.ReactNode>
    | React.ReactNode
    | React.ReactPortal;
}

export interface IInputContainerProps {
  label: string | ReactNode;
  labelProps: LabelAriaProps;
  required?: string | ValidationRule<boolean>;
  description?: string | ReactNode;
  descriptionProps?: React.DOMAttributes<Element>;
  error?: FieldError;
  errorMessageProps?: React.DOMAttributes<Element>;
  children: ReactNode;
}
