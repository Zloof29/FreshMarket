import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { ProductModel } from "../3-models/productModel";
import { OkPacketParams } from "mysql2";
import { ResourceNotFoundError } from "../3-models/client-error";

// Product service - any logic regarding products:
class ProductService {
  // Get all products:
  public async getAllProducts(userId: number): Promise<ProductModel[]> {
    const sql = `
      SELECT 
        p.*, 
        CONCAT('http://localhost:4000/api/products/images/', p.imageName) AS imageUrl 
      FROM 
        products p
      WHERE 
        p.userId = ?
    `;

    const products: ProductModel[] = await dal.execute(sql, [userId]);

    return products;
  }

  public async addProduct(product: ProductModel): Promise<ProductModel> {
    // validation needed!

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

  public async editProduct(product: ProductModel): Promise<ProductModel> {
    // validation needed!

    const sql =
      "UPDATE products SET orderByBox = ?, orderByWeight = ? WHERE id = ?";

    const values = [product.orderByBox, product.orderByWeight, product.id];

    const info: OkPacketParams = await dal.execute(sql, values);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(product.id);

    return product;
  }
}

export const productService = new ProductService();
