import { useRef } from 'react';
import { useOption } from 'react-aria';

import { IOptionProps } from '../interfaces';

export default function Option({ item, state }: IOptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  let text = 'text-white';
  if (isFocused || isSelected) {
    text = 'text-teal-500';
  } else if (isDisabled) {
    text = 'text-gray-500';
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`m-1 rounded py-2 px-2 text-sm outline-none cursor-default flex items-center justify-between ${text} ${
        isFocused ? 'bg-teal-100 text-black' : ''
      } ${isSelected ? 'font-bold' : ''}`}
    >
      {item.rendered}
    </li>
  );
}
