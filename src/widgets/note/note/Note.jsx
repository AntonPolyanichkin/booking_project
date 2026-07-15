import styles from "./styles/note.module.scss";

function Note({ dateTime, name, lastName, procedure, phoneNumber, additionalNotes, status }) {
  const date = new Date(dateTime);
  const formatter = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
  });
  const currentTime = formatter.format(date);

  return (
    <div className={styles.note}>
      <p className={styles.time}>{currentTime}</p>
      <div className={styles.content}>
        <h3 className={styles.name}>{`${name} ${lastName}`}</h3>
        <p className={styles.procedure}>{procedure}</p>
        <div className={styles.details}>
          <p className={styles.phone}>{phoneNumber}</p>
          {/* <p className={styles.price}></p> */}
        </div>
        <p className={styles.comment}>{additionalNotes}</p>
      </div>
      <div className={styles.status}>{status}</div>
    </div>
  );
}

export default Note;
