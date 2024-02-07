import { IPet } from '../../../models/owner';

export interface ICreatePet {
  close: () => void;
}

export interface IListPetProps {
  data: IPet[];
  isLoading: boolean;
}
