import { ReactNode, useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { Key } from 'react-aria';
import { FieldValues, useForm } from 'react-hook-form';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Item } from 'react-stately';

import { useMutation } from '@tanstack/react-query';

import * as cities from '../../../data/cities.json';
import { states } from '../../../data/states.json';
import { api } from '../../../lib/api';
import formatOptionArray from '../../../lib/utils/formatOptionArray';
import Button from '../../buttons/Button';
import { Checkbox } from '../../forms/input/checkbox/Checkbox';
import TextArea from '../../forms/input/text/area/TextArea';
import TextField from '../../forms/input/text/field/TextField';
import Tabs from '../../navigation/tab/Tabs';
import Dialog from '../../overlays/dialog/Dialog';
import ComboBoxInput from '../../pickers/combobox/ComboBoxInput';
import { IComboboxOption, ICreateOwnerProps } from './interfaces';

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:p-4 w-full overflow-y-auto">
      {children}
    </div>
  );
}

export default function CreateOwner({ close }: ICreateOwnerProps) {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ['create'],
    mutationFn: createOwner,
  });

  const { control, handleSubmit, resetField } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const tabKeys = ['personal', 'address', 'additional'];

  const [tabKey, setTabKey] = useState<Key>(tabKeys[0]);
  const [state, setState] = useState<string>();
  const [statesOptions, setStatesOptions] = useState<IComboboxOption[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<IComboboxOption[]>([]);

  async function createOwner(fieldValues: FieldValues) {
    const { data } = await api.post('/owner', fieldValues);

    return data;
  }

  function moveNext() {
    const index = tabKeys.findIndex((e: string) => e === tabKey);
    const lastIndex = tabKeys.length - 1;
    index + 1 > lastIndex
      ? setTabKey(tabKeys[lastIndex])
      : setTabKey(tabKeys[index + 1]);
  }

  async function submitData(fieldValues: FieldValues) {
    if (tabKey !== tabKeys[tabKeys.length - 1]) {
      moveNext();
    } else {
      try {
        const formattedFieldValues = {
          ...fieldValues,
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
  }

  useEffect(() => {
    const formattedStates = states.map((state) => ({
      label: state.name,
      value: state.abbreviation,
    }));

    setStatesOptions(formattedStates);
  }, []);

  useEffect(() => {
    resetField('city');
    if (state) {
      const arrCities = cities[state as keyof typeof cities];
      const formattedCities = formatOptionArray(arrCities);

      setCitiesOptions(formattedCities);
    }
  }, [resetField, state]);

  return (
    <Dialog
      title="Create Pet Owner"
      close={close}
      className="dark:text-gray-100"
    >
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col items-center justify-center"
      >
        <Container>
          <Tabs
            aria-label="Owner Information Form Tabs"
            selectedKey={tabKey}
            onSelectionChange={setTabKey}
            disabledKeys={tabKeys.filter((e) => e !== tabKey)}
          >
            <Item key={tabKeys[0]} title="Personal Information">
              <Container>
                <TextField
                  control={control}
                  name="firstName"
                  label="First Name"
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
                  name="emailAddress"
                  label="Email Address"
                  type="text"
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
                  rules={{
                    pattern: {
                      value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                      message: 'The owner phone number must contain 10 digits.',
                    },
                  }}
                />
              </Container>
            </Item>
            <Item key={tabKeys[1]} title="Address Information">
              <Container>
                <TextField
                  control={control}
                  name="street"
                  label="Street"
                  type="text"
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
                  rules={{
                    required: {
                      value: true,
                      message: 'The owner residence state is required.',
                    },
                  }}
                  onSelectionChange={(e) => setState(String(e))}
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
                  rules={{
                    pattern: {
                      value: /^\d{5}(?:[-\s]?\d{4})?$/,
                      message:
                        'The ZIP Code may only contain digits, the formats 5-digits ZIP code and ZIP+4 are acceptable.',
                    },
                  }}
                />
              </Container>
            </Item>
            <Item key={tabKeys[2]} title="Additional Information">
              <Container>
                <TextArea
                  control={control}
                  name="additionalNotes"
                  label="Additional Notes"
                />
                <Checkbox control={control} name="acceptUpdates">
                  The owner aggrees to receive clinic updates and/or appointment
                  reminders?
                </Checkbox>
                <Checkbox control={control} name="treatmentAuthorization">
                  The owner authorizes veterinary treatment for their pets,
                  assuming financial responsability?
                </Checkbox>
              </Container>
            </Item>
          </Tabs>
        </Container>

        <div className="flex p-5">
          {isError && (
            <span className="text-red-400 font-bold">{error.message}</span>
          )}

          {isSuccess && (
            <span className="text-green-400 font-bold">
              Owner created successefully
            </span>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 w-full mt-3">
          <Button
            type="button"
            icon={<FaChevronLeft />}
            onPress={() => {
              const index = tabKeys.findIndex((e: string) => e === tabKey);
              index - 1 < 0
                ? setTabKey(tabKeys[0])
                : setTabKey(tabKeys[index - 1]);
            }}
            isDisabled={tabKey === tabKeys[0]}
            label="Previous"
            theme="primary"
          />

          <Button
            type="submit"
            icon={
              tabKey === tabKeys[tabKeys.length - 1] ? (
                <FaCheck />
              ) : (
                <FaChevronRight />
              )
            }
            iconPosition={
              tabKey === tabKeys[tabKeys.length - 1] ? 'left' : 'right'
            }
            isDisabled={isPending}
            isLoading={isPending}
            label={tabKey === tabKeys[tabKeys.length - 1] ? 'Confirm' : 'Next'}
            theme="primary"
          />
        </div>
      </form>
    </Dialog>
  );
}
