import { IDescriptionProps } from '../interfaces';

export default function Description({
  descriptionProps,
  description,
}: IDescriptionProps) {
  return (
    <div className="text-xs italic" {...descriptionProps}>
      {description}
    </div>
  );
}
