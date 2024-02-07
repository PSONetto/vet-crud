import { useRef } from 'react';
// eslint-disable-next-line import/named
import { AriaBreadcrumbItemProps, useBreadcrumbItem } from 'react-aria';

export default function BreadcrumbItem(props: AriaBreadcrumbItemProps) {
  const ref = useRef(null);

  const { itemProps } = useBreadcrumbItem(
    { ...props, elementType: 'span' },
    ref,
  );

  return (
    <li>
      <a
        {...itemProps}
        ref={ref}
        href={props.href}
        className={`${props.isDisabled ? 'text-gray-400' : 'text-teal-400'} ${
          (props.isCurrent || props.isDisabled) && 'underline'
        } ${props.isCurrent && 'font-bold'} ${
          props.isCurrent || props.isDisabled
            ? 'cursor-default'
            : 'cursor-pointer'
        }`}
      >
        {props.children}
      </a>

      {!props.isCurrent && (
        <span aria-hidden="true" className="py-0 px-1">
          {'>'}
        </span>
      )}
    </li>
  );
}
