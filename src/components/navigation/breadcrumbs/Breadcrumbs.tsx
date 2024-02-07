import { Children, cloneElement } from 'react';
import { useBreadcrumbs } from 'react-aria';

import { IBreadcrumbs } from '../interfaces';

export default function Breadcrumbs(props: IBreadcrumbs) {
  const { navProps } = useBreadcrumbs(props);
  const childCount = Children.count(props.children);

  return (
    <nav {...navProps}>
      <ol className="flex list-none m-0 p-0">
        {Children.map(props.children, (child, i) =>
          cloneElement(child, { isCurrent: i === childCount - 1 }),
        )}
      </ol>
    </nav>
  );
}
