import { useRef } from 'react';
import { useTabPanel } from 'react-aria';

import { ITabPanel } from '../interfaces';
import './tab.css';

export default function TabPanel({ state, ...props }: ITabPanel) {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} ref={ref} className="overflow-auto">
      {state.selectedItem?.props.children}
    </div>
  );
}
