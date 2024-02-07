import { ReactNode } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Item } from 'react-stately';

import { Checkbox } from '../../forms/checkbox/Checkbox';
import TextArea from '../../forms/input/text/area/TextArea';
import TextField from '../../forms/input/text/field/TextField';
import ComboBoxInput from '../../pickers/combobox/ComboBoxInput';
import { IEditOwnerProps } from './interfaces';

export default function EditOwner({ owner }: IEditOwnerProps) {
  function Container({ children }: { children: ReactNode }) {
    return <div className="flex flex-col md:flex-row md:gap-2">{children}</div>;
  }

  const { control, handleSubmit } = useForm();

  const contactMethods = ['Phone', 'E-mail', 'Whatsapp'];

  function submitData(fieldValues: FieldValues) {
    console.log(fieldValues);
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col gap-2 w-full"
    >
      <Container>
        <TextField
          control={control}
          name="firstName"
          label="First Name"
          defaultValue={owner?.firstName}
          validationBehavior="native"
        />
        <TextField
          control={control}
          name="lastName"
          label="Last Name"
          defaultValue={owner?.lastName}
          validationBehavior="native"
        />
      </Container>

      <Container>
        <TextField
          control={control}
          name="emailAddress"
          label="E-mail"
          defaultValue={owner?.emailAddress}
          validationBehavior="native"
        />
        <TextField
          control={control}
          name="phoneNumber"
          label="Phone Number"
          defaultValue={owner?.phoneNumber}
          validationBehavior="native"
        />
        <TextField
          control={control}
          name="alternativePhoneNumber"
          label="Alternative Phone Number"
          defaultValue={owner?.alternativePhoneNumber}
          validationBehavior="native"
        />
        <ComboBoxInput
          control={control}
          label="Preferred Contact Method"
          name="preferredContactMethod"
          popoverClassName="w-[72%]"
          defaultValue={owner?.preferredContactMethod}
        >
          {contactMethods.sort().map((method) => (
            <Item key={method.toLowerCase()}>{method}</Item>
          ))}
        </ComboBoxInput>
      </Container>

      <Container>
        <TextField
          control={control}
          name="street"
          label="Street"
          defaultValue={owner?.address.street}
          validationBehavior="native"
        />
        <TextField
          control={control}
          name="state"
          label="State"
          defaultValue={owner?.address.state}
          validationBehavior="native"
        />
        <TextField
          control={control}
          name="city"
          label="City"
          defaultValue={owner?.address.city}
          validationBehavior="native"
        />
        <TextField
          control={control}
          name="zipCode"
          label="Zip Code"
          defaultValue={owner?.address.zipCode}
          validationBehavior="native"
        />
      </Container>

      <TextField
        control={control}
        name="occupation"
        label="Occupation"
        defaultValue={owner?.occupation}
        validationBehavior="native"
      />

      <TextArea
        control={control}
        name="additionalNotes"
        label="Additional Notes"
        defaultValue={owner?.additionalNotes}
        validationBehavior="native"
      />

      <Checkbox
        control={control}
        name="acceptUpdates"
        defaultValue={owner?.acceptUpdates}
        validationBehavior="native"
      >
        Accept Updates
      </Checkbox>

      <Checkbox
        control={control}
        name="acceptMarketing"
        defaultValue={owner?.acceptMarketing}
        validationBehavior="native"
      >
        Accept Marketing
      </Checkbox>

      <Checkbox
        control={control}
        name="treatmentAuthorization"
        defaultValue={owner?.treatmentAuthorization}
        validationBehavior="native"
      >
        Treatment Authorization
      </Checkbox>
    </form>
  );
}
