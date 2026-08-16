import Note from "../../../../widgets/note/note/Note";
import styles from "./styles/notesListPerMonth.module.scss";
function NotesListPerMonth({ notesPerMonth }) {
  console.log("notesPerMonth-------------", notesPerMonth);

  return (
    <div className={styles.wrapper}>
      {notesPerMonth?.length ? (
        <ul className={styles.list}>
          {notesPerMonth.map((note) => (
            <li key={note.id} className={styles.item}>
              <Note
                id={note.id}
                date={note.date}
                time={note.time}
                name={note.name}
                procedure={note.procedure}
                phoneNumber={note.phone}
                additionalNotes={note.notice}
                status={note.status}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Немає записів за цей місяць</p>
      )}
    </div>
  );
}

export default NotesListPerMonth;
