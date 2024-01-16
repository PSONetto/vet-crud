import { useRef } from 'react';
import { useTextField } from 'react-aria';
import { Controller } from 'react-hook-form';

import { ITextArea } from '../../../interfaces';
import Description from '../../../labels/description/Description';
import Invalid from '../../../labels/invalid/Invalid';
import Label from '../../../labels/label/Label';

export default function TextArea(props: ITextArea) {
  const { label, control, rules } = props;

  const ref = useRef(null);

  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField({ ...props, inputElementType: 'textarea' }, ref);

  return (
    <Controller
      control={control}
      name={props.name ?? ''}
      defaultValue={props.defaultValue ?? ''}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          <Label props={labelProps} required={props.isRequired}>
            {label}
          </Label>

          <textarea
            {...inputProps}
            className="bg-zinc-800 text-white rounded p-1 disabled:text-gray-400"
            ref={ref}
            onChange={(e) => {
              props.onChange && props.onChange(e.target.value);
              field.onChange(e.target.value);
            }}
            value={field.value}
          />

          {props.description && (
            <Description
              description={props.description}
              descriptionProps={descriptionProps}
            />
          )}

          {isInvalid && (
            <Invalid
              errorMessageProps={errorMessageProps}
              validationErrors={validationErrors}
            />
          )}
        </div>
      )}
    />
  );
}
