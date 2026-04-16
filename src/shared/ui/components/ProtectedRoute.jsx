import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";
import { routes as allRoutes } from "@/app/routes/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const user = useSelector((state) => state.authSlice.user);
  const routes = allRoutes[1]?.children ?? [];

  if (!user) {
    return <Navigate to={frontRoutes.loginPage} replace />;
  } else {
    if (routes.meta?.roles.length > 0 && !routes.meta?.roles.includes(user.role)) {
      return <Navigate to={frontRoutes.forbiddenPage} replace />;
    }
  }
  return <Outlet />;
}

export default ProtectedRoute;
