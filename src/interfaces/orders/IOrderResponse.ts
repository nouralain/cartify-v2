import { IOrderData } from "./IOrderData";
import { IOrderUser, IPricing } from "./subInterface";

export interface IOrderResponse {
  status: string;
  message: string;
  user: IOrderUser;
  pricing: IPricing;
  data: IOrderData;
}