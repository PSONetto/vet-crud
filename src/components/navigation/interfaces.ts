/* eslint-disable import/named */
import {
  AriaBreadcrumbsProps,
  AriaLinkOptions,
  AriaTabPanelProps,
} from 'react-aria';
import { Node, TabListState } from 'react-stately';

export interface ITabPanel extends AriaTabPanelProps {
  state: TabListState<object>;
}

export interface ITab {
  item: Node<object>;
  state: TabListState<object>;
}

export interface IAriaLink extends AriaLinkOptions {
  children: React.ReactNode;
  className?: string;
}

export interface IBreadcrumbs extends AriaBreadcrumbsProps {
  children: JSX.Element | JSX.Element[];
}
