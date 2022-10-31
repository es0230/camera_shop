import { URLParams } from './types/url-params';

const DEFAULT_CATALOG_PARAMS: URLParams = { page: ':page', sortType: ':sortType', order: ':order', minPrice: ':minPrice', maxPrice: ':maxPrice', category: ':category', productType: ':productType', level: ':level' };

const AppRoute = {
  Catalog: (params: URLParams = DEFAULT_CATALOG_PARAMS) => {
    const { page, sortType, order, minPrice, maxPrice, category, productType, level } = params;
    return `/catalog/${page}/${sortType}&${order}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&productType=${productType}&level=${level}`; // /${createFilterURL(lowerPrice, higherPrice, category, level, productType)}
  },
  Product: (productId: string | number = ':id', tabType = ':tabType') => `/product/${productId}/${tabType}`,
  Unknown: () => '/*',
};

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

enum FilterCategories {
  Any = 'anyCategory',
  Photo = 'photocamera',
  Video = 'videocamera'
}

enum FilterTypes {
  Any = 'anyType',
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

enum FilterLevels {
  Any = 'anyLevel',
  Zero = 'zero',
  Amateur = 'amateur',
  Professional = 'professional'
}

const MAX_RATING = 5;
const INITIAL_REVIEWS = 3;
const DEFAULT_FILTER_VALUE = 'default';

const INITIAL_CATALOG_PAGE_URL_PARAMS: URLParams = { page: '1', sortType: SortType.Price, order: SortOrder.Ascending, minPrice: DEFAULT_FILTER_VALUE, maxPrice: DEFAULT_FILTER_VALUE, category: FilterCategories.Any, productType: FilterTypes.Any, level: FilterLevels.Any };

export { AppRoute, APIRoute, NameSpace, TabType, SortType, SortOrder, FilterCategories, FilterTypes, FilterLevels, INITIAL_REVIEWS, DEFAULT_FILTER_VALUE, MAX_RATING, INITIAL_CATALOG_PAGE_URL_PARAMS };
