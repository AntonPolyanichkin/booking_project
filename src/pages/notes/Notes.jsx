import NotesListPerDay from "../../entities/showNotesList/ui/noteList/NotesListPerDay";
import style from "./styles/notesStyles.module.scss";
function Notes() {
  return (
    <section className={style.notes}>
      <div className={style.notes__container}>
        <div className={style.notes__content}>
          <p>Notes page</p>
          <NotesListPerDay />
        </div>
      </div>
    </section>
  );
}

export default Notes;
