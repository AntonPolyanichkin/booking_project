import Header from "@/widgets/header/Header";
import style from "./styles/mainLayoutStyles.module.scss";
import { Outlet } from "react-router";
import Footer from "@/widgets/footer/Footer";
function MainLayout() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.page}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
