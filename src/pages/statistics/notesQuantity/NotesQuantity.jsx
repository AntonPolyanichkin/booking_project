import { useGetAllNotesQuery } from "@/entities/showNotesList/model/getNotesListApi";
import style from "./styles/notesQuantity.module.scss";
import NotFound from "@/pages/NotFound";

function NotesQuantity() {
  const { data: notes, error, isLoading } = useGetAllNotesQuery();
  const proceduresQuantity = notes ? notes.length : 0;
  if (error) {
    return <NotFound />;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={style.notes}>
        <h2 className={style.notes__title}>Кількість процедур за увесь час: {proceduresQuantity} </h2>
      </div>
    );
  }
}

export default NotesQuantity;
