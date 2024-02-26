import { useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import DataTable, { TableProps, createTheme } from 'react-data-table-component';

import Loading from '../../loading/Loading';

export default function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? setTheme('customDark')
      : setTheme('customLight');

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'customDark' : 'customLight';
        setTheme(newColorScheme);
      });
  }, []);

  createTheme(
    'customDark',
    {
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
      background: {
        default: '#27272a',
      },
    },
    'dark',
  );

  createTheme(
    'customLight',
    {
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
      background: {
        default: '#111827',
      },
    },
    'light',
  );

  return (
    <DataTable
      pagination
      dense
      responsive
      striped
      pointerOnHover
      highlightOnHover
      progressComponent={<Loading />}
      theme={theme}
      {...props}
    />
  );
}
