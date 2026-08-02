import { useContext } from "react";
import styles from "./styles/addClientBtn.module.scss";
import { ShowAddClientModal } from "@/shared/contexts/showAddClientModal";
function AddClientBtn() {
  const { setShowModal } = useContext(ShowAddClientModal);
  const handleClick = () => setShowModal(true);
  return (
    <button className={styles["add-client-button"]} onClick={handleClick}>
      <span className={styles["add-client-button__animated-symbol"]}>+</span> Новий запис
    </button>
  );
}

export default AddClientBtn;
