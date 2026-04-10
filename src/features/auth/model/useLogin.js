const { useLoginMutation } = require("../api/authApi");

function useLogin() {
  const [loginMutation, { isLoading, error }] = useLoginMutation();

  async function login(credentials) {
    try {
      const result = await loginMutation(credentials).unwrap;
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return { isLoading, error };
}
