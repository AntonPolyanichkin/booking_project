import { navigation } from "@/app/routes/navigatonRoutes/navigation";
import style from "@/widgets/header/styles/menu.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

function Menu() {
  const routes = navigation;
  const user = useSelector((state) => state.authSlice.user);
  const allowRoutes = routes?.filter((el) => {
    return el.meta.isInMenu && el.meta?.roles.includes(user?.role);
  });
  return (
    <nav className={style.menu}>
      <ul className={style.list}>
        {allowRoutes?.map((el, index) => (
          <li key={index} className={style.list__element}>
            <NavLink to={el.path} className={({ isActive }) => (isActive ? `${style.list__link} ${style["list__link-active"]}` : style["list__link"])}>
              {el.meta?.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
