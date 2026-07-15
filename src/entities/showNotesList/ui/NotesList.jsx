import { useGetAllNotesQuery } from "@/entities/showNotesList/model/getNotesListApi";
import Note from "../../../widgets/note/note/Note";

function NotesList() {
  const { data, isLoading, isError } = useGetAllNotesQuery();
  const notes = data?.data || [];
  console.log(notes);

  return (
    <div>
      <div>
        <ul>
          {isLoading ? (
            <div>Завантаження постів</div>
          ) : (
            notes?.map((note) => (
              <li key={note.id}>
                <Note dateTime={note.dateTime} name={note.name} lastName={note.lastName} procedure={note.procedure} phoneNumber={note.phoneNumber} additionalNotes={note.additionalNotes} status={note.status} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default NotesList;
