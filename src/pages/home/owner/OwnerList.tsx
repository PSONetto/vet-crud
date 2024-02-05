import { FaPlus } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

import { useQuery } from '@tanstack/react-query';

import Table from '../../../components/collections/table/Table';
import ModalTrigger from '../../../components/overlays/modal/ModalTrigger';
import { api } from '../../../lib/api';
import CreateOwnerForm from './CreateOwnerForm';

export default function OwnerList() {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'E-mail',
      accessor: 'emailAddress',
    },
    {
      Header: 'Phone',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Authorization',
      accessor: 'treatmentAuthorization',
    },
  ];

  const { data: owners, isLoading } = useQuery({
    queryKey: ['priorities'],
    queryFn: getOwners,
  });

  async function getOwners() {
    try {
      const { data } = await api.get('owner');
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  function Loading() {
    return (
      <div className="flex items-center justify-center min-h-48">
        <span className="animate-spin text-5xl text-white">
          <ImSpinner8 />
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <span className="text-xl mb-2 font-bold">Pet Owner List</span>

      <div className="flex mb-1">
        <ModalTrigger
          modalClassName="w-3/4"
          label="New Pet Owner"
          labelIcon={<FaPlus />}
        >
          {(close) => <CreateOwnerForm close={close} />}
        </ModalTrigger>
      </div>
      {isLoading ? <Loading /> : <Table columns={columns} data={owners} />}
    </div>
  );
}
