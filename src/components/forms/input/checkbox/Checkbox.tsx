import { useRef } from 'react';
import {
  VisuallyHidden,
  mergeProps,
  useCheckbox,
  useFocusRing,
} from 'react-aria';
import { Controller } from 'react-hook-form';
import { useToggleState } from 'react-stately';

import Label from '../../labels/label/Label';
import { ICheckbox } from '../interfaces';

export function Checkbox({
  control,
  name,
  defaultValue,
  isIndeterminate,
  isDisabled,
  rules,
  onChange,
  children,
  ...props
}: ICheckbox) {
  const state = useToggleState({ onChange, ...props });
  const ref = useRef(null);

  const { inputProps } = useCheckbox(
    { name, isIndeterminate, isDisabled, onChange, children, ...props },
    state,
    ref,
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <Controller
      control={control}
      name={name ?? ''}
      defaultValue={defaultValue ?? false}
      rules={rules}
      render={({ field }) => (
        <Label required={rules?.required}>
          <div className="flex items-center group p-1 mt-2">
            <VisuallyHidden>
              <input
                {...mergeProps(inputProps, focusProps)}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  onChange && onChange(e.target.checked);
                }}
                checked={field.value}
                ref={ref}
              />
            </VisuallyHidden>

            <div
              className={`${
                isDisabled
                  ? field.value
                    ? 'bg-zinc-400 : border-zinc-400'
                    : 'bg-zinc-600'
                  : field.value
                    ? 'bg-teal-400 border-teal-400 group-active:border-teal-600'
                    : 'bg-zinc-800'
              } ${
                isFocusVisible
                  ? 'outline outline-2 outline-offset-4 outline-teal-500 group-active:outline-teal-600'
                  : 'border-zinc-500 group-active:border-zinc-600'
              } text-gray-100 border-2 rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 transition ease-in-out duration-150`}
              aria-hidden="true"
            >
              <svg className="stroke-current w-3 h-3" viewBox="0 0 18 18">
                <polyline
                  points="1 9 7 14 15 4"
                  fill="none"
                  strokeWidth={3}
                  strokeDasharray={22}
                  strokeDashoffset={field.value ? 44 : 66}
                  style={{ transition: 'all 400ms' }}
                />
              </svg>
            </div>
            {children}
          </div>
        </Label>
      )}
    />
  );
}
