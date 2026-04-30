import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";
import { useLogoutMutation } from "@/features/auth/api/authApi";
import { clearUser } from "@/features/auth/api/authSlice";
import style from "@/widgets/header/styles/userInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
function UserInfo() {
  const user = useSelector((state) => state.authSlice.user);
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogOut() {
    logout();
    dispatch(clearUser());
    navigate(frontRoutes.loginPage, { replace: true });
  }
  return (
    <div className={style.test}>
      <div>{user?.role === "admin" ? <h2>Адмін</h2> : <h2>Менеджер</h2>}</div>
      <button onClick={handleLogOut}>Вийти</button>
    </div>
  );
}

export default UserInfo;
