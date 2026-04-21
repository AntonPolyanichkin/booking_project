import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";
import { routes as allRoutes } from "@/app/routes/routes";
import { useRefreshQuery } from "@/features/auth/api/authApi";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const routes = allRoutes[0]?.children ?? [];
  const currentRoute = routes.find((route) => route.path === location.pathname);
  const { data: user, isLoading, isFetching } = useRefreshQuery();
  console.log(user);

  if (isLoading || isFetching) {
    return <div>loading</div>;
  } else if (!user) {
    return <Navigate to={frontRoutes.loginPage} replace />;
  } else if (currentRoute?.meta?.roles.length > 0 && !currentRoute?.meta?.roles.includes(user.role)) {
    return <Navigate to={frontRoutes.forbiddenPage} />;
  } else {
    return children;
  }
}
export default ProtectedRoute;
