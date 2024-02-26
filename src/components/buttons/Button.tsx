import { useRef } from 'react';
import { useButton } from 'react-aria';
import { FaSpinner } from 'react-icons/fa6';

import { IButtonProps } from './interfaces';

export default function Button({
  icon,
  iconPosition = 'left',
  buttonRef,
  className,
  label,
  isLoading,
  isDisabled,
  ...props
}: IButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton({ isDisabled, ...props }, ref);

  return (
    <button
      {...buttonProps}
      ref={ref || buttonRef}
      className={
        'flex items-center justify-center gap-1 py-1 px-2 rounded transition ease-in-out duration-200 disabled:bg-gray-500 ' +
        className
      }
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
