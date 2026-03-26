import style from "./styles/calendarStyles.module.scss";
function CalendarPage() {
  return (
    <section className={style.calendar}>
      <div className={style.calendar__container}>
        <div className={style.calendar__content}>
          <p>CalendarPage</p>
        </div>
      </div>
    </section>
  );
}

export default CalendarPage;
