import css from "./ProductCard.module.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { ProductModel } from "../../../Models/ProductModel";
import { ChangeEvent, useEffect, useState } from "react";
import { productService } from "../../../Services/ProductService";
import { notify } from "../../../Utils/notify";

type ProductProps = {
  product: ProductModel;
};

export function ProductCard(props: ProductProps): JSX.Element {
  const [orderByBox, setOrderByBox] = useState<number>(
    props.product.orderByBox
  );
  const [orderByWeight, setOrderByWeight] = useState<number>(
    props.product.orderByWeight
  );

  const handleOrderByBox = (event: ChangeEvent<HTMLInputElement>) => {
    setOrderByBox(+event.target.value);
  };

  const handleOrderByWeight = (event: ChangeEvent<HTMLInputElement>) => {
    setOrderByWeight(+event.target.value);
  };

  async function handleEdit() {
    const updatedProduct = {
      ...props.product,
      orderByBox,
      orderByWeight,
    };

    await productService.editProduct(updatedProduct, props.product.id);

    notify.success("product has been updated.");
  }

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
        <input type="number" value={orderByBox} onChange={handleOrderByBox} />
      </td>
      <td>
        <input
          type="number"
          value={orderByWeight}
          onChange={handleOrderByWeight}
        />
      </td>
      <td>
        <button onClick={handleEdit}>Edit</button>
      </td>
    </tr>
  );
}
