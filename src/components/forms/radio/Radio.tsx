import { useContext, useRef } from 'react';
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria';

import { RadioContext } from '../../contexts/radio/RadioContext';
import { IRadioProps } from '../interfaces';

export default function Radio(props: IRadioProps) {
  const { children } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useRadio(props, state!, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const strokeWidth = isSelected ? 6 : 2;

  return (
    <label
      className={`flex items-center ${
        isDisabled ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg width={24} height={24} aria-hidden="true" className="mr-1">
        <circle
          cx={12}
          cy={12}
          r={8 - strokeWidth / 2}
          fill="none"
          stroke={isSelected ? 'teal' : 'gray'}
          strokeWidth={strokeWidth}
        />

        {isFocusVisible && (
          <circle
            cx={12}
            cy={12}
            r={11}
            fill="none"
            stroke="teal"
            strokeWidth={2}
          />
        )}
      </svg>
      {children}
    </label>
  );
}
