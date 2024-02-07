// eslint-disable-next-line import/named
import { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

import { IPet } from '../../../models/owner';
import DataTableBase from '../../collections/datatable/DataTable';
import { IListPetProps } from './interfaces';

export default function ListPet({ data, isLoading }: IListPetProps) {
  const navigate = useNavigate();

  const columns: TableColumn<IPet>[] = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Species',
      selector: (row) => row.species,
    },
    {
      name: 'Breed',
      selector: (row) => row.breed ?? '',
      format: (row) => row.breed || 'No breed',
    },
    {
      name: 'Age',
      selector: (row) => row.age,
      format: (row) => `${row.age} year${row.age > 1 ? 's' : ''}`,
    },
    {
      name: 'Sex',
      selector: (row) => row.sex,
      format: (row) => (row.sex === 'M' ? 'Male' : 'Female'),
      sortable: true,
    },
    {
      name: 'Neutered/Spayed',
      selector: (row) => row.neuteredSpayed,
      format: (row) => (row.neuteredSpayed ? 'Yes' : 'No'),
      sortable: true,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <DataTableBase
        columns={columns}
        data={data ?? []}
        title="Pets"
        progressPending={isLoading}
        onRowClicked={(row) => navigate(`/pet/${row.id}`)}
        pointerOnHover
      />
    </div>
  );
}
