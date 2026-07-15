import Header from "@/widgets/header/Header";
import style from "./styles/mainLayoutStyles.module.scss";
import { Outlet } from "react-router";
import { useRefreshQuery } from "@/features/auth/api/authApi";
function MainLayout() {
  const { isLoading } = useRefreshQuery();

  if (isLoading) return <div>loading...</div>;
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
