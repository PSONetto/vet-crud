import { IDescriptionProps } from '../interfaces';

export default function Description({
  descriptionProps,
  description,
}: IDescriptionProps) {
  return (
    <div className="text-sm md:text-xs italic" {...descriptionProps}>
      {description}
    </div>
  );
}
