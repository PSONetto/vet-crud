// eslint-disable-next-line import/named
import { TableColumn } from 'react-data-table-component';
import { FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api';
import formatPhoneNumber from '../../../lib/utils/formatPhoneNumber';
import { IOwner } from '../../../models/owner';
import DataTableBase from '../../collections/datatable/DataTable';
import ModalTrigger from '../../overlays/modal/ModalTrigger';
import CreateOwnerForm from './CreateOwner';

export default function ListOwner() {
  const navigate = useNavigate();
  const columns: TableColumn<IOwner>[] = [
    {
      name: 'Name',
      selector: (row) => row.firstName,
      format: (row) => row.firstName.concat(' ', row.lastName),
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      omit: true,
    },
    {
      name: 'E-mail',
      selector: (row) => row.emailAddress,
    },
    {
      name: 'Phone',
      selector: (row) => row.phoneNumber,
      format: (row) => formatPhoneNumber(row.phoneNumber),
    },
    {
      name: 'City',
      selector: (row) => row.address.city,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row) => row.address.state,
      sortable: true,
    },
    {
      name: 'Authorization',
      selector: (row) => row.treatmentAuthorization,
      sortable: true,
      format: (row) =>
        row.treatmentAuthorization ? (
          <span className="text-green-600">
            <FaCheck />
          </span>
        ) : (
          <span className="text-red-600">
            <FaTimes />
          </span>
        ),
    },
  ];

  const { data: owners, isLoading } = useQuery({
    queryKey: ['owners'],
    queryFn: getOwners,
  });

  async function getOwners() {
    try {
      const { data } = await api.get('owner');
      return data as IOwner[];
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex mb-1">
        <ModalTrigger
          modalClassName="w-3/4"
          label="New Pet Owner"
          labelIcon={<FaPlus />}
        >
          {(close) => <CreateOwnerForm close={close} />}
        </ModalTrigger>
      </div>

      <div className="flex flex-col w-full">
        <DataTableBase
          columns={columns}
          data={owners ?? []}
          title="Pet Owners"
          progressPending={isLoading}
          onRowClicked={(row) => navigate(`/owner/${row.id}`)}
          pointerOnHover
        />
      </div>
    </div>
  );
}
