import NotesListPerDay from "@/entities/showNotesList/ui/notesListPerDay/NotesListPerDay";
import CalendarPageHeader from "../CalendarPageHeader/CalendarPageHeader";
import CalendarPageInfo from "../CalendarPageInfo/CalendarPageInfo";
import styles from "./styles/calendarStyles.module.scss";
import BasicDateCalendar from "../CalendarBlock/BasicDateCalendar";
import StatusInfoBlock from "@/widgets/statusInfoBlock/StatusInfoBlock";
import { useMemo, useState } from "react";
import { ShowAddClientModal } from "@/shared/contexts/showAddClientModal";
import AddClientModal from "@/features/addNote/ui/addClientModal/AddClientModal";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { useGetAllNotesQuery } from "@/entities/showNotesList/model/getNotesListApi";
function CalendarPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("uk"));
  const { data: notes = [] } = useGetAllNotesQuery();
  const notesForSelectedDay = useMemo(
    () =>
      notes?.filter((noteDay) =>
        dayjs(noteDay.date).isSame(selectedDate, "day"),
      ),
    [notes, selectedDate],
  );
  console.log("notesForSelectedDay--------", notesForSelectedDay);
  console.log("selectedDate--------", selectedDate.format("	MMMM D, YYYY"));
  return (
    <section className={styles.calendar}>
      <div className={styles["calendar__container"]}>
        <div className={styles["calendar__content"]}>
          <ShowAddClientModal value={{ setShowModal }}>
            <CalendarPageHeader />
          </ShowAddClientModal>
          <CalendarPageInfo
            currentDay={selectedDate.format("dd, MMM D")}
            notesList={notesForSelectedDay}
          />
          <div className={styles["grid-container"]}>
            <div className={styles["grid-container__item"]}>
              <BasicDateCalendar
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
            <div className={styles["grid-container__item"]}>
              <NotesListPerDay notesForSelectedDay={notesForSelectedDay} />
            </div>
            <div className={styles["grid-container__item"]}>
              <StatusInfoBlock />
            </div>
          </div>
        </div>
      </div>
      <ShowAddClientModal value={{ setShowModal }}>
       
        {showModal && <AddClientModal />}
      </ShowAddClientModal>
    </section>
  );
}

export default CalendarPage;
