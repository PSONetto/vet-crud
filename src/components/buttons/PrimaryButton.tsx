import Button from './Button';
import { IPrimaryButtonProps } from './interfaces';

export default function PrimaryButton({
  triggerProps,
  ...props
}: IPrimaryButtonProps) {
  return (
    <Button
      {...triggerProps}
      {...props}
      className="bg-teal-700 hover:bg-teal-600 active:bg-teal-800 "
    />
  );
}
