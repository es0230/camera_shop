import { DEFAULT_FILTER_VALUE, SortType, SortOrder } from '../../const';
import { CatalogParameters } from '../../types/catalog-parameters';
import { actualizeState, catalogParameters, setCurrentPage, setMaxPriceFilter, setMinPriceFilter, setSortOrder, setSortType, toggleCameraTypeFilter, toggleCategoryFilter, toggleLevelFilter } from './catalog-parameters';

const initialState: CatalogParameters = {
  filters: {
    price: {
      minPrice: DEFAULT_FILTER_VALUE,
      maxPrice: DEFAULT_FILTER_VALUE,
    },
    category: {
      'Фотоаппарат': false,
      'Видеокамера': false,
    },
    type: {
      'Цифровая': false,
      'Плёночная': false,
      'Моментальная': false,
      'Коллекционная': false,
    },
    level: {
      'Нулевой': false,
      'Любительский': false,
      'Профессиональный': false,
    }
  },
  sort: {
    type: SortType.Price,
    order: SortOrder.Ascending,
  },
  page: '1',
};

describe('Testing catalogParameters', () => {
  let state: CatalogParameters;

  beforeEach(() => {
    state = initialState;
  });

  it('testing actualizeState action', () => {
    expect(catalogParameters.reducer(state, {
      type: actualizeState.type, payload: { category: 'Фотоаппарат,Видеокамера', level: 'Нулевой', maxPrice: '199000', minPrice: '1990', order: 'desc', page: '3', productType: 'Цифровая,Коллекционная', sortType: 'rating' }
    }))
      .toEqual({
        filters: {
          price: {
            minPrice: '1990',
            maxPrice: '199000',
          },
          category: {
            'Фотоаппарат': true,
            'Видеокамера': true,
          },
          type: {
            'Цифровая': true,
            'Плёночная': false,
            'Моментальная': false,
            'Коллекционная': true,
          },
          level: {
            'Нулевой': true,
            'Любительский': false,
            'Профессиональный': false,
          }
        },
        sort: {
          type: SortType.Rating,
          order: SortOrder.Descending,
        },
        page: '3',
      });
  });

  it('testing setSortType action', () => {
    expect(catalogParameters.reducer(state, {
      type: setSortType.type, payload: SortType.Rating
    }))
      .toEqual({ ...initialState, sort: { type: SortType.Rating, order: SortOrder.Ascending } });
  });

  it('testing setSortOrder action', () => {
    expect(catalogParameters.reducer(state, {
      type: setSortOrder.type, payload: SortOrder.Descending
    }))
      .toEqual({ ...initialState, sort: { type: SortType.Price, order: SortOrder.Descending } });
  });

  it('testing setCurrentPage action', () => {
    expect(catalogParameters.reducer(state, {
      type: setCurrentPage.type, payload: '3'
    }))
      .toEqual({ ...initialState, page: '3' });
  });

  it('testing setMinPriceFilter action', () => {
    expect(catalogParameters.reducer(state, {
      type: setMinPriceFilter.type, payload: '100'
    }))
      .toEqual({ ...initialState, filters: { ...initialState.filters, price: { minPrice: '100', maxPrice: DEFAULT_FILTER_VALUE } } });
  });

  it('testing setMaxPriceFilter action', () => {
    expect(catalogParameters.reducer(state, {
      type: setMaxPriceFilter.type, payload: '100'
    }))
      .toEqual({ ...initialState, filters: { ...initialState.filters, price: { maxPrice: '100', minPrice: DEFAULT_FILTER_VALUE } } });
  });

  it('testing toggleCategoryFilter action', () => {
    expect(catalogParameters.reducer(state, {
      type: toggleCategoryFilter.type, payload: 'Фотоаппарат'
    }))
      .toEqual({ ...initialState, filters: { ...initialState.filters, category: { ...initialState.filters.category, 'Фотоаппарат': true } } });
  });

  it('testing toggleCameraTypeFilter action', () => {
    expect(catalogParameters.reducer(state, {
      type: toggleCameraTypeFilter.type, payload: 'Цифровая'
    }))
      .toEqual({ ...initialState, filters: { ...initialState.filters, type: { ...initialState.filters.type, 'Цифровая': true } } });
  });

  it('testing toggleLevelFilter action', () => {
    expect(catalogParameters.reducer(state, {
      type: toggleLevelFilter.type, payload: 'Нулевой'
    }))
      .toEqual({ ...initialState, filters: { ...initialState.filters, level: { ...initialState.filters.level, 'Нулевой': true } } });
  });
});
