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

import Button from '../../../buttons/button/Button';
import { INumberField } from '../../interfaces';
import Description from '../../labels/description/Description';
import Invalid from '../../labels/invalid/Invalid';
import Label from '../../labels/label/Label';

export default function NumberField(props: INumberField) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);

  const { label, control, rules } = props;

  const [isMax, setIsMax] = useState(false);
  const [isMin, setIsMin] = useState(false);

  useEffect(() => {
    if (
      (props.minValue || props.minValue === 0) &&
      props.minValue === props.defaultValue
    )
      setIsMin(true);
    if (
      (props.maxValue || props.maxValue === 0) &&
      props.maxValue === props.defaultValue
    )
      setIsMax(true);
  }, [props.defaultValue, props.maxValue, props.minValue]);

  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    isInvalid,
    errorMessageProps,
    validationErrors,
  } = useNumberField(props, state, inputRef);

  return (
    <Controller
      control={control}
      name={props.name ?? ''}
      defaultValue={props.defaultValue}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          <Label props={labelProps} required={props.isRequired}>
            {label}
          </Label>
          <div
            {...groupProps}
            className="flex bg-zinc-800 text-white rounded p-1 disabled:text-gray-400"
          >
            <span className="text-sm flex items-center ">
              <Button
                {...decrementButtonProps}
                onPress={() => {
                  if (
                    (props.minValue || props.minValue === 0) &&
                    field.value - 1 <= props.minValue
                  ) {
                    field.onChange(props.minValue);
                    setIsMin(true);
                  } else {
                    field.onChange(field.value - 1);
                    setIsMax(false);
                  }
                }}
                icon={
                  <span
                    className={props.isDisabled || isMin ? 'text-gray-500' : ''}
                  >
                    <FaMinus />
                  </span>
                }
                theme="text"
                isDisabled={isMin || props.isDisabled}
              />
            </span>

            <input
              {...inputProps}
              ref={inputRef}
              onChange={(e) => {
                field.onChange(
                  e.target.value
                    ? parseInt(e.target.value)
                    : props.minValue ?? 0,
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
                    (props.maxValue || props.maxValue === 0) &&
                    field.value + 1 >= props.maxValue
                  ) {
                    field.onChange(props.maxValue);
                    setIsMax(true);
                  } else {
                    field.onChange(field.value + 1);
                    setIsMin(false);
                  }
                }}
                icon={
                  <span
                    className={props.isDisabled || isMax ? 'text-gray-500' : ''}
                  >
                    <FaPlus />
                  </span>
                }
                theme="text"
                isDisabled={isMax || props.isDisabled}
              />
            </span>
          </div>

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
