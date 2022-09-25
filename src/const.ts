enum AppRoute {
  Basket = '/basket',
  Catalog = '/catalog',
  Product = '/product',
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

export { AppRoute, APIRoute, NameSpace };