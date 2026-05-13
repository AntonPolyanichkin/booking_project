import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSignUpMutation } from "../api/authApi";
import { setUser } from "../api/authSlice";
import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";

export function useSignUp() {
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSignApi(credentials) {
    const result = await signUp(credentials).unwrap();
    dispatch(setUser({ uid: result.uid, email: result.email, role: result.role }));
    navigate(frontRoutes.calendarPage, { replace: true });
    return result;
  }

  return { handleSignApi, isLoading, isError };
}
