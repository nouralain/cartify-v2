import { IProduct } from "./IProducts";

export interface ICartProductItem {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}