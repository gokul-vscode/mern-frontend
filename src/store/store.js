import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "../../src/CartSlice/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartreducer, 
  },
});

export default store;
