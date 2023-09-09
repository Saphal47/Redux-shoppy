import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";


//all the fxnalities of <Auth/> component of the auth state
const store= configureStore({
    reducer:{
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer
    },
});

export default store;