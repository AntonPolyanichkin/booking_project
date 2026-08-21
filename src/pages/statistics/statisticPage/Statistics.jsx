import { ErrorBoundary } from "react-error-boundary";
import NotesQuantity from "../notesQuantity/NotesQuantity";
import ProceduresPopularity from "../proceduresPopularity/ProceduresPopularity";
import style from "./styles/statisticsStyles.module.scss";
import Fallback from "@/shared/ui/fallback/Fallback";
function Statistics() {
  return (
    <section className={style.statistics}>
      <div className={style.statistics__container}>
        <div className={style.statistics__content}>
          <h1>Загальна статистика бізнесу</h1>
          <ErrorBoundary FallbackComponent={Fallback}>
            <NotesQuantity />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={Fallback}>
            <ProceduresPopularity />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
