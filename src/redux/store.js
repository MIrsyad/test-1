// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});

export default store;
