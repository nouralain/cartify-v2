import { ICartData } from "./ICartData";

export interface ICartResponse <T>{
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: T;
}