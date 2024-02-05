import { useRef } from 'react';
import { useTab } from 'react-aria';

import { ITab } from '../interfaces';
import './tab.css';

export default function Tab({ item, state }: ITab) {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);

  return (
    <div {...tabProps} ref={ref}>
      {rendered}
    </div>
  );
}
