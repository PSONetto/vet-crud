'use client';

import { TableOptions, useTable } from 'react-table';

import { ITableProps } from './interface';

export default function Table({ columns, data }: ITableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as TableOptions<object>);

  return (
    <div className="flex flex-col w-full">
      <table {...getTableProps()} className="min-w-full">
        <thead className="bg-gradient-to-bl from-zinc-800 to-zinc-900">
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  <div className="flex items-center justify-between">
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-zinc-700 divide-y divide-gray-500"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
