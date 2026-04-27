import { IBrand } from "./IBrand";
import { ISubcategory } from "./ISubcategory";
import { ICategory } from "./ICategory";

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: ICategory;
  brand: IBrand;
  subcategory: ISubcategory[];
}