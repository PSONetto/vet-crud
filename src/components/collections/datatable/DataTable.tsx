// eslint-disable-next-line import/named
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import DataTable, { TableProps } from 'react-data-table-component';

import Loading from '../../loading/Loading';

export default function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? setTheme('dark')
      : setTheme('light');

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        setTheme(newColorScheme);
      });
  }, []);

  return (
    <DataTable
      pagination
      dense
      striped
      highlightOnHover
      progressComponent={<Loading />}
      theme={theme}
      {...props}
    />
  );
}
