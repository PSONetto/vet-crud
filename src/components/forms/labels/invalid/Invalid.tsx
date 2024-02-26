import { IInvalidProps } from '../interfaces';

export default function Invalid({
  errorMessageProps,
  validationErrors,
}: IInvalidProps) {
  return (
    <div
      className="text-red-400 text-xs"
      aria-live="assertive"
      {...errorMessageProps}
    >
      {validationErrors?.message}
    </div>
  );
}
