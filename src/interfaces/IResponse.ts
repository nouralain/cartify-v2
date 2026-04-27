import { IMetaData } from "./IMetaData";

export type IResponse<T>= {
  results:number;
  data: T;
  metadata?: IMetaData;
  status?: string;
  count?: number;
  message?:string
}