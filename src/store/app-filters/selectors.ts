import { NameSpace } from '../../const';
import { AppFilters } from '../../types/app-filters';
import { State } from '../../types/state';

export const selectFilterState = (state: State): AppFilters => state[NameSpace.Filters];
