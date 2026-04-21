import { routes } from "@/app/routes/routes";
import style from "@/widgets/header/styles/menu.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

function Menu() {
  const childrenRoutes = routes[0].children;
  const user = useSelector((state) => state.authSlice.user);
  const allowRoutes = childrenRoutes?.filter((el) => {
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
