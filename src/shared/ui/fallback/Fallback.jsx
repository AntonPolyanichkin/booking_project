import { getErrorMessage } from "react-error-boundary";
import style from "./style/fallback.module.scss";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className={style.fallback}>
      <p className={style.fallback__title}>Щось пішло не так:</p>
      <pre className={style.fallback__message}>{getErrorMessage(error)}</pre>
      <button className={style.fallback__button} onClick={resetErrorBoundary}>
        Спробувати знову
      </button>
    </div>
  );
}

export default Fallback;