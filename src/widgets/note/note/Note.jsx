import { STATUS_OPTIONS } from "@/shared/constans/statusConstans";
import styles from "./styles/note.module.scss";

function Note({ id, date, time, name, procedure, phoneNumber, additionalNotes, status, onStatusChange, onDelete }) {
  const noteDate = new Date(date);
  const formatter = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
  });
  const formattedDate = formatter.format(noteDate);

  const handleStatusChange = (event) => {
    onStatusChange?.({ id, status: event.target.value });
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <div className={styles.note}>
      <div className={styles.top}>
        <p className={styles.time}>{`${formattedDate}, ${time}`}</p>
        {onDelete && (
          <button type="button" className={styles.deleteButton} onClick={handleDelete} aria-label="Видалити запис">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.procedure}>{procedure}</p>
        <div className={styles.details}>
          <p className={styles.phone}>{phoneNumber}</p>
        </div>
        <p className={styles.comment}>{additionalNotes}</p>
      </div>
      {!onStatusChange ? (
        <p>{status}</p>
      ) : (
        <select
          className={styles.status}
          value={status.toLowerCase()}
          onChange={handleStatusChange}
          aria-label="Статус запису"
        >
          {STATUS_OPTIONS.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Note;
