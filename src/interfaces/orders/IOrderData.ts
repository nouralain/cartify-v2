import { ICartItem, IOrderUser, IShippingAddress } from "./subInterface";

export interface IOrderData {
  shippingAddress: IShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: IOrderUser;
  cartItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}