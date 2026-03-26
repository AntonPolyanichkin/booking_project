import style from "./styles/loginStyles.module.scss";
function Login() {
  return (
    <section className={style.login}>
      <div className={style.login__container}>
        <div className={style.login__content}>
          <p>Login page</p>
        </div>
      </div>
    </section>
  );
}

export default Login;
