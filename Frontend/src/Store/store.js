import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toggleReducer from "./toggleSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    toggler: toggleReducer 
  },
});
export default store;
