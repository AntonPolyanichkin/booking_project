import { useGetAllNotesQuery } from "@/entities/showNotesList/model/getNotesListApi";
import style from "./styles/proceduresPopularity.module.scss";
import { useMemo } from "react";
import NotFound from "@/pages/NotFound";

function ProceduresPopularity() {
  const { data: notes, error, isLoading } = useGetAllNotesQuery();
  const mostPopularProcedure = useMemo(
    () =>
      notes?.reduce((acumulator, note) => {
        acumulator[note.procedure] = (acumulator[note.procedure] || 0) + 1;
        return acumulator;
      }, {}),
    [notes],
  );

  console.log(notes);

  function getPopularProcedures(mostPopularProcedure) {
    const normalizePopularProcedure = Object.entries(mostPopularProcedure ?? []);
    const sortedPopularProcedure = normalizePopularProcedure.sort((a, b) => b[1] - a[1]).slice(0, 3);
    return (
      <ul className={style.procedures__list}>
        {sortedPopularProcedure.map((procedure, index) => (
          <li key={index} className={style.procedures__item}>
            <p className={style.procedures__text}>
              Процедура: <span className={style.procedures__name}>{procedure[0]}</span>, кількість:{" "}
              <span className={style.procedures__count}>{procedure[1]}</span>
            </p>
          </li>
        ))}
      </ul>
    );
  }
  console.log(getPopularProcedures(mostPopularProcedure));

  if (error) {
    return <NotFound />;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className={style.procedures}>
        <h2 className={style.procedures__title}>Найбільш популярні процедури</h2>
        {getPopularProcedures(mostPopularProcedure)}
      </section>
    );
  }
}

export default ProceduresPopularity;
