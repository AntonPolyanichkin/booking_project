import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

function ProtectedRoute() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authSlice.user);
  const loading = useSelector((state) => state.authSlice.loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
