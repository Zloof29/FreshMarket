import { UploadedFile } from "express-fileupload";
import Joi from "joi";

export class ProductModel {
  public id: number;
  public productCode: number;
  public name: string;
  public imageName: UploadedFile;
  public quantityPerBox: number;
  public orderByBox: number;
  public orderByWeight: number;
  public price: number;
  public userId: number;

  constructor(product: ProductModel) {
    this.id = product.id;
    this.productCode = product.productCode;
    this.name = product.name;
    this.imageName = product.imageName;
    this.quantityPerBox = product.quantityPerBox;
    this.orderByBox = product.orderByBox;
    this.orderByWeight = product.orderByWeight;
    this.price = product.price;
    this.userId = product.userId;
  }

  public static validateProduct(product: ProductModel) {
    const schema = Joi.object({
      id: Joi.number().optional(),
      productCode: Joi.number().required(),
      name: Joi.string().required,
      imageName: Joi.string().uri().required(),
      quantityPerBox: Joi.number().required(),
      orderByBox: Joi.number().required(),
      orderByWeight: Joi.number().required(),
      price: Joi.number().required(),
      userId: Joi.number().required(),
    });

    return schema.validate(product);
  }
}
