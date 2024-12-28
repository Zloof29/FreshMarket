import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import css from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <div>
      <div className={css.header}>
        <div className={css.user}>
          <UserMenu />
        </div>
        <h1>Fresh Market</h1>
      </div>
    </div>
  );
}
