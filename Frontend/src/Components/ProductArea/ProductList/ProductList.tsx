import { useSelector } from "react-redux";
import { ProductCard } from "../ProductCard/ProductCard";
import { AppState } from "../../../Redux/store";
import { ProductModel } from "../../../Models/ProductModel";
import { useEffect } from "react";
import { productService } from "../../../Services/ProductService";
import { useNavigate } from "react-router-dom";
import css from "./ProductList.module.css";

export function ProductList(): JSX.Element {
  const products =
    useSelector<AppState, ProductModel[]>((state) => state.products) || [];

  const navigate = useNavigate();

  const userId = useSelector<AppState, number>((state) => state.user.id);

  useEffect(() => {
    if (userId === null) {
      navigate("/logIn");
    } else {
      productService.getAllProducts(userId);
    }
  }, [userId, navigate]);

  return (
    <div className={css.ProductList}>
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Quantity Per Box</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Order By Box</th>
              <th>Order By Weight</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      ) : (
        <div>There is nothing to display</div>
      )}
    </div>
  );
}
