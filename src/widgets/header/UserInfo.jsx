import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";
import { role } from "@/app/routes/role/role";
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
  function checkRole(userRole) {
    switch (userRole?.role) {
      case role.admin:
        return <h2>Адмін - {user?.email}</h2>;

      case role.manager:
        return <h2>Менеджер - {user?.email}</h2>;

      case role.user:
        return <h2>Клієнт - {user?.email}</h2>;

      default:
        return <h2>Роль не визначена - {user?.email}</h2>;
    }
  }

  return (
    <div className={style.userInfo__container}>
      {checkRole(user)}
      <button onClick={handleLogOut}>Вийти</button>
    </div>
  );
}

export default UserInfo;
