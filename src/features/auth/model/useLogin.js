import { useNavigate } from "react-router";
import { useLoginMutation } from "../api/authApi";
import { setUser } from "../api/authSlice";
import { useDispatch } from "react-redux";
import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";

export function useLogin() {
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLoginApi(credentials) {
    const result = await login(credentials).unwrap();
    dispatch(setUser({ id: result.id, email: result.email, role: result.role }));
    navigate(frontRoutes.calendarPage, { replace: true });
    return result;
  }

  return { handleLoginApi, isLoading, isError };
}
