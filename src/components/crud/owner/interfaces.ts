import { IOwner } from '../../../models/owner';

export interface ICreateOwner {
  close: () => void;
}

export interface IEditOwnerProps {
  owner: IOwner;
}
