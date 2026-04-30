import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { frontRoutes } from "../routes/frontRoutes/frontRoutes";

function AppInit() {
  const user = useSelector((state) => state.authSlice.user);
  if (user) {
    return <Navigate to={frontRoutes.calendarPage} replace />;
  } else {
    return <Navigate to={frontRoutes.loginPage} replace />;
  }
}

export default AppInit;
