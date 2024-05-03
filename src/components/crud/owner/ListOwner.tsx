// eslint-disable-next-line import/named
import { TableColumn } from 'react-data-table-component';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import findStateByAcronym from '../../../lib/utils/findStateByAcronym';
import formatPhoneNumber from '../../../lib/utils/formatPhoneNumber';
import { IOwner } from '../../../models/owner';
import DataTableBase from '../../collections/datatable/DataTable';
import { IListOwnerProps } from './interfaces';

export default function ListOwner({ data, isLoading }: IListOwnerProps) {
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
      name: 'Email',
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
      format: (row) => findStateByAcronym(row.address.state),
      sortable: true,
    },
    {
      name: 'Authorization',
      selector: (row) => row.treatmentAuthorization,
      sortable: true,
      format: (row) =>
        row.treatmentAuthorization ? (
          <span className="text-green-400">
            <FaCheck />
          </span>
        ) : (
          <span className="text-red-400">
            <FaTimes />
          </span>
        ),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <DataTableBase
        columns={columns}
        data={data ?? []}
        title="Pet Owners"
        progressPending={isLoading}
        onRowClicked={(row) => navigate(`/owner/${row.id}`)}
        pointerOnHover
      />
    </div>
  );
}
