import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toggleReducer from "./toggleSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    toggler: toggleReducer,
    products: productReducer,
  },
});
export default store;
  