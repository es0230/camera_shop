import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const selectCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;

export const selectPromo = (state: State): Promo | null => state[NameSpace.Data].promo;

export const selectCurrentProduct = (state: State): Camera | null => state[NameSpace.Data].currentProduct;

export const selectCurrentReviews = (state: State): Review[] | null => state[NameSpace.Data].currentReviews;

export const selectCurrentSimilarProducts = (state: State): Camera[] | null => state[NameSpace.Data].currentSimilarProducts;
