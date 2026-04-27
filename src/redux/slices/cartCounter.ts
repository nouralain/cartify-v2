import { apiClient } from "@/lib/api-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartCounterState {
  cartCounter: number | null; 
  loading: boolean;
//   cartTotalPrice:number | null;
}
const initialState:CartCounterState={
    cartCounter:null,
    loading:false,
    // cartTotalPrice:,
}

export const getCartCounter = createAsyncThunk<number, string>("cartCounter/getCartCounter",(async(token)=>{
    const resp = await apiClient.getCartProd(token)
    return resp.numOfCartItems
}))
const counterSlice = createSlice({
name:"cartCounter",
initialState,
reducers:{},
extraReducers(builder) {
    builder.addCase(getCartCounter.pending,(state)=>{
state.loading=true

    })
    builder.addCase(getCartCounter.fulfilled,(state,action)=>{
state.cartCounter=action.payload
state.loading=false

    })
    

},
})

export const cartCounterReducer = counterSlice.reducer