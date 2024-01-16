/* eslint-disable import/named */
import { AriaListBoxOptions } from 'react-aria';
import { ListState, Node } from 'react-stately';
import { Column } from 'react-table';

export interface ITableProps {
  columns: Column[];
  data: object[];
}

export interface IListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

export interface ISectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

export interface IOptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}
