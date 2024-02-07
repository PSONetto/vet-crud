import { FaPlus } from 'react-icons/fa6';

import { useQuery } from '@tanstack/react-query';

import Separator from '../../components/content/separator/Separator';
import CreateOwner from '../../components/crud/owner/CreateOwner';
import ListOwner from '../../components/crud/owner/ListOwner';
import BreadcrumbItem from '../../components/navigation/breadcrumbs/BreadcrumbItem';
import Breadcrumbs from '../../components/navigation/breadcrumbs/Breadcrumbs';
import ModalTrigger from '../../components/overlays/modal/ModalTrigger';
import { api } from '../../lib/api';
import { IOwner } from '../../models/owner';

export default function Home() {
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
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
      </Breadcrumbs>

      <Separator />

      <div className="flex justify-end mt-4 mb-1 ">
        <ModalTrigger label="New Pet Owner" labelIcon={<FaPlus />}>
          {(close) => <CreateOwner close={close} />}
        </ModalTrigger>
      </div>

      <ListOwner data={owners} isLoading={isLoading} />
    </>
  );
}
