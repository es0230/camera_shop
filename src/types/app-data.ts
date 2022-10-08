import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type AppData = {
  cameras: Camera[],
  promo: Promo | null,
  isDataLoaded: boolean,
  currentProduct: Camera | null,
  currentReviews: Review[],
  currentSimilarProducts: Camera[],
};
