import { useEffect, useId, useRef, useState } from "react";
import style from "./styles/loginStyles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidation } from "./schema/yupSchema";
function Login() {
  const userEmail = useId();
  const userPassword = useId();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [placeholder, setPlaceholder] = useState("••••••••");
const intervalRef = useRef(null);

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
  const handleLogin = {
	
  }
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
                    <p className={style["list__item-statistics"]}>2</p>
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
              <form className={style.form} onSubmit={handleSubmit()}>
                <label className={style.form__label}>
                  <p>Пошта</p>
                  <input type="email" className={style.form__input} {...register("email")} placeholder="somemail@gmail.com" />
                </label>
                {errors.email && <p className={style.form__error}>{errors.email.message}</p>}
                <label className={style.form__label}>
                  <p>Пароль</p>
                  <input type="password" className={style.form__input} {...register("password")} placeholder={placeholder} onFocus={stopAnimation}
    onBlur={startAnimation}/>
                </label>
                {errors.password && <p className={style.form__error}>{errors.password.message}</p>}
                <button type="submit" className={style.form__btn}>
                  Увійти
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
