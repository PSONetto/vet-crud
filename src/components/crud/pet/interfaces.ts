import { IPet } from '../../../models/owner';

export interface IListPetProps {
  data: IPet[] | undefined;
  isLoading: boolean;
}

export interface ICreatePet {
  close: () => void;
}
