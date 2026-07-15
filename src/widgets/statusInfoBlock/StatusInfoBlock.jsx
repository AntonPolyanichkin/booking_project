import styles from "./styles/StatusInfoBlock.module.scss";
function StatusInfoBlock() {
  return (
    <div className={styles.cointainer}>
      <div className={styles["title-container"]}>
        <h3 className={styles["title-container__title"]}>Статуси</h3>
      </div>
      <div className={styles["status-list-container"]}>
        <ul className={styles["status-list-container__list"]}>
          <li className={styles["list-element"]}>Заплановано</li>
          <li className={styles["list-element"]}>Завершено</li>
          <li className={styles["list-element"]}>Скасовано</li>
        </ul>
      </div>
    </div>
  );
}

export default StatusInfoBlock;
