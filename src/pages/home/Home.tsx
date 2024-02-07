import ListOwner from '../../components/crud/owner/ListOwner';
import BreadcrumbItem from '../../components/navigation/breadcrumbs/BreadcrumbItem';
import Breadcrumbs from '../../components/navigation/breadcrumbs/Breadcrumbs';

export default function Home() {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
      </Breadcrumbs>

      <ListOwner />
    </>
  );
}
