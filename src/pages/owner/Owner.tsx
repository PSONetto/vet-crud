import { FaTimes } from 'react-icons/fa';
import { FaCheck, FaPencil, FaPlus } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import Button from '../../components/buttons/Button';
import Separator from '../../components/content/separator/Separator';
import EditOwner from '../../components/crud/owner/EditOwner';
import CreatePet from '../../components/crud/pet/CreatePet';
import ListPet from '../../components/crud/pet/ListPet';
import BreadcrumbItem from '../../components/navigation/breadcrumbs/BreadcrumbItem';
import Breadcrumbs from '../../components/navigation/breadcrumbs/Breadcrumbs';
import ModalTrigger from '../../components/overlays/modal/ModalTrigger';
import { api } from '../../lib/api';
import formatPhoneNumber from '../../lib/utils/formatPhoneNumber';
import formatZipCode from '../../lib/utils/formatZipCode';
import { IOwner } from '../../models/owner';

export default function Owner() {
  const { id } = useParams();

  const { data: owner, isLoading } = useQuery({
    queryKey: ['owner'],
    queryFn: () => getOwner(id!),
  });

  async function getOwner(id: string) {
    try {
      const { data } = await api.get(`/owner/${id}`);
      return data as IOwner;
    } catch (error) {
      console.error(error);
    }
  }

  function DisplayData({
    label,
    children,
    large,
  }: {
    label: string;
    children: React.ReactNode;
    large?: boolean;
  }) {
    return (
      <div className={`flex items-center gap-2 ${large && 'text-xl'}`}>
        <span className="font-bold">{label}:</span>
        <span>{children}</span>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/owner/${owner?.id}`}>
          Owner:{' '}
          {isLoading ? '. . .' : owner?.firstName + ' ' + owner?.lastName}
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col w-full p-6 mt-5 border rounded border-gray-500">
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:px-2">
            <DisplayData label="Name" large>
              {owner?.firstName} {owner?.lastName}
            </DisplayData>

            <DisplayData label="Treatment Authorization" large>
              {owner?.treatmentAuthorization ? (
                <span className="text-green-400">
                  <FaCheck />
                </span>
              ) : (
                <span className="text-red-400">
                  <FaTimes />
                </span>
              )}
            </DisplayData>

            <div className="flex">
              {isLoading ? (
                <Button
                  isDisabled={true}
                  isLoading={true}
                  label="Edit Pet Owner"
                />
              ) : (
                owner && (
                  <ModalTrigger label="Edit Pet Owner" labelIcon={<FaPencil />}>
                    {(close) => <EditOwner owner={owner} close={close} />}
                  </ModalTrigger>
                )
              )}
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap md:justify-between md:gap-2">
            <div className="flex flex-col">
              <span className="italic">Contact Information</span>

              <div className="px-2">
                <DisplayData label="E-mail">{owner?.emailAddress}</DisplayData>
                <DisplayData label="Phone 1">
                  {formatPhoneNumber(owner?.phoneNumber)}
                </DisplayData>
                <DisplayData label="Phone 2">
                  {formatPhoneNumber(owner?.alternativePhoneNumber)}
                </DisplayData>
                <DisplayData label="Preferred Contact Method">
                  {owner?.preferredContactMethod}
                </DisplayData>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="italic">Address Information</span>

              <div className="px-2">
                <DisplayData label="Street">
                  {owner?.address.street}
                </DisplayData>
                <DisplayData label="City">{owner?.address.city}</DisplayData>
                <DisplayData label="State">{owner?.address.state}</DisplayData>
                <DisplayData label="Zip Code">
                  {formatZipCode(owner?.address.zipCode)}
                </DisplayData>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="italic">Additional Information</span>

              <div className="px-2">
                <DisplayData label="ID Number">{owner?.idNumber}</DisplayData>
                <DisplayData label="Occupation">
                  {owner?.occupation}
                </DisplayData>
                <DisplayData label="Accept Updates">
                  {owner?.acceptUpdates ? 'Yes' : 'No'}
                </DisplayData>
                <DisplayData label="Accept Marketing">
                  {owner?.acceptMarketing ? 'Yes' : 'No'}
                </DisplayData>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <span className="italic">Notes</span>

          <div className="px-2">
            <span className="text-wrap">
              {owner?.additionalNotes || 'Nothing to mention.'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 mb-1 ">
        <ModalTrigger label="New Pet" labelIcon={<FaPlus />}>
          {(close) => <CreatePet close={close} />}
        </ModalTrigger>
      </div>

      <ListPet data={owner?.pets} isLoading={isLoading} />
    </>
  );
}
