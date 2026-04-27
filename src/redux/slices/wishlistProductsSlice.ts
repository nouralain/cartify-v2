import { IWishListProducts } from "@/interfaces/IWishListProducts";
import { apiClient } from "@/lib/api-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface WishlistState {
  wishListProd: IWishListProducts[];
  isLoading: boolean;
}

const initialState: WishlistState = {
  wishListProd: [],
  isLoading:false
};


export const getWishListProd = createAsyncThunk <IWishListProducts[], string>("wishListProd/getWishListProd",(async(token)=>{
    const products = await apiClient.getUserWishlist(token)
    return products.data
}))
const wishlistSlice = createSlice({
    name:"wishListProd",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getWishListProd.pending,(state)=>{
          state.isLoading= true
        }
        )
        builder.addCase(getWishListProd.fulfilled,(state,action)=>{
          state.wishListProd=action.payload
          state.isLoading=false
        })
         builder.addCase(getWishListProd.rejected, (state, action) => {
    state.isLoading = false
    console.log("error", action.error) 
  })
    },
})

export const wishListReducer = wishlistSlice.reducer