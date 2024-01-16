import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';

import Button from '../../../components/buttons/button/Button';
import NumberField from '../../../components/forms/input/number/NumberField';
import TextField from '../../../components/forms/input/text/field/TextField';
import RadioInput from '../../../components/forms/radio/RadioInput';
import Dialog from '../../../components/overlays/dialog/Dialog';
import { Item } from '../../../components/pickers/combobox/ComboBox';
import ComboBoxInput from '../../../components/pickers/combobox/ComboBoxInput';
import { animals } from '../../../data/animals.json';

export interface ICreatePet {
  close: () => void;
}

export default function CreatePetForm({ close }: ICreatePet) {
  const { control, handleSubmit } = useForm();

  const genders = [
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
  ];

  function onSubmit(values: FieldValues) {
    console.log(values);
  }

  const [breeds, setBreeds] = useState<string[]>([]);

  return (
    <Dialog title="Create Pet" close={close} className="dark:text-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col mb-3 w-full">
          <TextField
            control={control}
            label="Name"
            name="name"
            isRequired
            validationBehavior="native"
          />
          <ComboBoxInput
            control={control}
            label="Species"
            name="species"
            isRequired
            popoverClassName="w-[72%]"
            onSelectionChange={(e) => {
              if (animals) {
                const animal = animals.filter(
                  (animal) => e === animal.species.toLowerCase(),
                )[0];

                if (animal) setBreeds(animal.commonBreeds || []);
              }
            }}
          >
            {animals.map((animal) => (
              <Item key={animal.species.toLowerCase()}>{animal.species}</Item>
            ))}
          </ComboBoxInput>
          {breeds.length === 0 ? (
            <TextField
              control={control}
              label="Breed"
              name="breed"
              isRequired
              validationBehavior="native"
            />
          ) : (
            <ComboBoxInput
              control={control}
              label="Breed"
              name="breed"
              popoverClassName="w-[72%]"
              isDisabled={breeds.length === 0}
            >
              {breeds.sort().map((breed) => (
                <Item key={breed.toLowerCase()}>{breed}</Item>
              ))}
            </ComboBoxInput>
          )}
          <RadioInput
            control={control}
            items={genders}
            label="Gender"
            name="gender"
            isRequired
            validationBehavior="native"
          />
          <NumberField
            control={control}
            label="Age"
            name="age"
            minValue={0}
            defaultValue={0}
            description="(Years)"
            validationBehavior="native"
          />
          <TextField
            control={control}
            label="Owner"
            name="owner"
            isRequired
            validationBehavior="native"
          />
        </div>

        <Button type="submit" icon={<FaCheck />}>
          Confirm
        </Button>
      </form>
    </Dialog>
  );
}
