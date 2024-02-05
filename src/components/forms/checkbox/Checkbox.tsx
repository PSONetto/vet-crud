import { useRef } from 'react';
import {
  VisuallyHidden,
  mergeProps,
  useCheckbox,
  useFocusRing,
} from 'react-aria';
import { Controller } from 'react-hook-form';
import { useToggleState } from 'react-stately';

import { ICheckbox } from '../interfaces';
import Label from '../labels/label/Label';

export function Checkbox(props: ICheckbox) {
  const { control, rules, children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <Controller
      control={control}
      name={props.name ?? ''}
      defaultValue={props.defaultValue ?? false}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          <Label required={props.isRequired} className="flex">
            <VisuallyHidden>
              <input
                {...mergeProps(inputProps, focusProps)}
                onChange={(e) => {
                  field.onChange(e.currentTarget.checked);
                  props.onChange && props.onChange(e.currentTarget.checked);
                  console.log(`${props.name}: ${field.value}`);
                }}
                checked={field.value}
                ref={ref}
              />
            </VisuallyHidden>

            <svg width={24} height={24} aria-hidden="true" className="mr-1">
              <rect
                x={field.value ? 4 : 5}
                y={field.value ? 4 : 5}
                width={field.value ? 16 : 14}
                height={field.value ? 16 : 14}
                fill={field.value ? 'teal' : 'none'}
                stroke={field.value ? 'none' : 'gray'}
                strokeWidth={2}
              />
              {field.value && (
                <path
                  transform="translate(7 7)"
                  d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
            1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
            6A.999.999 0 0 1 3.788 9z`}
                />
              )}
              {props.isIndeterminate && (
                <rect x={7} y={11} width={10} height={2} fill="gray" />
              )}
              {isFocusVisible && (
                <rect
                  x={1}
                  y={1}
                  width={22}
                  height={22}
                  fill="none"
                  stroke="teal"
                  strokeWidth={2}
                />
              )}
            </svg>
            {children}
          </Label>
        </div>
      )}
    />
  );
}
