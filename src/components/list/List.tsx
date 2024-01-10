import { FaPlus } from 'react-icons/fa';

import Button from '../buttons/button/Button';
import Table from '../collections/table/Table';

export default function List() {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
  ];

  const data = [
    {
      name: 'John Doe',
      age: 30,
    },
    {
      name: 'Jane Smith',
      age: 25,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <span className="text-xl mb-2 font-bold">Our Pets</span>
      <div className="flex mb-1">
        <Button icon={<FaPlus />}>New Pet</Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}
