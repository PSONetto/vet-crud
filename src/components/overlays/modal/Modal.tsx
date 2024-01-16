import { useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';

import { IModalProps } from '../interfaces';

export default function Modal({
  state,
  children,
  className,
  ...props
}: IModalProps) {
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div
        className="fixed z-[100] top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center"
        {...underlayProps}
      >
        <div
          className={
            className +
            ' bg-gradient-to-bl bg-zinc-700 border border-solid border-gray-500'
          }
          {...modalProps}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
}
