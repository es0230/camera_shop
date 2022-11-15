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
  searchedCameras: [],
  searchLoaded: false,
};

describe('Testing appData', () => {
  let state: AppData;

  beforeEach(() => {
    state = initialState;
  });

  describe('fetchCamerasByName test', () => {
    it('should keep searchLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchCamerasByName.pending.type }))
        .toEqual({ ...initialState, searchLoaded: true });
    });

    it('should make searchLoaded = false and pass data to searchedCameras on fulfilled', () => {
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchCamerasByName.fulfilled.type, payload: cameras }))
        .toEqual({ ...initialState, searchedCameras: cameras, searchLoaded: false });
    });
  });

  describe('fetchInitialData test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchInitialData.pending.type }))
        .toEqual({ ...initialState, isDataLoaded: true });
    });

    it('should make isDataLoaded = false and isLoadingFailed = true on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchInitialData.rejected.type }))
        .toEqual({ ...initialState, isDataLoaded: false, isLoadingFailed: true });
    });

    it('should pass received data to state and change isDataLoaded and isLoadingFailed to false on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true, isLoadingFailed: true };
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());
      const cameraPrices = cameras.map((el) => String(el.price));

      expect(appData.reducer(state, { type: fetchInitialData.fulfilled.type, payload: { cameras: cameras, minPrice: '100', maxPrice: '1000', totalCount: '10' } }))
        .toEqual({ ...initialState, minPrice: '100', maxPrice: '1000', prices: cameraPrices, totalCount: '10', isDataLoaded: false, isLoadingFailed: false });
    });
  });

  describe('fetchCamerasAction test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({ ...initialState, isDataLoaded: true });
    });

    it('should make isDataLoaded = false and isLoadingFailed = true on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({ ...initialState, isDataLoaded: false, isLoadingFailed: true });
    });

    it('should pass received data to state and change isDataLoaded and isLoadingFailed to false on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true, isLoadingFailed: true };
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: { data: cameras, totalCount: '10' } }))
        .toEqual({ ...initialState, cameras: cameras, totalCount: '10', isDataLoaded: false, isLoadingFailed: false });
    });
  });

  describe('fetchPromoAction test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const promo = makeFakePromo();

      expect(appData.reducer(state, { type: fetchPromoAction.fulfilled, payload: promo }))
        .toEqual({ ...initialState, promo: promo });
    });
  });

  describe('fetchCameraAction test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchCameraAction.pending }))
        .toEqual({ ...initialState, isDataLoaded: true });
    });
    it('should make isDataLoaded = false and isLoadingFailed = true on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchCameraAction.rejected }))
        .toEqual({ ...initialState, isDataLoaded: false, isLoadingFailed: true });
    });
    it('should make isDataLoaded = false and pass received data to state on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true, isLoadingFailed: true };
      const camera = makeFakeCamera();

      expect(appData.reducer(state, { type: fetchCameraAction.fulfilled, payload: camera }))
        .toEqual({ ...initialState, isDataLoaded: false, isLoadingFailed: false, currentProduct: camera });
    });
  });

  describe('fetchReviewsAction test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const reviews = Array.from({ length: Math.ceil(Math.random() * 5) }, () => makeFakeReview());

      expect(appData.reducer(state, { type: fetchReviewsAction.fulfilled, payload: reviews }))
        .toEqual({ ...initialState, currentReviews: reviews });
    });
  });

  describe('fetchSimilarProducts test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const similarProducts = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchSimilarProductsAction.fulfilled, payload: similarProducts }))
        .toEqual({ ...initialState, currentSimilarProducts: similarProducts });
    });
  });
});
