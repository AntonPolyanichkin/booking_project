import Header from "@/widgets/header/Header";
import style from "./styles/mainLayoutStyles.module.scss";
import { Outlet } from "react-router";
function MainLayout() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.page}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
