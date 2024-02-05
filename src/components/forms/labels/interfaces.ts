/* eslint-disable import/named */
import { DOMAttributes } from 'react';
import { LabelAriaProps } from 'react-aria';
import { ValidationRule } from 'react-hook-form';

export interface ILabelProps {
  props?: LabelAriaProps;
  required: string | ValidationRule<boolean> | undefined;
  children: React.ReactNode;
  className?: string;
}

export interface IInvalidProps {
  errorMessageProps: DOMAttributes<Element>;
  validationErrors?: string[];
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
