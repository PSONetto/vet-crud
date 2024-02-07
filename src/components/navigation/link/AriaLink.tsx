import { useRef } from 'react';
import { useLink } from 'react-aria';

import { IAriaLink } from '../interfaces';

export default function AriaLink(props: IAriaLink) {
  const ref = useRef(null);
  const { linkProps } = useLink(props, ref);

  return (
    <a
      {...linkProps}
      ref={ref}
      className={
        props.className +
        ' transition ease-in-out duration-300 hover:text-teal-400'
      }
    >
      {props.children}
    </a>
  );
}
