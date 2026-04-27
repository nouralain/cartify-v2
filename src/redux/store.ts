import {configureStore} from "@reduxjs/toolkit"
import { wishListReducer } from "./slices/wishlistProductsSlice"
export const store = configureStore({
    reducer:{
        wishListRed : wishListReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;