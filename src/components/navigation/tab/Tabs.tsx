import { useRef } from 'react';
// eslint-disable-next-line import/named
import { AriaTabListProps, useTabList } from 'react-aria';
import { useTabListState } from 'react-stately';

import Tab from './Tab';
import TabPanel from './TabPanel';
import './tab.css';

export default function Tabs(props: AriaTabListProps<object>) {
  const state = useTabListState(props);
  const ref = useRef(null);
  const { tabListProps } = useTabList(props, state, ref);

  return (
    <div
      className={`flex h-[60vh] ${
        props.orientation === 'vertical' ? 'flex-row' : 'flex-col'
      }`}
    >
      <div {...tabListProps} ref={ref}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>

      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}
