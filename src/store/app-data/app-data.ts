import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/app-data';
import { fetchCameraAction, fetchCamerasAction, fetchCamerasByName, fetchInitialData, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction } from '../api-actions';

const initialState: AppData = {
  cameras: [],
  minPrice: '0',
  maxPrice: '0',
  prices: [],
  totalCount: '1',
  promo: null,
  isDataLoaded: false,
  isLoadingFailed: false,
  currentProduct: null,
  currentReviews: [],
  currentSimilarProducts: [],
  searchedCameras: [],
  searchLoaded: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasByName.pending, (state) => {
        state.searchLoaded = true;
      })
      .addCase(fetchCamerasByName.fulfilled, (state, action) => {
        state.searchLoaded = false;
        state.searchedCameras = action.payload;
      })
      .addCase(fetchInitialData.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchInitialData.rejected, (state) => {
        state.isDataLoaded = false;
        state.isLoadingFailed = true;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        const { minPrice, maxPrice, totalCount, cameras } = action.payload;
        state.minPrice = minPrice;
        state.maxPrice = maxPrice;
        state.totalCount = totalCount;
        state.prices = cameras.map((el) => String(el.price));
        state.cameras = cameras;
        state.isDataLoaded = false;
        state.isLoadingFailed = false;
      })
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoaded = false;
        state.isLoadingFailed = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        const { data, totalCount, minPrice, maxPrice } = action.payload;
        state.cameras = data;
        state.totalCount = totalCount;
        state.minPrice = minPrice;
        state.maxPrice = maxPrice;
        state.isDataLoaded = false;
        state.isLoadingFailed = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchCameraAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.isDataLoaded = false;
        state.isLoadingFailed = true;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isDataLoaded = false;
        state.isLoadingFailed = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.currentReviews = action.payload;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.currentSimilarProducts = action.payload;
      });
  }
});
