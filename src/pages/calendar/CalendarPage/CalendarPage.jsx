import NotesList from "@/entities/showNotesList/ui/NotesList";
import CalendarPageHeader from "../CalendarPageHeader/CalendarPageHeader";
import CalendarPageInfo from "../CalendarPageInfo/CalendarPageInfo";
import styles from "./styles/calendarStyles.module.scss";
import BasicDateCalendar from "../CalendarBlock/BasicDateCalendar";
import StatusInfoBlock from "@/widgets/statusInfoBlock/StatusInfoBlock";
import { useState } from "react";
import { ShowAddClientModal } from "@/shared/contexts/showAddClientModal";
import AddClientModal from "@/features/addClient/ui/addClientModal/AddClientModal";
function CalendarPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <section className={styles.calendar}>
      <div className={styles["calendar__container"]}>
        <div className={styles["calendar__content"]}>
          <ShowAddClientModal value={{ setShowModal }}>
            <CalendarPageHeader />
          </ShowAddClientModal>
          <CalendarPageInfo />
          <div className={styles["grid-container"]}>
            <div className={styles["grid-container__item"]}>
              <BasicDateCalendar />
            </div>
            <div className={styles["grid-container__item"]}>
              <NotesList />
            </div>
            <div className={styles["grid-container__item"]}>
              <StatusInfoBlock />
            </div>
          </div>
        </div>
      </div>
      <ShowAddClientModal value={{ setShowModal }}> {showModal && <AddClientModal />}</ShowAddClientModal>
    </section>
  );
}

export default CalendarPage;
