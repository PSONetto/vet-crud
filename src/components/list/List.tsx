import { FaPlus } from 'react-icons/fa';

import CreatePetForm from '../../pages/home/crud/CreatePetForm';
import Table from '../collections/table/Table';
import ModalTrigger from '../overlays/modal/ModalTrigger';

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
        <ModalTrigger
          modalClassName="w-3/4"
          label="New Pet"
          labelIcon={<FaPlus />}
        >
          {(close) => <CreatePetForm close={close} />}
        </ModalTrigger>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}
