import { useRef } from 'react';
import { useButton } from 'react-aria';

import { IStandardButtonProps } from '../interfaces';

export default function Button(props: IStandardButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children, icon, theme, className, buttonRef, iconPos } = props;

  let themeClass = '';

  switch (theme) {
    case 'primary':
      themeClass =
        'bg-gradient-to-b from-teal-600 to-teal-900 hover:from-teal-500 hover:to-teal-800 hover:shadow active:from-teal-700 active:to-teal-800';
      break;
    case 'secondary':
      themeClass =
        'bg-gradient-to-b from-gray-600 to-gray-900 hover:from-gray-500 hover:to-gray-800 hover:shadow active:from-gray-700 active:to-gray-800';
      break;
    case 'danger':
      themeClass =
        'bg-gradient-to-b from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 hover:shadow active:from-red-700 active:to-red-800';
      break;
    case 'text':
      themeClass = 'bg-transparent';
      break;
    default:
      themeClass = '';
  }

  return (
    <button
      {...buttonProps}
      ref={ref || buttonRef}
      className={`p-1 ${
        iconPos === 'right' ? 'pl-2' : 'pr-2'
      } flex items-center justify-center rounded gap-1 transition ease-in-out duration-300 ${
        themeClass || className
      } ${
        props.isDisabled &&
        'bg-gradient-to-b from-gray-400 to-gray-500 rounded cursor-default hover:'
      }`}
    >
      {iconPos !== 'right' && icon}
      {children}
      {iconPos === 'right' && icon}
    </button>
  );
}
