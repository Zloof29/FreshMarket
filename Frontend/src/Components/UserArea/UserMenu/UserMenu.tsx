import { useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/notify";

export function UserMenu(): JSX.Element {
  const user = useSelector<AppState, UserModel>((store) => store.user);

  const navigate = useNavigate();

  function logout() {
    userService.logout();
    notify.success("Bye bye");
    navigate("/logIn");
  }

  return (
    <div className="UserMenu">
      {!user && (
        <>
          <span>Hello Guest | </span>
          <NavLink to="/register">Register</NavLink>
          <span> | </span>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName} |{" "}
          </span>
          <NavLink to="/logIn" onClick={logout}>
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}
