export interface IOrderUser {
  _id?: string; // السيرفر بيبعت id في مكان و _id في مكان تاني
  id?: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IPricing {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
}

export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export interface IOrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface ICartItem {
  count: number;
  _id: string;
  product: IOrderProduct;
  price: number;
}