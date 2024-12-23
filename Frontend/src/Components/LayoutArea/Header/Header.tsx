import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import css from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <div className={css.Header}>
      <UserMenu />
      <h1>Northwind Traders</h1>
    </div>
  );
}
