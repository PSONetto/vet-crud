import { Controller } from 'react-hook-form';

import { IComboBoxInputProps } from '../interfaces';
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
}: IComboBoxInputProps) {
  return (
    <Controller
      control={control}
      name={name ?? ''}
      defaultValue={defaultValue ?? ''}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col w-full">
          <ComboBox
            label={label}
            menuTrigger="input"
            onSelectionChange={(e) => {
              field.onChange && field.onChange(e);
              onSelectionChange && onSelectionChange(e);
            }}
            selectedKey={field.value}
            error={fieldState.error}
            rules={rules}
            {...props}
          >
            {children}
          </ComboBox>
        </div>
      )}
    />
  );
}
