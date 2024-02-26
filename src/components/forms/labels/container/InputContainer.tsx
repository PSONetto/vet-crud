import { FaCircleExclamation } from 'react-icons/fa6';

import Description from '../description/Description';
import { IInputContainerProps } from '../interfaces';
import Invalid from '../invalid/Invalid';
import Label from '../label/Label';

export default function InputContainer({
  label,
  labelProps,
  required,
  description,
  descriptionProps,
  error,
  errorMessageProps,
  children,
}: IInputContainerProps) {
  return (
    <div
      className={`flex flex-col w-full gap-1 mt-2 ${
        error && 'border-l-4 border-red-400 p-2'
      }`}
    >
      <Label props={labelProps} required={required}>
        {label}
      </Label>

      {error && errorMessageProps && (
        <div className="flex items-center gap-1 mb-1">
          <span className="text-red-400 font-bold" aria-hidden>
            <FaCircleExclamation />
          </span>

          <Invalid
            errorMessageProps={errorMessageProps}
            validationErrors={error}
          />
        </div>
      )}

      {children}

      {description && descriptionProps && (
        <Description
          description={description}
          descriptionProps={descriptionProps}
        />
      )}
    </div>
  );
}
