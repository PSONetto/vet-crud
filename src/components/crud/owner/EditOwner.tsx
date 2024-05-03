import { ReactNode, useEffect, useState } from 'react';
import { VisuallyHidden } from 'react-aria';
import { FieldValues, useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { FaCheck, FaPencil } from 'react-icons/fa6';
import { Item } from 'react-stately';

import { useMutation } from '@tanstack/react-query';

import * as cities from '../../../data/cities.json';
import { contactMethods } from '../../../data/contact.json';
import { states } from '../../../data/states.json';
import { api } from '../../../lib/api';
import formatOptionArray from '../../../lib/utils/formatOptionArray';
import Button from '../../buttons/Button';
import { Checkbox } from '../../forms/input/checkbox/Checkbox';
import TextArea from '../../forms/input/text/area/TextArea';
import TextField from '../../forms/input/text/field/TextField';
import Dialog from '../../overlays/dialog/Dialog';
import ComboBoxInput from '../../pickers/combobox/ComboBoxInput';
import { IComboboxOption, IEditOwnerProps } from './interfaces';

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-auto p-4 h-[60vh]">{children}</div>
  );
}

export default function EditOwner({ owner, close }: IEditOwnerProps) {
  const { mutate, isPending } = useMutation({
    mutationKey: ['create'],
    mutationFn: editOwner,
  });

  const { control, handleSubmit, reset, resetField } = useForm();

  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState<string>(owner.address.state);
  const [statesOptions, setStatesOptions] = useState<IComboboxOption[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<IComboboxOption[]>([]);

  async function editOwner(fieldValues: FieldValues) {
    const { data } = await api.put(`/owner/${owner.id}`, fieldValues);

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

      console.log(formattedFieldValues);

      mutate(formattedFieldValues);

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const formattedStates = states.map((state) => ({
      label: state.name,
      value: state.abbreviation,
    }));

    setStatesOptions(formattedStates);
  }, []);

  useEffect(() => {
    if (state) {
      const arrCities = cities[state as keyof typeof cities];
      const formattedCities = formatOptionArray(arrCities);

      setCitiesOptions(formattedCities);
    }
  }, [state]);

  return (
    <Dialog title="Edit Pet Owner" close={close} className="dark:text-gray-100">
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col gap-2 w-full"
      >
        <Container>
          <TextField
            control={control}
            name="firstName"
            label="First Name"
            defaultValue={owner.firstName}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The owner first name is required.',
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/,
                message: `The owner first name may only contain letters of the latin script, hyphen (-),
                       apostrophe (') or blank space (in case of composite given name).`,
              },
            }}
          />
          <TextField
            control={control}
            name="lastName"
            label="Last Name"
            defaultValue={owner.lastName}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The owner last name is required.',
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/,
                message: `The owner last name may only contain letters of the latin script, hyphen (-),
                      apostrophe (') or blank space (in case of multiple last names).`,
              },
            }}
          />
          <TextField
            control={control}
            name="idNumber"
            label="ID Number"
            defaultValue={owner.idNumber}
            isDisabled={!isEditing}
            description={
              <VisuallyHidden>
                <span>Taxpayer Identification Numbers. Such as:</span>
                <ul className="list-disc flex flex-col px-4">
                  <li>{`Social Security Number (SSN).`}</li>
                  <li>{`Employer Identification Number (EIN).`}</li>
                  <li>
                    {` Individual Taxpayer Identification Number (ITIN).`}
                  </li>
                </ul>
              </VisuallyHidden>
            }
            rules={{
              pattern: {
                value: /^\d{3}-?\d{2}-?\d{4}$/,
                message: 'The ID number may only contain digits or hyphen (-).',
              },
            }}
          />
          <TextField
            control={control}
            name="emailAddress"
            label="Email Address"
            type="text"
            defaultValue={owner.emailAddress}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The owner email address is required.',
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message:
                  'The owner email address must follows the standard pattern of username@domain.com.',
              },
            }}
          />
          <TextField
            control={control}
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            inputMode="tel"
            defaultValue={owner.phoneNumber}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The owner phone number is required.',
              },
              pattern: {
                value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                message: 'The owner phone number must contain 10 digits.',
              },
            }}
          />
          <TextField
            control={control}
            name="alternativePhoneNumber"
            label="Alternative Phone Number"
            type="tel"
            inputMode="tel"
            defaultValue={owner.alternativePhoneNumber}
            isDisabled={!isEditing}
            rules={{
              pattern: {
                value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                message: 'The owner phone number must contain 10 digits.',
              },
            }}
          />
          <ComboBoxInput
            control={control}
            label="Preferred Contact Method"
            name="preferredContactMethod"
            popoverClassName="w-[66%] md:w-[17%]"
            defaultValue={owner.preferredContactMethod}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The preferred contact method is required.',
              },
            }}
          >
            {contactMethods.map((item) => (
              <Item key={item.value}>{item.label}</Item>
            ))}
          </ComboBoxInput>
          <TextField
            control={control}
            name="street"
            label="Street"
            type="text"
            defaultValue={owner.address.street}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The street address is required.',
              },
              pattern: {
                value:
                  /^\d+\s+[\w\s]+\s+\w+?.+(\s+[NSEW]\.)?\s*(?:\b(?:Apartment|Unit|Suite|Room)\s+[A-Za-z0-9#-]+)?$/,
                message:
                  'The owner residence address must contain the street number, the street name and optionaly the directional indicator and/or the apartment, unit, suite or room number. Such as: 789 Oak St, Apartment 101',
              },
            }}
          />
          <ComboBoxInput
            control={control}
            label="State"
            name="state"
            popoverClassName="w-[66%]"
            defaultValue={owner.address.state}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The owner residence state is required.',
              },
            }}
            onSelectionChange={(e) => {
              setState(String(e));
              resetField('city');
            }}
          >
            {statesOptions.map((item) => (
              <Item key={item.value}>{item.label}</Item>
            ))}
          </ComboBoxInput>
          <ComboBoxInput
            control={control}
            label="City"
            name="city"
            popoverClassName="w-[66%]"
            defaultValue={owner.address.city}
            isDisabled={!isEditing}
            rules={{
              required: {
                value: true,
                message: 'The owner residence city is required.',
              },
            }}
          >
            {citiesOptions?.map((item) => (
              <Item key={item.value}>{item.label}</Item>
            ))}
          </ComboBoxInput>
          <TextField
            control={control}
            name="zipCode"
            label="Zip Code"
            defaultValue={owner.address.zipCode}
            isDisabled={!isEditing}
            rules={{
              pattern: {
                value: /^\d{5}(?:[-\s]?\d{4})?$/,
                message:
                  'The ZIP Code may only contain digits, the formats 5-digits ZIP code and ZIP+4 are acceptable.',
              },
            }}
          />
          <TextField
            control={control}
            name="occupation"
            label="Occupation"
            defaultValue={owner.occupation}
            isDisabled={!isEditing}
          />
          <TextArea
            control={control}
            name="additionalNotes"
            label="Additional Notes"
            defaultValue={owner.additionalNotes}
            isDisabled={!isEditing}
          />
          <Checkbox
            control={control}
            name="acceptUpdates"
            defaultValue={owner.acceptUpdates}
            isDisabled={!isEditing}
          >
            The owner aggrees to receive clinic updates and/or appointment
            reminders?
          </Checkbox>
          <Checkbox
            control={control}
            name="acceptMarketing"
            defaultValue={owner.acceptMarketing}
            isDisabled={!isEditing}
          >
            The owner aggrees to receive newsletters, promotions and other
            contacts for marketing purposes?
          </Checkbox>
          <Checkbox
            control={control}
            name="treatmentAuthorization"
            defaultValue={owner.treatmentAuthorization}
            isDisabled={!isEditing}
          >
            The owner authorizes veterinary treatment for their pets, assuming
            financial responsability?
          </Checkbox>
        </Container>

        <div className="flex items-center justify-center gap-2 w-full">
          {isEditing ? (
            <>
              <Button
                key="btnConfirm"
                type="submit"
                icon={<FaCheck />}
                label="Confirm"
                theme="primary"
                isLoading={isPending}
                isDisabled={isPending}
              />
              <Button
                key="btnCancel"
                type="reset"
                icon={<FaTimes />}
                label="Cancel"
                theme="danger"
                isDisabled={isPending}
                onPress={() => {
                  setIsEditing(false);
                  reset();
                }}
              />
            </>
          ) : (
            <Button
              key="btnEdit"
              icon={<FaPencil />}
              label="Edit"
              type="button"
              onPress={() => setIsEditing(true)}
              theme="primary"
            />
          )}
        </div>
      </form>
    </Dialog>
  );
}
