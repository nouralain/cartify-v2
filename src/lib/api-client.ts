import { authResponse } from "@/types/authResponse";
import { IBrand } from "@/interfaces/IBrand";
import { ICategory } from "@/interfaces/ICategory";
import IProductParam from "@/interfaces/IProductParams";
import { IProduct } from "@/interfaces/IProducts";
import { IResponse } from "@/interfaces/IResponse";
import { IWishListProducts } from "@/interfaces/IWishListProducts";
import { ICartResponse } from "@/interfaces/ICartResponse";
import { ICartData } from "@/interfaces/ICartData";
import { IAddress } from "@/interfaces/IAddress";
import { IOrderResponse } from "@/interfaces/orders/IOrderResponse";
import { IOrderData } from "@/interfaces/orders/IOrderData";

class ApiClient {
  #baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL!;
  #headers = {
    "Content-Type": "application/json",
  };

  async getCategories(): Promise<IResponse<ICategory[]>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/categories`);
    const data = await response.json();
    return data;
  }

  async getProducts(params?: IProductParam): Promise<IResponse<IProduct[]>> {
    const url = new URL(`${this.#baseUrl}/api/v1/products`);
    // to check first if theres a param sent
    if (params) {
      params?.category && url.searchParams.set("category[in]", params.category);
      params?.brand && url.searchParams.set("brand", params.brand);
    }
    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  }
  async getSpecificProduct(id: string): Promise<IResponse<IProduct>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/products/${id}`);
    const data = await response.json();
    return data;
  }

  async getBrands(): Promise<IResponse<IBrand[]>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/brands`);
    const data = await response.json();
    return data;
  }
  async getSpecificBrand(id: string): Promise<IResponse<IBrand>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/brands/${id}`);
    const data = await response.json();
    return data;
  }
  async getSpecificCategory(id: string): Promise<IResponse<ICategory>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/categories/${id}`);
    const data = await response.json();
    return data;
  }
  async getSubCategories(): Promise<IResponse<ICategory[]>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/subcategories`);
    const data = await response.json();
    return data;
  }

  async signIn(email: string, password: string): Promise<authResponse> {
    const response = await fetch(`${this.#baseUrl}/api/v1/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: this.#headers,
    });
    const data = await response.json();
    return data;
  }

  async signup(
    name: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string,
  ): Promise<authResponse> {
    const response = await fetch(`${this.#baseUrl}/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        rePassword,
        phone,
      }),
      headers: this.#headers,
    });
    const data = await response.json();
    return data;
  }

  async addProdToWishList(productId: string, token: string) {
    const response = await fetch(`${this.#baseUrl}/api/v1/wishlist`, {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        ...this.#headers,
        token,
      },
    });
    const data = await response.json();
    return data;
  }

  async getUserWishlist(token: string):Promise<IResponse<IWishListProducts[]>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/wishlist`, {
      headers: {
        token,
      },
    });
    const data = await response.json();
    return data;
  }

  async removeProdFromWishlist(id:string,token: string):Promise<IResponse<string[]>> {
    const resp = await fetch(`${this.#baseUrl}/api/v1/wishlist/${id}`,{
      method:"DELETE",
       headers: {
        token,
      },
    })
     const data = await resp.json();
    return data;
  }



  async addProdToCart(productId: string, token: string):Promise<ICartResponse<ICartData>> {
    const response = await fetch(`${this.#baseUrl}/api/v2/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        ...this.#headers,
        token,
      },
    });
    const data = await response.json();
    return data;
  }

   async getCartProd(token: string):Promise<ICartResponse<ICartData>> {
    const response = await fetch(`${this.#baseUrl}/api/v2/cart`, {
      headers: {
        token,
      },
    });
    const data = await response.json();
    return data;
  }

  async removeProdFromCart(id:string,token: string):Promise<ICartResponse<ICartData>> {
    const resp = await fetch(`${this.#baseUrl}/api/v2/cart/${id}`,{
      method:"DELETE",
       headers: {
        token,
      },
    })
     const data = await resp.json();
    return data;
  }

  async updateProdCount(id:string,token: string,count:number):Promise<ICartResponse<ICartData>>{
    const response = await fetch(`${this.#baseUrl}/api/v2/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({
       count,
      }),
      headers: {
        ...this.#headers,
        token,
      },
    });
    const data = await response.json();
    return data;
  }

  async deleteAllProdFromCart(token: string):Promise<ICartResponse<ICartData>> {
    const resp = await fetch(`${this.#baseUrl}/api/v2/cart`,{
      method:"DELETE",
       headers: {
        token,
      },
    })
     const data = await resp.json();
    return data;
  }

   async sendUserAddress(
     name: string,
    details: string,
    phone: string,
    city: string,
    token: string):Promise<IResponse<IAddress[]>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/addresses`, {
      method: "POST",
      body: JSON.stringify({
        name,
        details,
        phone,
        city
      }),
      headers: {
        ...this.#headers,
        token,
      },
    });
    const data = await response.json();
    return data;
  }

  async getUserAddress(token: string):Promise<IResponse<IAddress[]>> {
    const response = await fetch(`${this.#baseUrl}/api/v1/addresses`, {
      headers: {
        token,
      },
    });
    const data = await response.json();
    return data;
  }

   async placeOrder(
    postalCode:string,
    details: string,
    phone: string,
    city: string,
    token: string,
    cartId:string):Promise<IOrderResponse> {
    const response = await fetch(`${this.#baseUrl}/api/v2/orders/${cartId}`, {
      method: "POST",
      body: JSON.stringify({
       "shippingAddress": {
        details,
        phone,
        city,
        postalCode,
       }
      }),
      headers: {
        ...this.#headers,
        token,
      },
    });
    const data = await response.json();
    return data;
  }

  async getUserOrders(userId: string , token:string): Promise<IOrderData[]> {
    const response = await fetch(`${this.#baseUrl}/api/v1/orders/user/${userId}`, {
      headers: {
        token,
      },
    });
    const data = await response.json();
    return data;
  }

}

export const apiClient = new ApiClient();
