import { SortOrder, SortType } from '../const';

export type CatalogParameters = {
  filters: {
    price: {
      minPrice: string,
      maxPrice: string,
    },
    category: {
      'Фотоаппарат': boolean,
      'Видеокамера': boolean,
    },
    type: {
      'Цифровая': boolean,
      'Плёночная': boolean,
      'Моментальная': boolean,
      'Коллекционная': boolean,
    },
    level: {
      'Нулевой': boolean,
      'Любительский': boolean,
      'Профессиональный': boolean,
    }
  }
  sort: {
    type: SortType,
    order: SortOrder,
  },
  page: string,
};
