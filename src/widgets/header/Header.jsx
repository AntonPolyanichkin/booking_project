import Menu from "./Menu";
import style from "@/widgets/header/styles/header.module.scss";
function Header() {
  return (
    <header className={style.header}>
      <div className={style["header__title-container"]}>
        <h1 className={style.header__title}>Booking</h1>
        <p className={style.header__subtitle}>Система записів</p>
      </div>
      <div className={style.header__line}> </div>
      <Menu />
    </header>
  );
}

export default Header;
