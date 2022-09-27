enum AppRoute {
  Basket = '/basket',
  Catalog = '/catalog/:page',
  Product = '/product/:id&:tabType',
  Unknown = '*',
}

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

const MAX_RATING = 5;

export { AppRoute, APIRoute, NameSpace, MAX_RATING };
