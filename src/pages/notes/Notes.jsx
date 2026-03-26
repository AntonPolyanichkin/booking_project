import NotesList from "@/features/showNotesList/ui/notesList/NotesList";
import style from "./styles/notesStyles.module.scss";
function Notes() {
  return (
    <section className={style.notes}>
      <div className={style.notes__container}>
        <div className={style.notes__content}>
          <p>Notes page</p>
			 <NotesList />
        </div>
      </div>
    </section>
  );
}

export default Notes;
