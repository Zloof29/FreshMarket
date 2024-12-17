import { Action, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { ProductModel } from "../Models/productModel";

export function initProducts(
  currentState: ProductModel,
  action: PayloadAction<ProductModel[]>
) {
  const newState: ProductModel[] = action.payload;
  return newState;
}

export function addProduct(
  currentState: ProductModel[],
  action: PayloadAction<ProductModel>
) {
  const newState: ProductModel[] = [...currentState];
  newState.push(action.payload);
  return newState;
}

export function initUser(
  currentState: UserModel,
  action: PayloadAction<UserModel>
) {
  const newState: UserModel = action.payload;
  return newState;
}

export function logoutUser(currentState: UserModel, action: Action) {
  const newState: UserModel = null;
  return newState;
}
