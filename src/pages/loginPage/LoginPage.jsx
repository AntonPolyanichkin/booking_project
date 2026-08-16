import { useEffect, useRef, useState } from "react";
import style from "./styles/loginStyles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidation } from "./schema/loginSchema";
import { useLogin } from "@/features/auth/model/useLogin";
import { useNavigate } from "react-router";
import { useSignUp } from "@/features/auth/model/useSignUp";
import { useGoogleAuthMutation } from "@/features/auth/api/authApi";
import { frontRoutes } from "@/app/routes/frontRoutes/frontRoutes";
import AuthModal from "@/shared/ui/modal/authModal/authModal";
function Login() {
  const [placeholder, setPlaceholder] = useState("••••••••");
  const [login, setLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const intervalRef = useRef(null);
  const { handleLoginApi, isLoading: isLoginLoading, isError: isLoginError } = useLogin();
  const { handleSignApi, isLoading: isSignUpLoading, isError: isSignError } = useSignUp();
  const [googleAuth, { isLoading: isGoogleAuthLoading, isError: isGoogleAuthError }] = useGoogleAuthMutation();
  const navigate = useNavigate();
  const startAnimation = () => {
    const dots = ["•", "••", "•••", "••••", "•••••", "••••••", "•••••••", "••••••••", ""];
    let i = 0;
    intervalRef.current = setInterval(() => {
      setPlaceholder(dots[i]);
      i = (i + 1) % dots.length;
    }, 200);
  };

  const stopAnimation = () => {
    clearInterval(intervalRef.current);
    setPlaceholder("");
  };

  useEffect(() => {
    startAnimation();
    return () => clearInterval(intervalRef.current);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formValidation) });

  const handleLogin = async (credentials) => {
    if (login) {
      await handleLoginApi(credentials);
    } else {
      await handleSignApi(credentials);
    }
  };
  const handleGoogleAuth = async () => {
    const result = await googleAuth();
    console.log("result:", result);
    if (result.data) {
      navigate(frontRoutes.calendarPage);
    }
  };
  useEffect(() => {
    if (isLoginError) {
      setIsOpen(true);
    }
  }, [isLoginError]);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <section className={style.login}>
      <div className={style["login__container"]}>
        <div className={style.login__content}>
          <div className={`${style.login__about} ${style["about-info"]}`}>
            <h1 className={style["about-info__title"]}>Booking</h1>
            <div className={style["about-info__text-container"]}>
              <h2 className={style["about-info__main-text"]}>
                Управління <br />
                записами <br /> клієнтів
              </h2>
              <p className={style["about-info__text"]}>
                Професійна система для бізнесу. <br />
                Календар, записи, аналітика — все <br />в одному місці.{" "}
              </p>
            </div>
            <div className={style["about-benefits"]}>
              <div className={style["about-benefits__line"]}></div>
              <div className={style["about-benefits__container"]}>
                <ul className={`${style["about-benefits__list"]} ${style.list}`}>
                  <li className={style.list__item}>
                    <p className={style["list__item-statistics"]}>15+</p>
                    <p className={style["list__item-text"]}>Записів у системі</p>
                  </li>
                  <li className={style.list__item}>
                    <p className={style["list__item-statistics"]}>3</p>
                    <p className={style["list__item-text"]}>Ролі доступу</p>
                  </li>
                  <li className={style.list__item}>
                    <p className={style["list__item-statistics"]}>100%</p>
                    <p className={style["list__item-text"]}>Контроль бізнесу</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${style["login__form-container"]} ${style["container-form"]}`}>
            <div className={style["container-form-inside"]}>
              <div className={style["container-form__title-wrapper"]}>
                <h2 className={style["container-form__title"]}>Вхід у систему</h2>
                <p className={style["container-form__text"]}>Введіть облікові дані для доступу</p>
              </div>
              <form className={style.form} onSubmit={handleSubmit(handleLogin)}>
                <label className={style.form__label}>
                  <p>Пошта</p>
                  <input
                    type="email"
                    className={style.form__input}
                    {...register("email")}
                    placeholder="somemail@gmail.com"
                  />
                </label>
                {errors.email && <p className={style.form__error}>{errors.email.message}</p>}
                <label className={style.form__label}>
                  <p>Пароль</p>
                  <input
                    type="password"
                    className={style.form__input}
                    {...register("password")}
                    placeholder={placeholder}
                    onFocus={stopAnimation}
                    onBlur={startAnimation}
                  />
                </label>
                {errors.password && <p className={style.form__error}>{errors.password.message}</p>}
                <div className={style.form__btnContainer}>
                  <button type="submit" className={style.form__login}>
                    {login ? "Увійти" : "Зареєструватись"}
                  </button>
                  <button type="button" className={style.form__googleLogin} onClick={handleGoogleAuth}>
                    Sign in with Google
                  </button>
                  <button
                    type="button"
                    className={style.form__sing}
                    onClick={() => setLogin((prev) => (prev ? false : true))}
                  >
                    {login ? "Немає акаунт? Зарєструватись" : "Увійти"}
                  </button>
                </div>
              </form>
              {isOpen && <AuthModal handleClose={handleClose} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
