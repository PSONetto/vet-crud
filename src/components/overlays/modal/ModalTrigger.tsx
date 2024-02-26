import { cloneElement } from 'react';
import { useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';

import PrimaryButton from '../../buttons/PrimaryButton';
import { IModalTriggerProps } from '../interfaces';
import Modal from './Modal';

export default function ModalTrigger({
  label,
  children,
  labelIcon,
  ...props
}: IModalTriggerProps) {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
  );

  return (
    <>
      <PrimaryButton
        triggerProps={triggerProps}
        icon={labelIcon}
        label={label}
      />
      {state.isOpen && (
        <Modal {...props} className="w-11/12 md:w-3/4" state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}
