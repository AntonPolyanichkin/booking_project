import { useSelector } from "react-redux";
import styles from "./styles/calendarPageInfo.module.scss";
import { role } from "@/app/routes/role/role";
function CalendarPageInfo() {
  const userRole = useSelector((state) => state.authSlice.user.role);
  if (userRole === role.user) {
    return (
      <div className={styles["info-container__user"]}>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>Сьогодні</h3>
          <p className={styles["info-block__information"]}>3</p>
          <p className={styles["info-block__text"]}>записів</p>
        </article>
      </div>
    );
  } else {
    return (
      <div className={styles["info-container"]}>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>Сьогодні</h3>
          <p className={styles["info-block__information"]}>3</p>
          <p className={styles["info-block__text"]}>записів</p>
        </article>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>Заплановано</h3>
          <p className={styles["info-block__information"]}>6</p>
          <p className={styles["info-block__text"]}>в майбутньому</p>
        </article>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>Дохід</h3>
          <p className={styles["info-block__information"]}>5700</p>
          <p className={styles["info-block__text"]}>грн загалом</p>
        </article>
      </div>
    );
  }
}

export default CalendarPageInfo;
