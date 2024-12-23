import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";
import { TotalProducts } from "../../ProductArea/TotalProducts/TotalProducts";

export function Menu(): JSX.Element {
  return (
    <div className={css.Menu}>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/new-product">Add Product</NavLink>
      <NavLink to="/about">About</NavLink>

      <TotalProducts />
    </div>
  );
}
