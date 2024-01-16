/* eslint-disable import/named */
import { createContext } from 'react';
import { RadioGroupState } from 'react-stately';

export const RadioContext = createContext<RadioGroupState | null>(null);
