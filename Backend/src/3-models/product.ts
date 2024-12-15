import Joi from "joi";

export class Product {
  public id: number;
  public productCode: number;
  public imageUrl: string;
  public quantityPerBox: number;
  public orderByBox: number;
  public orderByWeight: number;
  public price: number;

  constructor(product: Product) {
    this.id = product.id;
    this.productCode = product.productCode;
    this.imageUrl = product.imageUrl;
    this.quantityPerBox = product.quantityPerBox;
    this.orderByBox = product.orderByBox;
    this.orderByWeight = product.orderByWeight;
    this.price = product.price;
  }

  public static validateProduct(product: Product) {
    const schema = Joi.object({
      id: Joi.number().required(),
      productCode: Joi.number().required(),
      imageUrl: Joi.string().uri().required(),
      quantityPerBox: Joi.number().required(),
      orderByBox: Joi.number().required(),
      orderByWeight: Joi.number().required(),
      price: Joi.number().required(),
    });

    return schema.validate(product);
  }
}
