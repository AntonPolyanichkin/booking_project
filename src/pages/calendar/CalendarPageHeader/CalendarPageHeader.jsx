import AddClientBtn from "@/features/addNote/ui/clientBtn/AddClientBtn";
import styles from "./styles/calendarPageHeader.module.scss";
function CalendarPageHeader() {
  return (
    <div className={styles["calendar-page-header"]}>
      <div className={styles["title-container"]}>
        <h2 className={styles["title-container__title"]}>Календар</h2>
        <p className={styles["title-container__subtitle"]}>Управління розкладом та записами</p>
      </div>
      <AddClientBtn />
    </div>
  );
}

export default CalendarPageHeader;
