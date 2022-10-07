import { makeFakeCamera, makeFakePromo } from '../../mocks/mocks';
import { AppData } from '../../types/app-data';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';
import { appData } from './app-data';


const initialState: AppData = {
  cameras: [],
  promo: null,
  isDataLoaded: false,
  currentProduct: null,
  currentReviews: null,
  currentSimilarProducts: null,
};

describe('Testing appData', () => {
  let state: AppData;

  beforeEach(() => {
    state = initialState;
  });

  describe('fetchCamerasAction test', () => {
    it('should keep isDataLoaded = true on "pending"', () => {
      expect(appData.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({ cameras: [], promo: null, isDataLoaded: true });
    });

    it('should make isDataLoaded = false on "rejected"', () => {
      state = { ...state, isDataLoaded: true };

      expect(appData.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({ cameras: [], promo: null, isDataLoaded: false });
    });

    it('should pass received data to state and change isDataLoaded to false on "fulfilled"', () => {
      state = { ...state, isDataLoaded: true };
      const cameras = Array.from({ length: 10 }, () => makeFakeCamera());

      expect(appData.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: cameras }))
        .toEqual({ cameras: cameras, promo: null, isDataLoaded: false });
    });
  });

  describe('fetchPromoAction test', () => {
    it('should pass received data to state on "fulfilled"', () => {
      const promo = makeFakePromo();

      expect(appData.reducer(state, { type: fetchPromoAction.fulfilled, payload: promo }))
        .toEqual({ cameras: [], isDataLoaded: false, promo: promo });
    });
  });

});
