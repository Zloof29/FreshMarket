import { configureStore, createSlice } from "@reduxjs/toolkit";
import { addProduct, initProducts, initUser, logoutUser } from "./reducers";
import { UserModel } from "../Models/UserModel";
import { ProductModel } from "../Models/ProductModel";

// Application state:
export type AppState = {
  products: ProductModel[];
  user: UserModel;
};

// Creating products slice:
const productSlice = createSlice({
  name: "products", // Internal use
  initialState: null,
  reducers: { initProducts, addProduct },
});

// Create user slice:
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: { initUser, logoutUser },
});

// Creating action creators:
export const productActions = productSlice.actions;
export const userActions = userSlice.actions;

// Main redux object:
export const store = configureStore<AppState>({
  reducer: {
    products: productSlice.reducer, // Product state.
    user: userSlice.reducer, // User state
  },
});
