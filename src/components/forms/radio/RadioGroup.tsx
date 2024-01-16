import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';

import { RadioContext } from '../../contexts/radio/RadioContext';
import { IRadioGroup } from '../interfaces';
import Description from '../labels/description/Description';
import Invalid from '../labels/invalid/Invalid';
import Label from '../labels/label/Label';

export default function RadioGroup(props: IRadioGroup) {
  const { children, label, description, isRequired } = props;
  const state = useRadioGroupState(props);
  const {
    radioGroupProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <Label props={labelProps} required={isRequired}>
        {label}
      </Label>

      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>

      {props.description && (
        <Description
          description={description}
          descriptionProps={descriptionProps}
        />
      )}

      {isInvalid && (
        <Invalid
          errorMessageProps={errorMessageProps}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
}
