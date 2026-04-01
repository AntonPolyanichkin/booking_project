import { routes } from "@/app/routes/routes";
import style from "@/widgets/header/styles/menu.module.scss";
import { NavLink } from "react-router";

function Menu() {
  const childrenRoutes = routes[1].children;
  const allowRoutes = childrenRoutes?.filter((el) => {
    return el.handle.isInMenu;
  });
  return (
    <nav className={style.menu}>
      <ul className={style.list}>
        {allowRoutes?.map((el, index) => (
          <li key={index} className={style.list__element}>
            <NavLink to={el.path} className={({ isActive }) => (isActive ? `${style.list__link} ${style["list__link-active"]}` : style["list__link"])}>
              {el.handle.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
