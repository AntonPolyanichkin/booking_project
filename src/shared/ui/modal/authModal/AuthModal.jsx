import { createPortal } from "react-dom";
import styles from "./styles/authModal.module.scss";

function AuthModal({ handleClose }) {
  const container = document.getElementById("auth-modal");
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.window} role="dialog" aria-modal="true">
        <button className={styles.close} onClick={handleClose} aria-label="Закрити">
          ✕
        </button>
        <p className={styles.message}>Щоб продовжити, будь ласка, зареєструйтесь або введіть коректні дані.</p>
      </div>
    </div>,
    container,
  );
}

export default AuthModal;
