import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks/mocks';
import { AppData } from '../../types/app-data';
import { fetchCameraAction, fetchCamerasAction, fetchCamerasByName, fetchInitialData, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction } from '../api-actions';
import { appData } from './app-data';


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
  searchedCameras: []
};

describe('Testing appData', () => {
  let state: AppData;

  beforeEach(() => {
    state = initialState;
  });

  describe('fetchCamerasByName test', () => {
    it('should pass data to searchedCameras on fulfilled', () => {
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchCamerasByName.fulfilled.type, payload: cameras }))
        .toEqual({
          searchedCameras: cameras, cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', promo: null, isDataLoaded: false, isLoadingFailed: false, currentProduct: null, currentReviews: [], currentSimilarProducts: []
        });
    });
  });

  describe('fetchInitialData test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchInitialData.pending.type }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', promo: null, isDataLoaded: true, isLoadingFailed: false, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });

    it('should make isDataLoaded = false and isLoadingFailed = true on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchInitialData.rejected.type }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', promo: null, isDataLoaded: false, isLoadingFailed: true, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });

    it('should pass received data to state and change isDataLoaded and isLoadingFailed to false on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true, isLoadingFailed: true };
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());
      const cameraPrices = cameras.map((el) => String(el.price));

      expect(appData.reducer(state, { type: fetchInitialData.fulfilled.type, payload: { cameras: cameras, minPrice: '100', maxPrice: '1000', totalCount: '10' } }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '100', maxPrice: '1000', prices: cameraPrices, totalCount: '10', promo: null, isDataLoaded: false, isLoadingFailed: false, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });
  });

  describe('fetchCamerasAction test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', promo: null, isDataLoaded: true, isLoadingFailed: false, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });

    it('should make isDataLoaded = false and isLoadingFailed = true on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', promo: null, isDataLoaded: false, isLoadingFailed: true, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });

    it('should pass received data to state and change isDataLoaded and isLoadingFailed to false on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true, isLoadingFailed: true };
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: { data: cameras, totalCount: '10' } }))
        .toEqual({ searchedCameras: [], cameras: cameras, minPrice: '0', maxPrice: '0', prices: [], totalCount: '10', promo: null, isDataLoaded: false, isLoadingFailed: false, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });
  });

  describe('fetchPromoAction test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const promo = makeFakePromo();

      expect(appData.reducer(state, { type: fetchPromoAction.fulfilled, payload: promo }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', isDataLoaded: false, isLoadingFailed: false, promo: promo, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });
  });

  describe('fetchCameraAction test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchCameraAction.pending }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', isDataLoaded: true, isLoadingFailed: false, promo: null, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });
    it('should make isDataLoaded = false and isLoadingFailed = true on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchCameraAction.rejected }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', isDataLoaded: false, isLoadingFailed: true, promo: null, currentProduct: null, currentReviews: [], currentSimilarProducts: [] });
    });
    it('should pass received data to state on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true, isLoadingFailed: true };
      const camera = makeFakeCamera();

      expect(appData.reducer(state, { type: fetchCameraAction.fulfilled, payload: camera }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', isDataLoaded: false, isLoadingFailed: false, promo: null, currentProduct: camera, currentReviews: [], currentSimilarProducts: [] });
    });
  });

  describe('fetchReviewsAction test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const reviews = Array.from({ length: Math.ceil(Math.random() * 5) }, () => makeFakeReview());

      expect(appData.reducer(state, { type: fetchReviewsAction.fulfilled, payload: reviews }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', isDataLoaded: false, isLoadingFailed: false, promo: null, currentProduct: null, currentReviews: reviews, currentSimilarProducts: [] });
    });
  });

  describe('fetchSimilarProducts test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const similarProducts = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchSimilarProductsAction.fulfilled, payload: similarProducts }))
        .toEqual({ searchedCameras: [], cameras: [], minPrice: '0', maxPrice: '0', prices: [], totalCount: '1', isDataLoaded: false, isLoadingFailed: false, promo: null, currentProduct: null, currentReviews: [], currentSimilarProducts: similarProducts });
    });
  });
});
