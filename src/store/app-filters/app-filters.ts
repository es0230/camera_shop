import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTER_VALUE, NameSpace } from '../../const';
import { AppFilters } from '../../types/app-filters';

const initialState: AppFilters = {
  price: {
    minPrice: DEFAULT_FILTER_VALUE,
    maxPrice: DEFAULT_FILTER_VALUE,
  },
  category: {
    photocamera: false,
    videocamera: false,
  },
  type: {
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
  },
  level: {
    zero: false,
    amateur: false,
    professional: false,
  }
};

export const appFilters = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    setMinPriceFilter: (state, action) => {
      state.price.minPrice = action.payload;
    },
    setMaxPriceFilter: (state, action) => {
      state.price.maxPrice = action.payload;
    },
    toggleCategoryFilter: (state, action) => {
      state.category[action.payload as 'photocamera' | 'videocamera'] = !state.category[action.payload as 'photocamera' | 'videocamera'];
    },
    toggleCameraTypeFilter: (state, action) => {
      state.type[action.payload as 'digital' | 'film' | 'snapshot' | 'collection'] = !state.type[action.payload as 'digital' | 'film' | 'snapshot' | 'collection'];
    },
    toggleLevelFilter: (state, action) => {
      state.level[action.payload as 'zero' | 'amateur' | 'professional'] = !state.level[action.payload as 'zero' | 'amateur' | 'professional'];
    },
    resetFilters: (state) => {
      state = initialState;
    },
  }
});

export const { setMinPriceFilter, setMaxPriceFilter, toggleCategoryFilter, toggleLevelFilter, toggleCameraTypeFilter, resetFilters } = appFilters.actions;

