import { useNavigate } from "react-router";
import { useLoginMutation } from "../api/authApi";

export function useLogin() {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigation = useNavigate();
  async function handleLoginApi(credentials) {
    try {
      const result = await login(credentials).unwrap();
      navigation("/calendar");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return { handleLoginApi, isLoading, error };
}
