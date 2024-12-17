import express, { Request, Response, NextFunction } from "express";
import { productService } from "../4-services/product-service";
import { ProductModel } from "../3-models/productModel";
import { StatusCode } from "../3-models/enums";

// Product controller - listening to product requests:
class ProductController {
  // Creating a router object:
  public readonly router = express.Router();

  // Register routes:
  public constructor() {
    this.router.get("/products/:userId([0-9]+)", this.getAllProducts);
    this.router.post("/products/", this.addProduct);
  }

  // Get all products:
  private async getAllProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = +request.params.userId;
      const products = await productService.getAllProducts(userId);
      response.json(products);
    } catch (error: any) {
      next(error);
    }
  }

  private async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      request.body.imageName = request.files?.imageName;
      const product = new ProductModel(request.body);
      const addedProduct = await productService.addProduct(product);
      response.status(StatusCode.Created).json(addedProduct);
    } catch (error: any) {
      next(error);
    }
  }
}

export const productController = new ProductController();
