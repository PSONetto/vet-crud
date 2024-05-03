import { IOwner } from '../../../models/owner';

export interface IListOwnerProps {
  data: IOwner[] | undefined;
  isLoading: boolean;
}

export interface ICreateOwnerProps {
  close: () => void;
}

export interface IEditOwnerProps {
  owner: IOwner;
  close: () => void;
}

export interface IComboboxOption {
  label: string;
  value: string;
}
