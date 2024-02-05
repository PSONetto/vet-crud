/* eslint-disable import/named */
import { AriaTabPanelProps } from 'react-aria';
import { Node, TabListState } from 'react-stately';

export interface ITabPanel extends AriaTabPanelProps {
  state: TabListState<object>;
}

export interface ITab {
  item: Node<object>;
  state: TabListState<object>;
}
