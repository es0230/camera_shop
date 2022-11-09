import { FilterCategories, FilterTypes, FilterLevels, DEFAULT_FILTER_VALUE } from './const';
import { URLParams } from './types/url-params';

export const getExtraQueryURL = (params: URLParams) => {
  const { page, sortType, order, category, productType, level, minPrice, maxPrice } = params;
  const categoryURLPart = category === FilterCategories.Any ? '' : category.split(',').map((el) => `&category=${el}`).join('');
  const productTypeURLPart = productType === FilterTypes.Any ? '' : productType.split(',').map((el) => `&type=${el}`).join('');
  const levelURLPart = level === FilterLevels.Any ? '' : level.split(',').map((el) => `&level=${el}`).join('');
  const priceURLPart = `${minPrice !== DEFAULT_FILTER_VALUE ? `&price_gte=${minPrice}` : ''}${maxPrice !== DEFAULT_FILTER_VALUE ? `&price_lte=${maxPrice}` : ''}`;
  const extraQueryURL = `?_start=${(+page - 1) * 9}&_end=${+page * 9}&_sort=${sortType}&_order=${order}${categoryURLPart}${productTypeURLPart}${levelURLPart}${priceURLPart}`;
  return extraQueryURL;
};
