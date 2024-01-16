import { ILabelProps } from '../interfaces';

export default function Label({ props, required, children }: ILabelProps) {
  return (
    <label {...props}>
      {children}{' '}
      {required && (
        <span className="text-red-500 align-text-top text-sm">*</span>
      )}
    </label>
  );
}
