import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/app-data';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction } from '../api-actions';

const initialState: AppData = {
  cameras: [],
  promo: null,
  isDataLoaded: false,
  isLoadingFailed: false,
  currentProduct: null,
  currentReviews: [],
  currentSimilarProducts: [],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoaded = false;
        state.isLoadingFailed = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
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
