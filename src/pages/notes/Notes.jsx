import { useGetAllNotesQuery } from "@/entities/showNotesList/model/getNotesListApi";
import NotesListPerMonth from "../../entities/showNotesList/ui/notesListPerMonth/NotesListPerMonth";
import dayjs from "dayjs";
import style from "./styles/notesStyles.module.scss";
import { useMemo } from "react";
import NotFound from "../NotFound";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/shared/ui/fallback/Fallback";
function Notes() {
  const { data: notes = [], error, isLoading } = useGetAllNotesQuery();
  const currentMonth = new Date().getMonth() + 1;
  const notesPerMonth = useMemo(
    () => notes?.filter((note) => dayjs(note.date).month() + 1 === currentMonth),
    [notes, currentMonth],
  );
  const notesStatisics = notesPerMonth?.reduce(
    (prevValue, note) => {
      switch (note?.status?.toLowerCase()) {
        case "заплановано":
          prevValue.planned += 1;
          break;
        case "завершено":
          prevValue.finished += 1;
          break;
        case "скасовано":
          prevValue.cancelled += 1;
          break;
        default:
          prevValue;
          break;
      }
      return prevValue;
    },
    {
      planned: 0,
      finished: 0,
      cancelled: 0,
    },
  );

  console.log(notesPerMonth);
  if (error) {
    return <NotFound />;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className={style.notes}>
        <div className={style.notes__container}>
          <div className={style.notes__content}>
            <h1 className={style.notes__title}>Записи за цей місяць:</h1>

            <div className={style.notes__stats}>
              <div className={style.notes__stat}>
                <p className={style.notes__statLabel}>Загальна кількість</p>
                <p className={style.notes__statValue}>{notesPerMonth.length}</p>
              </div>
              <div className={style.notes__stat}>
                <p className={style.notes__statLabel}>Заплановані</p>
                <p className={style.notes__statValue}>{notesStatisics?.planned}</p>
              </div>
              <div className={style.notes__stat}>
                <p className={style.notes__statLabel}>Завершені</p>
                <p className={style.notes__statValue}>{notesStatisics?.finished}</p>
              </div>
              <div className={style.notes__stat}>
                <p className={style.notes__statLabel}>Скасовані</p>
                <p className={style.notes__statValue}>{notesStatisics?.cancelled}</p>
              </div>
            </div>
            <ErrorBoundary FallbackComponent={Fallback}>
              <NotesListPerMonth notesPerMonth={notesPerMonth} />
            </ErrorBoundary>
          </div>
        </div>
      </section>
    );
  }
}
export default Notes;
