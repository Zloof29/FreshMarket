import axios, { AxiosRequestConfig } from "axios";
import { ProductModel } from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";
import { productActions, store } from "../Redux/store";

class ProductService {
  public async getAllProducts(userId: number): Promise<ProductModel[]> {
    const response = await axios.get<ProductModel[]>(
      appConfig.productsUrl + userId
    );

    const products: ProductModel[] = response.data;

    const action = productActions.initProducts(products);
    store.dispatch(action);

    return products;
  }

  public async addProduct(
    product: ProductModel,
    userId: number
  ): Promise<ProductModel> {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const response = await axios.post<ProductModel>(
      appConfig.productsUrl + userId,
      product,
      options
    );

    const addedProduct = response.data;

    if (!store.getState().products) return;

    const action = productActions.addProduct(addedProduct);
    store.dispatch(action);

    return addedProduct;
  }

  public async editProduct(product: ProductModel, id: number): Promise<ProductModel> {
    const response = await axios.put<ProductModel>(
      appConfig.productsUrl + id,
      product
    );

    const editedProduct = response.data;

    return editedProduct;
  }
}

export const productService = new ProductService();
