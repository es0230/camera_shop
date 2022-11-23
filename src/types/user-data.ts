import { Camera } from './camera';

export type UserData = {
  productList: Camera[],
  basket: { [id: number]: number },
}
