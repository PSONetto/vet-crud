/* 
  The React Aria component hook, useNumberField, is not functioning as 
  expected for this component. 
  Its intended behavior in decrementing and incrementing is not aligning with 
  the React Form controller, causing the buttons to not affect the controlled 
  state. Consequently, all the decrement and increment functionality was 
  manually reworked.
 */
import { useEffect, useRef, useState } from 'react';
import { useLocale, useNumberField } from 'react-aria';
import { Controller } from 'react-hook-form';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useNumberFieldState } from 'react-stately';

import Button from '../../../buttons/Button';
import InputContainer from '../../labels/container/InputContainer';
import { INumberFieldProps } from '../interfaces';

export default function NumberField({
  control,
  name,
  label,
  rules,
  minValue,
  maxValue,
  isDisabled,
  description,
  defaultValue,
  ...props
}: INumberFieldProps) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);

  const [isMax, setIsMax] = useState(false);
  const [isMin, setIsMin] = useState(false);

  useEffect(() => {
    if ((minValue || minValue === 0) && minValue === defaultValue)
      setIsMin(true);
    if ((maxValue || maxValue === 0) && maxValue === defaultValue)
      setIsMax(true);
  }, [defaultValue, maxValue, minValue]);

  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    errorMessageProps,
  } = useNumberField(
    {
      label,
      description,
      minValue,
      maxValue,
      defaultValue,
      isDisabled,
      ...props,
    },
    state,
    inputRef,
  );

  return (
    <Controller
      control={control}
      name={name ?? ''}
      defaultValue={defaultValue}
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
          <div
            {...groupProps}
            className="flex bg-zinc-800 text-white rounded p-1 disabled:text-gray-400"
          >
            <span className="text-sm flex items-center ">
              <Button
                {...decrementButtonProps}
                onPress={() => {
                  if (
                    (minValue || minValue === 0) &&
                    field.value - 1 <= minValue
                  ) {
                    field.onChange(minValue);
                    setIsMin(true);
                  } else {
                    field.onChange(field.value - 1);
                    setIsMax(false);
                  }
                }}
                icon={
                  <span className={isDisabled || isMin ? 'text-gray-500' : ''}>
                    <FaMinus />
                  </span>
                }
                theme="text"
                isDisabled={isMin || isDisabled}
              />
            </span>

            <input
              {...inputProps}
              ref={inputRef}
              onChange={(e) => {
                field.onChange(
                  e.target.value ? parseInt(e.target.value) : minValue ?? 0,
                );
              }}
              value={field.value}
              className="bg-zinc-600 text-white rounded disabled:text-gray-400 w-full text-center"
            />

            <span className="text-sm flex items-center justify-center">
              <Button
                {...incrementButtonProps}
                onPress={() => {
                  if (
                    (maxValue || maxValue === 0) &&
                    field.value + 1 >= maxValue
                  ) {
                    field.onChange(maxValue);
                    setIsMax(true);
                  } else {
                    field.onChange(field.value + 1);
                    setIsMin(false);
                  }
                }}
                icon={
                  <span className={isDisabled || isMax ? 'text-gray-500' : ''}>
                    <FaPlus />
                  </span>
                }
                theme="text"
                isDisabled={isMax || isDisabled}
              />
            </span>
          </div>
        </InputContainer>
      )}
    />
  );
}
