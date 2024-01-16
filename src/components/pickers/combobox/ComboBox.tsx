import { useRef } from 'react';
import { useButton, useComboBox, useFilter } from 'react-aria';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useComboBoxState } from 'react-stately';

import ListBox from '../../collections/listbox/ListBox';
import Label from '../../forms/labels/label/Label';
import Popover from '../../overlays/popover/Popover';
import { IComboBox } from '../interfaces';

export { Item, Section } from 'react-stately';

export default function ComboBox(props: IComboBox) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
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
      <Label props={labelProps} required={props.isRequired}>
        {props.label}
      </Label>

      <div className="relative flex flex-row rounded overflow-hidden outline-2">
        <input
          {...inputProps}
          ref={inputRef}
          className="bg-zinc-800 text-white box-border rounded p-1 disabled:text-gray-400 outline-none w-full"
        />

        <button
          {...buttonProps}
          ref={buttonRef}
          className={`px-1 bg-zinc-800 text-white cursor-default border-l border-gray-500 ${
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
          ref={popoverRef}
          triggerRef={inputRef}
          state={state}
          isNonModal
          placement="bottom start"
          className={props.popoverClassName}
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
}
