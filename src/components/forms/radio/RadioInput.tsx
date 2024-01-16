import { Controller } from 'react-hook-form';

import { IRadioInput } from '../interfaces';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

export default function RadioInput(props: IRadioInput) {
  const { control, name, defaultValue, rules, items } = props;

  return (
    <Controller
      control={control}
      name={name ?? ''}
      defaultValue={defaultValue ?? ''}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col w-full">
          <RadioGroup
            label={props.label}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              field.onChange(e);
            }}
            value={field.value}
            {...props}
          >
            {items.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      )}
    />
  );
}
