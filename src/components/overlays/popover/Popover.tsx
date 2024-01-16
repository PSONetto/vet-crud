import { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from 'react-aria';

import { IPopoverProps } from '../interfaces';
import styles from './Popover.module.css';

export default function Popover({
  children,
  state,
  offset = 8,
  className,
  ...props
}: IPopoverProps) {
  const popoverRef = useRef(null);
  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div
        {...popoverProps}
        ref={popoverRef || props.ref}
        className={`bg-zinc-900 border shadow rounded-md ${className}`}
      >
        <svg
          {...arrowProps}
          className={
            styles.arrow +
            ' absolute fill-zinc-900 stroke-white stroke-1 w-3 h-3'
          }
          data-placement={placement}
          viewBox="0 0 12 12"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
