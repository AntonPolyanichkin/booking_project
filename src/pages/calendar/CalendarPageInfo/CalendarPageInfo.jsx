import { useSelector } from "react-redux";
import styles from "./styles/calendarPageInfo.module.scss";
import { role } from "@/app/routes/role/role";
import { useMemo } from "react";
function CalendarPageInfo({ currentDay, notesList }) {
  const userRole = useSelector((state) => state.authSlice.user.role);
  const plannedNotes = useMemo(() => notesList?.filter((note) => note.status.toLowerCase() === "заплановано"));
  const profit = useMemo(() => notesList?.reduce((profit, note) => (note.status.toLowerCase() === "завершено" ? (profit += note.price) : profit),0));
  if (userRole === role.user) {
    return (
      <div className={styles["info-container__user"]}>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>{currentDay}</h3>
          <p className={styles["info-block__information"]}>{notesList?.length}</p>
          <p className={styles["info-block__text"]}>записів</p>
        </article>
      </div>
    );
  } else {
    return (
      <div className={styles["info-container"]}>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>{currentDay}</h3>
          <p className={styles["info-block__information"]}>{notesList?.length}</p>
          <p className={styles["info-block__text"]}>записів</p>
        </article>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>Заплановано</h3>
          <p className={styles["info-block__information"]}>{plannedNotes.length}</p>
          <p className={styles["info-block__text"]}>на обрану дату</p>
        </article>
        <article className={styles["info-block"]}>
          <h3 className={styles["info-block__title"]}>Дохід</h3>
          <p className={styles["info-block__information"]}>{profit}</p>
          <p className={styles["info-block__text"]}>грн загалом</p>
        </article>
      </div>
    );
  }
}

export default CalendarPageInfo;
