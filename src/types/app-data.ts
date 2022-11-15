import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type AppData = {
  cameras: Camera[],
  minPrice: string,
  maxPrice: string,
  prices: string[],
  totalCount: string,
  promo: Promo | null,
  isDataLoaded: boolean,
  isLoadingFailed: boolean,
  currentProduct: Camera | null,
  currentReviews: Review[],
  currentSimilarProducts: Camera[],
  searchedCameras: Camera[],
};
