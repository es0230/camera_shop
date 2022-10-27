import { URLParams } from './types/url-params';

const DEFAULT_CATALOG_PARAMS: URLParams = { page: ':page', sortType: ':sortType', order: ':order' };

const AppRoute = {
  Catalog: (params: URLParams = DEFAULT_CATALOG_PARAMS) => {
    const { page, sortType, order } = params;
    return `/catalog/${page}/${sortType}&${order}`; // /${createFilterURL(lowerPrice, higherPrice, category, level, productType)}
  },
  Product: (productId: string | number = ':id', tabType = ':tabType') => `/product/${productId}/${tabType}`,
  Unknown: () => '/*',
};

//const createSortURL = (type: string, order: string) => `${type}&${order}`;
//const createFilterURL = (lowerPrice: string, higherPrice: string, category: string, level: string, productType: string) => `${lowerPrice},${higherPrice}&${category}&${level}&${productType}`;

enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders'
}

enum NameSpace {
  Data = 'DATA',
}

enum TabType {
  Perks = 'perks',
  Description = 'description'
}

enum SortType {
  Price = 'price',
  Rating = 'rating',
}

enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

const MAX_RATING = 5;
const INITIAL_REVIEWS = 3;

const INITIAL_CATALOG_PAGE_URL_PARAMS: URLParams = { page: '1', sortType: SortType.Price, order: SortOrder.Ascending };

export { AppRoute, APIRoute, NameSpace, TabType, SortType, SortOrder, INITIAL_REVIEWS, MAX_RATING, INITIAL_CATALOG_PAGE_URL_PARAMS };
