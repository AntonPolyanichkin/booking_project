import { useNavigate } from "react-router";
import { useLoginMutation } from "../api/authApi";
import { useState } from "react";
import { setUser } from "../api/authSlice";

export function useLogin() {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  async function handleLoginApi(credentials) {
    try {
      const result = await login(credentials).unwrap();
      navigation("/calendar");
      setUser(...result);
      return result;
    } catch (error) {
      setError(error.message);
    }
  }

  return { handleLoginApi, isLoading, error };
}
