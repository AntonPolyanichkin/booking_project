import { useDeleteNoteMutation } from "@/features/deleteNote/model/deleteNoteApi";
import Note from "../../../../widgets/note/note/Note";
import styles from "./styles/notesListPerDay.module.scss";
import { useEditNoteStatusMutation } from "@/features/editNoteStatus/model/editNoteStatusApi";
function NotesListPerDay({ notesForSelectedDay }) {
  const [deleteNote] = useDeleteNoteMutation();
  const [editNoteStatus] = useEditNoteStatusMutation();
  if (notesForSelectedDay?.length === 0) {
    return <div>Записи наразі відсутні</div>;
  }
  console.log(notesForSelectedDay);
  return (
    <div>
      <div>
        <ul className={styles["notes__list"]}>
          {notesForSelectedDay?.map((note) => (
            <li key={note.id}>
              {/* <Note dateTime={note.date} name={note.name} lastName={note.lastName} procedure={note.procedure} phoneNumber={note.phoneNumber} additionalNotes={note.additionalNotes} status={note.status} /> */}
              <Note
                id={note.id}
                date={note.date}
                time={note.time}
                name={note.name}
                procedure={note.procedure}
                phoneNumber={note.phone}
                additionalNotes={note.notice}
                status={note.status}
                onStatusChange={editNoteStatus}
                onDelete={deleteNote}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NotesListPerDay;
