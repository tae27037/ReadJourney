import { useState } from "react";
import Diary from "../Diary/Diary";
import Statistics from "../Statistics/Statistics";
import styles from "./Details.module.css";

const Details = ({ book, onRefreshBook, isReading }) => {
  const [view, setView] = useState("diary");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {view === "diary" ? "Diary" : "Statistics"}
        </h3>

        <div className={styles.toggle}>
          <button
            type="button"
            className={`${styles.toggleButton} ${
              view === "diary" ? styles.active : ""
            }`}
            onClick={() => setView("diary")}
            aria-label="Show diary"
          >
            <svg className={styles.icon} width="16" height="16">
              <use href="/sprite.svg#icon-hourglass" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.toggleButton} ${
              view === "statistics" ? styles.active : ""
            }`}
            onClick={() => setView("statistics")}
            aria-label="Show statistics"
          >
            <svg className={styles.icon} width="16" height="16">
              <use href="/sprite.svg#icon-pie" />
            </svg>
          </button>
        </div>
      </div>

      {view === "diary" ? (
        <Diary
          book={book}
          onSessionDeleted={onRefreshBook}
          isReading={isReading}
        />
      ) : (
        <Statistics book={book} />
      )}
    </div>
  );
};

export default Details;
