const AppRoute = {
  Catalog: (page: string | number = ':page', type = ':type', order = ':order') => `/catalog/${page}&${type}&${order}`,
  Product: (productId: string | number = ':id', tabType = ':tabType') => `/product/${productId}&${tabType}`,
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

const MAX_RATING = 5;
const INITIAL_PAGE = 1;
const INITIAL_REVIEWS = 3;

export { AppRoute, APIRoute, NameSpace, TabType, SortType, SortOrder, INITIAL_REVIEWS, MAX_RATING, INITIAL_PAGE };
