import { IInvalidProps } from '../interfaces';

export default function Invalid({
  errorMessageProps,
  validationErrors,
}: IInvalidProps) {
  return (
    <div className="text-red-600 text-xs" {...errorMessageProps}>
      {validationErrors.join(' ')}
    </div>
  );
}
