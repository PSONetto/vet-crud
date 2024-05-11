import { ReactNode, useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { FieldValues, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { Item } from 'react-stately';

import { useMutation } from '@tanstack/react-query';

import { animals } from '../../../data/animals.json';
import { api } from '../../../lib/api';
import Button from '../../buttons/Button';
import TextField from '../../forms/input/text/field/TextField';
import Dialog from '../../overlays/dialog/Dialog';
import ComboBoxInput from '../../pickers/combobox/ComboBoxInput';
import { ICreatePetProps } from './interfaces';

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:p-4 w-full overflow-y-auto">
      {children}
    </div>
  );
}

export default function CreatPet({ close }: ICreatePetProps) {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ['create'],
    mutationFn: createPet,
  });

  const { control, handleSubmit, resetField } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [species, setSpecies] = useState('');
  const [breeds, setBreeds] = useState<string[]>([]);

  async function createPet(fieldValues: FieldValues) {
    const { data } = await api.post('/pet', fieldValues);

    return data;
  }

  async function submitData(fieldValues: FieldValues) {
    try {
      const formattedFieldValues = {
        ...fieldValues,
        idNumber: fieldValues.idNumber?.replace(/[^\d]/g, ''),
        phoneNumber: fieldValues.phoneNumber.replace(/[^\d]/g, ''),
        alternativePhoneNumber: fieldValues.alternativePhoneNumber?.replace(
          /[^\d]/g,
          '',
        ),
        zipCode: fieldValues.zipCode.replace(/[^\d]/g, ''),
      };

      mutate(formattedFieldValues);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    resetField('breed');

    if (species) {
      const arrBreeds = animals.find((animal) => animal.species === species)
        ?.commonBreeds;

      setBreeds(arrBreeds ?? []);
    }
  }, [resetField, species]);

  return (
    <Dialog title="Create Pet" close={close} className="dark:text-gray-100">
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col items-center justify-center"
      >
        <Container>
          <TextField
            control={control}
            name="name"
            label="Name"
            rules={{
              required: {
                value: true,
                message: 'The pet name is required.',
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/,
                message: `The pet name may only contain letters of the latin script, hyphen (-),
                       apostrophe (') or blank space (in case of composite given name).`,
              },
            }}
          />
          <ComboBoxInput
            control={control}
            label="Species"
            name="species"
            popoverClassName="w-[66%]"
            rules={{
              required: {
                value: true,
                message: 'The pet species is required.',
              },
            }}
            onSelectionChange={(e) => setSpecies(String(e))}
          >
            {animals.map((item) => (
              <Item key={item.species}>{item.species}</Item>
            ))}
          </ComboBoxInput>
          <ComboBoxInput
            control={control}
            label="Breed"
            name="breed"
            popoverClassName="w-[66%]"
            rules={{
              required: {
                value: true,
                message: 'The pet breed is required.',
              },
            }}
          >
            {breeds.map((item) => (
              <Item key={item}>{item}</Item>
            ))}
          </ComboBoxInput>
        </Container>

        <div className="flex p-5">
          {isError && (
            <span className="text-red-400 font-bold">{error.message}</span>
          )}

          {isSuccess && (
            <span className="text-green-400 font-bold">
              Pet created successefully
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 w-full mt-3">
          <Button
            type="submit"
            icon={<FaCheck />}
            isDisabled={isPending}
            isLoading={isPending}
            label="Confirm"
            theme="primary"
          />
        </div>
      </form>
    </Dialog>
  );
}
