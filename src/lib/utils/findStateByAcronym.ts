import { states } from '../../data/states.json';

export default function findStateByAcronym(acronym: string) {
  return states.find((state) => state.abbreviation === acronym)?.name;
}
