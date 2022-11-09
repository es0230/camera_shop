import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTER_VALUE, FilterCategories, FilterLevels, FilterTypes, NameSpace, SortOrder, SortType } from '../../const';
import { CatalogParameters } from '../../types/catalog-parameters';

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

export const catalogParameters = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    actualizeState: (state, action) => {
      const { page, sortType, order, category, minPrice, maxPrice, level, productType } = action.payload;
      state.page = page;
      state.sort.type = sortType;
      state.sort.order = order;
      state.filters.category['Фотоаппарат'] = category.includes(FilterCategories.Photo);
      state.filters.category['Видеокамера'] = category.includes(FilterCategories.Video);
      state.filters.level['Нулевой'] = level.includes(FilterLevels.Zero);
      state.filters.level['Любительский'] = level.includes(FilterLevels.Amateur);
      state.filters.level['Профессиональный'] = level.includes(FilterLevels.Professional);
      state.filters.type['Коллекционная'] = productType.includes(FilterTypes.Collection);
      state.filters.type['Моментальная'] = productType.includes(FilterTypes.Snapshot);
      state.filters.type['Плёночная'] = productType.includes(FilterTypes.Film);
      state.filters.type['Цифровая'] = productType.includes(FilterTypes.Digital);
      state.filters.price.minPrice = minPrice;
      state.filters.price.maxPrice = maxPrice;
    },
    setSortType: (state, action) => {
      state.sort.type = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sort.order = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setMinPriceFilter: (state, action) => {
      state.filters.price.minPrice = action.payload;
    },
    setMaxPriceFilter: (state, action) => {
      state.filters.price.maxPrice = action.payload;
    },
    toggleCategoryFilter: (state, action) => {
      state.filters.category[action.payload as 'Фотоаппарат' | 'Видеокамера'] = !state.filters.category[action.payload as 'Фотоаппарат' | 'Видеокамера'];
    },
    toggleCameraTypeFilter: (state, action) => {
      state.filters.type[action.payload as 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная'] = !state.filters.type[action.payload as 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная'];
    },
    toggleLevelFilter: (state, action) => {
      state.filters.level[action.payload as 'Нулевой' | 'Любительский' | 'Профессиональный'] = !state.filters.level[action.payload as 'Нулевой' | 'Любительский' | 'Профессиональный'];
    },
  }
});

export const { actualizeState, setSortType, setSortOrder, setCurrentPage, setMinPriceFilter, setMaxPriceFilter, toggleCategoryFilter, toggleLevelFilter, toggleCameraTypeFilter } = catalogParameters.actions;

