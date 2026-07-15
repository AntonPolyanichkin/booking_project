import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";
import { role } from "@/app/routes/role/role";
import { useLogoutMutation } from "@/features/auth/api/authApi";
import { clearUser } from "@/features/auth/api/authSlice";
import style from "@/widgets/header/styles/userInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
function UserInfo() {
  const user = useSelector((state) => state.authSlice.user);
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogOut() {
    logout();
    dispatch(clearUser());
    navigate(frontRoutes.loginLayout, { replace: true });
  }
  function checkRole(userRole) {
    switch (userRole?.role) {
      case role.admin:
        return (
          <div className={style.userInfo__roleUser}>
            <FaUserShield />
            <h2>Адмін</h2>
          </div>
        );

      case role.manager:
        return (
          <div className={style.userInfo__roleUser}>
            <FaUserCog />
            <h2>Менеджер</h2>
          </div>
        );

      case role.user:
        return (
          <div className={style.userInfo__roleUser}>
            <FaUser />
            <h2 className={style.userInfo__text}>Клієнт</h2>
          </div>
        );

      default:
        return (
          <div className={style.userInfo__roleUser}>
            <FaUserSlash />
            <h2>Невідома роль</h2>
          </div>
        );
    }
  }

  return (
    <div className={style.userInfo__container}>
      {checkRole(user)}
      <button className={style.userInfo__btn} onClick={handleLogOut}>Вийти</button>
    </div>
  );
}

export default UserInfo;
