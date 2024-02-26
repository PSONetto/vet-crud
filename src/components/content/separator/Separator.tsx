// eslint-disable-next-line import/named
import { SeparatorProps, useSeparator } from 'react-aria';

export default function Separator(props: SeparatorProps) {
  const { separatorProps } = useSeparator(props);

  return (
    <div
      {...separatorProps}
      className={`bg-zinc-500 ${
        props.orientation === 'vertical'
          ? 'w-[1px] h-full my-0 mx-1'
          : 'w-full h-[1px] my-1 mx-0'
      }`}
    />
  );
}
