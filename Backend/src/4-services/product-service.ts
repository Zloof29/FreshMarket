import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { ProductModel } from "../3-models/productModel";
import { OkPacketParams } from "mysql2";

// Product service - any logic regarding products:
class ProductService {
  // Get all products:
  public async getAllProducts(userId: number): Promise<ProductModel[]> {
    const sql =
      'SELECT *, CONCAT("http://localhost:400/api/products/images/", imageName) as imageUrl FROM products WHERE userId = ?';

    const products: ProductModel[] = await dal.execute(sql, [userId]);

    return products;
  }

  public async addProduct(product: ProductModel): Promise<ProductModel> {
    const imageName = product.imageName
      ? await fileSaver.add(product.imageName)
      : null;

    const sql =
      "INSERT INTO products (id, productCode, name, imageName, quantityPerBox, orderByBox, orderByWeight, price, userId) VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      product.productCode,
      product.name,
      imageName,
      product.quantityPerBox,
      product.orderByBox,
      product.orderByWeight,
      product.price,
      product.userId,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);

    product.id - info.insertId;

    return product;
  }
}

export const productService = new ProductService();
