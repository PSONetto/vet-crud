import { cloneElement } from 'react';
import { useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';

import Button from '../../buttons/Button';
import { IModalTriggerProps } from '../interfaces';
import Modal from './Modal';

export default function ModalTrigger({
  label,
  children,
  labelIcon,
  theme,
  ...props
}: IModalTriggerProps) {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
  );

  return (
    <>
      <Button
        {...triggerProps}
        icon={labelIcon}
        label={label}
        theme={theme}
      />

      {state.isOpen && (
        <Modal {...props} className="w-11/12 md:w-3/4" state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}
