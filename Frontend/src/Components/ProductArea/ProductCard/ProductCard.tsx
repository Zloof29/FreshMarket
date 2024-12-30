import css from "./ProductCard.module.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { ProductModel } from "../../../Models/ProductModel";
import { useEffect } from "react";
import { productService } from "../../../Services/ProductService";
import { useForm } from "react-hook-form";

type ProductProps = {
  product: ProductModel;
};

export function ProductCard(props: ProductProps): JSX.Element {
  const { register, handleSubmit } = useForm<ProductModel>();

  const userId = useSelector<AppState, number>((state) => state.user.id);

  useEffect(() => {
    productService.getAllProducts(userId);
  }, [userId]);

  return (
    <tr>
      <td>{props.product.productCode}</td>
      <td>{props.product.quantityPerBox}</td>
      <td>{props.product.name}</td>
      <td>
        <img
          src={props.product.imageUrl}
          alt={props.product.name}
          className={css.productImage}
        />
      </td>
      <td>{props.product.price}</td>
      <td>
        <input
          type="number"
          {...register("orderByBox")}
          value={props.product.orderByBox}
        />
      </td>
      <td>
        <input
          type="number"
          {...register("orderByWeight")}
          value={props.product.orderByWeight}
        />
      </td>
    </tr>
  );
}
