import { ILabelProps } from '../interfaces';

export default function Label({
  props,
  required,
  children,
  className,
}: ILabelProps) {
  return (
    <label {...props} className={className}>
      {children}{' '}
      {required && (
        <span className="text-red-500 align-text-top text-sm">*</span>
      )}
    </label>
  );
}
