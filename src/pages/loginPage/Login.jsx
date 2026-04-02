import { useId } from "react";
import style from "./styles/loginStyles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidation } from "./schema/yupSchema";
function Login() {
  const userEmail = useId();
  const userPassword = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formValidation) });
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
              <form className={style.form}>
                <label htmlFor={userEmail} className={style.form__label}>
                  Пошта
                </label>
                <input type="email" id={userEmail} className={style.form__input} {...register("email")} placeholder="somemail@gmail.com" />
                {errors.email && <p className={style.form__error}>{errors.email.message}</p>}
                <label htmlFor={userPassword} className={style.form__label}>
                  Пароль
                </label>
                <input type="password" id={userPassword} className={style.form__input} {...register("password")} />
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
