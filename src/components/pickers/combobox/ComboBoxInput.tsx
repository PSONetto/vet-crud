import { Controller } from 'react-hook-form';

import { IComboBoxInput } from '../interfaces';
import ComboBox from './ComboBox';

export default function ComboBoxInput({
  control,
  label,
  name,
  defaultValue,
  rules,
  children,
  onSelectionChange,
  ...props
}: IComboBoxInput) {
  return (
    <Controller
      control={control}
      name={name ?? ''}
      defaultValue={defaultValue ?? ''}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          <ComboBox
            label={label}
            menuTrigger="focus"
            onSelectionChange={(e) => {
              field.onChange && field.onChange(e);
              onSelectionChange && onSelectionChange(e);
            }}
            {...props}
          >
            {children}
          </ComboBox>
        </div>
      )}
    />
  );
}
