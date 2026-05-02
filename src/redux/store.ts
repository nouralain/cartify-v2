import {configureStore} from "@reduxjs/toolkit"
import { wishListReducer } from "./slices/wishlistProductsSlice"
import { cartDataReducer } from "./slices/cartData";
import { addressReducer } from "./slices/userAddress";
export const store = configureStore({
    reducer:{
        wishListRed : wishListReducer,
        cartDataRed:cartDataReducer,
        addressRed:addressReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;