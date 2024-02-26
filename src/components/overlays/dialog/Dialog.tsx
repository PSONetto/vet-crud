import { useRef } from 'react';
import { useDialog } from 'react-aria';
import { FaTimes } from 'react-icons/fa';

import TextButton from '../../buttons/IconButton';
import { DialogProps } from '../interfaces';

export default function Dialog({
  title,
  children,
  className,
  close,
  ...props
}: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div className={className} {...dialogProps} ref={ref}>
      <div className="bg-gradient-to-tr from-zinc-800 to-zinc-900 p-5 flex items-center justify-between">
        {title && (
          <h3 className="mt-0 text-xl" {...titleProps}>
            {title}
          </h3>
        )}
        <TextButton onPress={close} icon={<FaTimes />} />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
