import { ICartProductItem } from "./ICartProductItem";

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProductItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}