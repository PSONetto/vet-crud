import { useRef } from 'react';
import { useButton, useComboBox, useFilter } from 'react-aria';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useComboBoxState } from 'react-stately';

import ListBox from '../../collections/listbox/ListBox';
import InputContainer from '../../forms/labels/container/InputContainer';
import Popover from '../../overlays/popover/Popover';
import { IComboBoxProps } from '../interfaces';

export { Item, Section } from 'react-stately';

export default function ComboBox({
  label,
  description,
  error,
  rules,
  popoverClassName,
  ...props
}: IComboBoxProps) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({
    label,
    description,
    ...props,
    defaultFilter: contains,
  });

  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    descriptionProps,
    labelProps,
    errorMessageProps,
  } = useComboBox(
    {
      label,
      description,
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div className="inline-flex flex-col relative w-full">
      <InputContainer
        label={label}
        labelProps={labelProps}
        description={description}
        descriptionProps={descriptionProps}
        error={error}
        errorMessageProps={errorMessageProps}
        required={rules?.required}
      >
        <div className="relative flex flex-row rounded overflow-hidden outline-2">
          <input
            {...inputProps}
            ref={inputRef}
            className="bg-zinc-800 text-white box-border rounded p-1 disabled:text-gray-400 outline-none w-full"
          />

          <button
            {...buttonProps}
            ref={buttonRef}
            className={`px-1 bg-zinc-800 text-white cursor-default border-l border-gray-500 disabled:text-gray-400 ${
              state.isFocused ? 'text-teal-500' : 'text-white'
            }`}
          >
            {state.isOpen ? (
              <HiChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <HiChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {state.isOpen && (
          <Popover
            popoverRef={popoverRef}
            triggerRef={inputRef}
            state={state}
            isNonModal
            placement="bottom start"
            className={popoverClassName}
          >
            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
          </Popover>
        )}
      </InputContainer>
    </div>
  );
}
