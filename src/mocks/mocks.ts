import { Camera } from '../types/camera';
import { name, random } from 'faker';
import { Promo } from '../types/promo';

export const makeFakeCamera = (): Camera => ({
  id: Math.floor(Math.random() * 1000),
  name: name.firstName(),
  vendorCode: random.word(),
  type: random.word(),
  category: random.word(),
  description: random.word(),
  level: random.word(),
  rating: Math.floor(Math.random() * 1000),
  price: Math.floor(Math.random() * 1000),
  previewImg: random.word(),
  previewImg2x: random.word(),
  previewImgWebp: random.word(),
  previewImgWebp2x: random.word(),
  reviewCount: Math.floor(Math.random() * 1000),
});

export const makeFakePromo = (): Promo => ({
  id: Math.floor(Math.random() * 1000),
  name: random.word(),
  previewImg: random.word(),
  previewImg2x: random.word(),
  previewImgWebp: random.word(),
  previewImgWebp2x: random.word(),
});

