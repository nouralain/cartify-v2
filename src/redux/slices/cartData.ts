import { ICartData } from "@/interfaces/ICartData";
import { ICartResponse } from "@/interfaces/ICartResponse";
import { apiClient } from "@/lib/api-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartCounterState {
  cartData: ICartResponse<ICartData> |null; 
  loading: boolean;
}
const initialState:CartCounterState={
    cartData:null,
    loading:false,
}

export const getCartData = createAsyncThunk<ICartResponse<ICartData>,string>("cartCounter/getCartData",(async(token)=>{
    const resp = await apiClient.getCartProd(token!)
    return resp
}))
const cartDataSlice = createSlice({
name:"cartData",
initialState,
reducers:{},
extraReducers(builder) {
    builder.addCase(getCartData.pending,(state)=>{
if (!state.cartData) {
        state.loading = true;
      }
    })
    builder.addCase(getCartData.fulfilled,(state,action)=>{
state.cartData=action.payload
state.loading=false

    })
    

},
})

export const cartDataReducer = cartDataSlice.reducer