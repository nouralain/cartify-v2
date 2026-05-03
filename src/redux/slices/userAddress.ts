import { IAddress } from "@/interfaces/IAddress";
import { apiClient } from "@/lib/api-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Address{
    userAddress:string,
    allAdressDetails:IAddress |null
}
const initialState:Address={
    userAddress:"Your Address",
    allAdressDetails:null
}
export const getUserAddress = createAsyncThunk<IAddress[], string>("address/getUserAddress",(async(token)=>{
    const userAddress = await apiClient.getUserAddress(token)
    return userAddress.data
}))
const userAddressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{},
    extraReducers(builder ){
builder.addCase(getUserAddress.pending,(state)=>{
    
})
builder.addCase(getUserAddress.fulfilled,(state,action)=>{
state.userAddress= action.payload[action.payload.length-1].city
state.allAdressDetails=action.payload[action.payload.length-1]
})
    }
})
 export const addressReducer = userAddressSlice.reducer