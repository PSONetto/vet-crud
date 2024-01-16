import { useRef } from 'react';
import { useListBox } from 'react-aria';

import { IListBoxProps } from '../interfaces';
import ListBoxSection from './ListBoxSection';
import Option from './Option';

export default function ListBox(props: IListBoxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full max-h-52 overflow-auto outline-none"
    >
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        ),
      )}
    </ul>
  );
}
