import { useGetAllNotesQuery } from "../../model/getNotesListApi";

function NotesList() {
  const { data, isLoading, isError } = useGetAllNotesQuery();
  const notes = data?.data || [];
  return (
    <div>
      <div>
        <ul>{isLoading ? <div>Завантаження постів</div> : notes?.map((note) => <li key={note.id}>{note.name}</li>)}</ul>
      </div>
    </div>
  );
}

export default NotesList;
