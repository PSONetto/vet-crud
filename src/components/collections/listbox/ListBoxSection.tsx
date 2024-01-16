import { useListBoxSection } from 'react-aria';

import { ISectionProps } from '../interfaces';
import Option from './Option';

export default function ListBoxSection({ section, state }: ISectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <li {...itemProps} className="pt-2">
      {section.rendered && (
        <span
          {...headingProps}
          className="text-xs font-bold uppercase text-gray-500 mx-3"
        >
          {section.rendered}
        </span>
      )}
      <ul {...groupProps}>
        {[...section.childNodes].map((node) => (
          <Option key={node.key} item={node} state={state} />
        ))}
      </ul>
    </li>
  );
}
