import { useRef } from 'react';
import { useTextField } from 'react-aria';
import { Controller } from 'react-hook-form';

import InputContainer from '../../../labels/container/InputContainer';
import { ITextAreaProps } from '../../interfaces';

export default function TextArea({
  control,
  label,
  name,
  defaultValue,
  rules,
  description,
  onChange,
  ...props
}: ITextAreaProps) {
  const ref = useRef(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        label,
        name,
        description,
        onChange,
        ...props,
        inputElementType: 'textarea',
      },
      ref,
    );

  return (
    <Controller
      control={control}
      name={name ?? ''}
      defaultValue={defaultValue ?? ''}
      rules={rules}
      render={({ field, fieldState }) => (
        <InputContainer
          label={label}
          labelProps={labelProps}
          required={rules?.required}
          description={description}
          descriptionProps={descriptionProps}
          error={fieldState.error}
          errorMessageProps={errorMessageProps}
        >
          <textarea
            {...inputProps}
            className="bg-zinc-800 text-white rounded p-1 disabled:text-gray-400"
            ref={ref}
            onChange={(e) => {
              onChange && onChange(e.target.value);
              field.onChange(e.target.value);
            }}
            value={field.value}
          />
        </InputContainer>
      )}
    />
  );
}
