import { useRef } from 'react';
import { useButton } from 'react-aria';
import { FaSpinner } from 'react-icons/fa6';

import { IButtonProps } from './interfaces';

export default function Button({
  icon,
  iconPosition = 'left',
  buttonRef,
  label,
  isLoading,
  isDisabled,
  theme,
  ...props
}: IButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton({ isDisabled, ...props }, ref);

  const themeStyles = {
    primary: 'bg-teal-700 hover:bg-teal-600 active:bg-teal-800',
    secondary: 'bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-teal-800',
    danger: 'bg-red-700 hover:bg-red-600 active:bg-red-800',
    text: 'hover:bg-white/15 active:bg-white/5',
  };

  return (
    <button
      {...buttonProps}
      ref={ref || buttonRef}
      className={`flex items-center justify-center gap-1 py-1 px-2 rounded transition ease-in-out duration-200 
        disabled:bg-gray-500 
        ${themeStyles[theme ? theme : 'primary']}`}
    >
      {(icon || isLoading) && (
        <span
          className={`${
            iconPosition === 'left' ? 'order-first' : 'order-last'
          } ${isLoading && 'animate-spin'}`}
          aria-hidden
        >
          {isLoading ? <FaSpinner /> : icon}
        </span>
      )}
      {label}
    </button>
  );
}
