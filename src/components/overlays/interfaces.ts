/* eslint-disable import/named */
import { ReactElement, RefObject } from 'react';
import {
  AriaDialogProps,
  AriaModalOverlayProps,
  AriaPopoverProps,
} from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  close: () => void;
}

export interface IModalProps extends AriaModalOverlayProps {
  state: OverlayTriggerState;
  children: React.ReactNode;
  className?: string;
}

export interface IModalTriggerProps extends Partial<OverlayTriggerState> {
  label?: string;
  // eslint-disable-next-line no-unused-vars
  children(data: () => void): ReactElement;
  modalClassName?: string;
  labelIcon?: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'danger' | 'text';
}

export interface IPopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  popoverRef?: RefObject<Omit<AriaPopoverProps, 'popoverRef'>>;
  className?: string;
}
