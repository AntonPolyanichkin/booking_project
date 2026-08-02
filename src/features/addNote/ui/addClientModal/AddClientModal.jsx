import { role } from "@/app/routes/role/role";
import { useContext, useId } from "react";
import { useSelector } from "react-redux";
import styles from "./styles/AddClientModal.module.scss";
import { createPortal } from "react-dom";
import { ShowAddClientModal } from "@/shared/contexts/showAddClientModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addClientShema } from "../../model/shema/addClientShema";
import { useAddNoteMutation } from "../../model/addNoteApi";
function AddClientModal() {
  const nameId = useId();
  const phoneId = useId();
  const procedureId = useId();
  const priceId = useId();
  const statusId = useId();
  const dataId = useId();
  const timeId = useId();
  const noteId = useId();
  const [addNote, { isLoading, isError, isSuccess }] = useAddNoteMutation();
  const userRole = useSelector((state) => state.authSlice.user.role);
  const isPrivileged = userRole === role.admin || userRole === role.manager;
  const { setShowModal } = useContext(ShowAddClientModal);
  const handleCloseMenu = () => setShowModal(false);
  const handleAddClient = async (credentials) => {
    try {
      await addNote(credentials);
      setShowModal(false);
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(yupResolver(addClientShema));
  return createPortal(
    <div className={styles["add-client-modal__overlay"]}>
      <div className={styles["add-client-modal__body"]}>
        <h2 className={styles["add-client-modal__title"]}>Новий клієнт</h2>
        <form className={styles["add-client-modal__form"]} onSubmit={handleSubmit(handleAddClient)}>
          <div className={styles["add-client-modal__field"]}>
            <label className={styles["add-client-modal__label"]} htmlFor={nameId}>
              Ім'я клієнта
            </label>
            <input className={styles["add-client-modal__input"]} type="text" name={"name"} id={nameId} placeholder="Введіть ім'я" minLength={3} {...register("name")} />
            {errors.name && <p className={styles.form__error}>{errors.name.message}</p>}
          </div>

          <div className={styles["add-client-modal__field"]}>
            <label className={styles["add-client-modal__label"]} htmlFor={phoneId}>
              Телефон
            </label>
            <input className={styles["add-client-modal__input"]} type="tel" name={"phone"} id={phoneId} placeholder="+380 XX XXX XX XX" {...register("phone")} />
            {errors.phone && <p className={styles.form__error}>{errors.phone.message}</p>}
          </div>

          <div className={styles["add-client-modal__field"]}>
            <label className={styles["add-client-modal__label"]} htmlFor={procedureId}>
              Процедура
            </label>
            <input className={styles["add-client-modal__input"]} type="text" name="procedure" id={procedureId} placeholder="Назва процедури" minLength={3} {...register("procedure")} />
            {errors.procedure && <p className={styles.form__error}>{errors.procedure.message}</p>}
          </div>

          {isPrivileged && (
            <div className={styles["add-client-modal__row"]}>
              <div className={styles["add-client-modal__field"]}>
                <label className={styles["add-client-modal__label"]} htmlFor={priceId}>
                  Ціна (грн)
                </label>
                <input className={styles["add-client-modal__input"]} type="number" name="price" id={priceId} placeholder="0" min={3} {...register("price", { valueAsNumber: true })} />
                {errors.price && <p className={styles.form__error}>{errors.price.message}</p>}
              </div>
            </div>
          )}

          <div className={styles["add-client-modal__row"]}>
            <div className={styles["add-client-modal__field"]}>
              <label className={styles["add-client-modal__label"]} htmlFor={dataId}>
                Дата
              </label>
              <input className={styles["add-client-modal__input"]} type="date" name={"date"} id={dataId} placeholder="дд.мм.рррр" {...register("date", { valueAsDate: true })} />
              {errors.date && <p className={styles.form__error}>{errors.date.message}</p>}
            </div>
            <div className={styles["add-client-modal__field"]}>
              <label className={styles["add-client-modal__label"]} htmlFor={timeId}>
                Час
              </label>
              <input className={styles["add-client-modal__input"]} type="time" name="time" id={timeId} placeholder="гг:хх" {...register("time")} />
              {errors.time && <p className={styles.form__error}>{errors.time.message}</p>}
            </div>
          </div>

          <div className={styles["add-client-modal__field"]}>
            <label className={styles["add-client-modal__label"]} htmlFor={noteId}>
              Нотатки
            </label>
            <input className={styles["add-client-modal__input"]} type="text" name="notice" id={noteId} placeholder="Додаткова інформація" {...register("notice")} />
            {errors.notice && <p className={styles.form__error}>{errors.notice.message}</p>}
          </div>

          <div className={styles["add-client-modal__actions"]}>
            <button type="button" className={`${styles["add-client-modal__button"]} ${styles["add-client-modal__button--secondary"]}`} onClick={handleCloseMenu}>
              Скасувати
            </button>
            <button type="submit" className={`${styles["add-client-modal__button"]} ${styles["add-client-modal__button--primary"]}`}>
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("add-client-modal"),
  );
}

export default AddClientModal;
