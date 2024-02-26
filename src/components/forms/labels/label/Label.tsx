import { ILabelProps } from '../interfaces';

export default function Label({ props, required, children }: ILabelProps) {
  return (
    <label {...props} className="flex gap-2 items-center">
      <div className="flex gap-1">
        {children}{' '}
        {required && (
          <span className="text-red-400 align-text-top text-sm" aria-hidden>
            *
          </span>
        )}
      </div>
    </label>
  );
}
