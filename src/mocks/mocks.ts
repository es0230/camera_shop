import { Camera } from '../types/camera';
import { name, random } from 'faker';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { MAX_RATING } from '../const';

const BIG_ENOUGH_NUMBER = 1000;

export const makeFakeCamera = (): Camera => ({
  id: Math.floor(Math.random() * BIG_ENOUGH_NUMBER),
  name: name.firstName(),
  vendorCode: random.word(),
  type: random.word(),
  category: random.word(),
  description: random.word(),
  level: random.word(),
  rating: Math.floor(Math.random() * BIG_ENOUGH_NUMBER),
  price: Math.floor(Math.random() * BIG_ENOUGH_NUMBER),
  previewImg: random.word(),
  previewImg2x: random.word(),
  previewImgWebp: random.word(),
  previewImgWebp2x: random.word(),
  reviewCount: Math.floor(Math.random() * BIG_ENOUGH_NUMBER),
});

export const makeFakePromo = (): Promo => ({
  id: Math.floor(Math.random() * BIG_ENOUGH_NUMBER),
  name: random.word(),
  previewImg: random.word(),
  previewImg2x: random.word(),
  previewImgWebp: random.word(),
  previewImgWebp2x: random.word(),
});

export const makeFakeReview = (): Review => ({
  id: String(Math.floor(Math.random() * BIG_ENOUGH_NUMBER)),
  userName: random.word(),
  advantage: random.word(),
  disadvantage: random.word(),
  review: random.word(),
  rating: Math.floor(Math.random() * MAX_RATING),
  createAt: random.word(),
  cameraId: Math.floor(Math.random() * BIG_ENOUGH_NUMBER),
});

