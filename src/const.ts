const AppRoute = {
  Catalog: (page: string | number = ':page') => `/catalog/${page}`,
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

const MAX_RATING = 5;
const INITIAL_PAGE = 1;
const INITIAL_REVIEWS = 3;

export { AppRoute, APIRoute, NameSpace, TabType, INITIAL_REVIEWS, MAX_RATING, INITIAL_PAGE };
