import { useState } from 'react';
// eslint-disable-next-line import/named
import { Key } from 'react-aria';
import { FieldValues, useForm } from 'react-hook-form';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Item } from 'react-stately';

import Button from '../../buttons/button/Button';
import { Checkbox } from '../../forms/checkbox/Checkbox';
import TextArea from '../../forms/input/text/area/TextArea';
import TextField from '../../forms/input/text/field/TextField';
import Tabs from '../../navigation/tab/Tabs';
import Dialog from '../../overlays/dialog/Dialog';
import ComboBoxInput from '../../pickers/combobox/ComboBoxInput';
import { ICreateOwnerProps } from './interfaces';

export default function CreateOwner({ close }: ICreateOwnerProps) {
  const { control, handleSubmit } = useForm();

  const [tabKey, setTabKey] = useState<Key>(1);

  const contactMethods = ['Phone', 'E-mail', 'Whatsapp'];
  const keys = ['1', '2', '3', '4'];

  function moveNext() {
    Number(tabKey) + 1 > 4
      ? setTabKey('4')
      : setTabKey(String(Number(tabKey) + 1));
  }

  function submitData(fieldValues: FieldValues) {
    console.log(fieldValues);

    if (tabKey !== '4') {
      moveNext();
    } else {
      console.log('submit');
    }
  }

  function Container({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col mb-3 p-4 w-full overflow-y-auto">
        {children}
      </div>
    );
  }

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
            disabledKeys={keys.filter((e) => e !== tabKey)}
          >
            <Item key={1} title="Personal Information">
              <Container>
                <TextField
                  control={control}
                  name="firstName"
                  label="First Name"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="lastName"
                  label="Last Name"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="idNumber"
                  label="ID Number"
                  type="tel"
                  validationBehavior="native"
                />
              </Container>
            </Item>
            <Item key={2} title="Contact Information">
              <Container>
                <TextField
                  control={control}
                  name="emailAddress"
                  label="Email Address"
                  type="email"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="alternativePhoneNumber"
                  label="Alternative Phone Number"
                  type="tel"
                  validationBehavior="native"
                />
                <ComboBoxInput
                  control={control}
                  label="Preferred Contact Method"
                  name="preferredContactMethod"
                  popoverClassName="w-[72%]"
                  isRequired
                >
                  {contactMethods.sort().map((method) => (
                    <Item key={method.toLowerCase()}>{method}</Item>
                  ))}
                </ComboBoxInput>
              </Container>
            </Item>
            <Item key={3} title="Address Information">
              <Container>
                <TextField
                  control={control}
                  name="street"
                  label="Street"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="state"
                  label="State"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="city"
                  label="City"
                  isRequired
                  validationBehavior="native"
                />
                <TextField
                  control={control}
                  name="zipCode"
                  label="Zip Code"
                  validationBehavior="native"
                />
              </Container>
            </Item>
            <Item key={4} title="Additional Information">
              <Container>
                <TextField
                  control={control}
                  name="occupation"
                  label="Occupation"
                  validationBehavior="native"
                />
                <TextArea
                  control={control}
                  name="additionalNotes"
                  label="Additional Notes"
                  validationBehavior="native"
                />
                <Checkbox
                  control={control}
                  name="acceptUpdates"
                  validationBehavior="native"
                >
                  Accept Updates
                </Checkbox>

                <Checkbox
                  control={control}
                  name="acceptMarketing"
                  validationBehavior="native"
                >
                  Accept Marketing
                </Checkbox>
              </Container>
            </Item>
          </Tabs>
        </Container>

        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            type="button"
            icon={<FaChevronLeft />}
            theme={tabKey !== '1' ? 'primary' : undefined}
            onPress={() => {
              Number(tabKey) - 1 < 1
                ? setTabKey('1')
                : setTabKey(String(Number(tabKey) - 1));
            }}
            isDisabled={tabKey === '1'}
          >
            Previous
          </Button>
          {tabKey === '4' ? (
            <Button type="submit" icon={<FaCheck />} theme="primary">
              Confirm
            </Button>
          ) : (
            <Button
              type="submit"
              icon={<FaChevronRight />}
              theme="primary"
              iconPos="right"
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </Dialog>
  );
}
