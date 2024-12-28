import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";
import { TotalProducts } from "../../ProductArea/TotalProducts/TotalProducts";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { useEffect, useState } from "react";

export function Menu(): JSX.Element {
  const [token, setToken] = useState<string | null>(null);

  const user = useSelector<AppState, UserModel>((state) => state.user);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [token, user]);

  return (
    <div className={css.Menu}>
      {user && user.roleId === 1 ? (
        <>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/new-product">Add Product</NavLink>
          <TotalProducts />
        </>
      ) : (
        <></>
      )}

      {user && user.roleId === 2 ? (
        <>
          <NavLink to="/products">Products</NavLink>
          <TotalProducts />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
