export interface IOwner {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  alternativePhoneNumber?: string;
  preferredContactMethod: string;
  idNumber?: string;
  occupation?: string;
  additionalNotes?: string;
  acceptUpdates: boolean;
  acceptMarketing: boolean;
  referralSource?: string;
  treatmentAuthorization: boolean;
  address: IAddress;
  pets: IPet[];
}

interface IAddress {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  ownerId: number;
}

export interface IPet {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  species: string;
  breed?: string;
  age: number;
  birthDate?: Date;
  sex: string;
  neuteredSpayed: boolean;
  colorMarks: string;
  weight: number;
  dietaryNotes?: string;
  behavioralNotes?: string;
  ownerId: number;
}
