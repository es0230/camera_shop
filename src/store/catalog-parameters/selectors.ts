import { FilterCategories, FilterLevels, FilterTypes, NameSpace, SortOrder, SortType } from '../../const';
import { Filter } from '../../types/filter';
import { State } from '../../types/state';
import { URLParams } from '../../types/url-params';

export const selectFilterState = (state: State): Filter => state[NameSpace.Filters].filters;

export const selectSortState = (state: State): { type: SortType, order: SortOrder } => state[NameSpace.Filters].sort;

export const selectCurrentPage = (state: State): string => state[NameSpace.Filters].page;

export const selectPageParams = (state: State): URLParams => {
  const { filters, page, sort } = state[NameSpace.Filters];
  const { order } = sort;
  const { category, level, price } = filters;

  return {
    page,
    sortType: sort.type,
    order,
    minPrice: price.minPrice,
    maxPrice: price.maxPrice,
    category: Object.entries(category).filter(([i, isOn]) => isOn).map((el) => el[0]).join(',') || FilterCategories.Any,
    productType: Object.entries(filters.type).filter(([i, isOn]) => isOn).map((el) => el[0]).join(',') || FilterTypes.Any,
    level: Object.entries(level).filter(([i, isOn]) => isOn).map((el) => el[0]).join(',') || FilterLevels.Any,
  };
};
