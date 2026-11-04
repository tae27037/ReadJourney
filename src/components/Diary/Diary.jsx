import toast from "react-hot-toast";
import { deleteReadingSession } from "../../services/bookApi";
import styles from "./Diary.module.css";

const Diary = ({ book, onSessionDeleted, isReading }) => {
  const progressList = book?.progress || [];

  const completedProgress = progressList.filter(
    (item) =>
      item.finishPage || item.finishReading || item.status === "inactive",
  );

  const calculateMinutes = (start, finish) => {
    if (!start || !finish) return 1;
    const startTime = new Date(start).getTime();
    const finishTime = new Date(finish).getTime();
    const diffMs = finishTime - startTime;
    return Math.max(1, Math.round(diffMs / (1000 * 60)));
  };

  const handleDelete = async (item) => {
    if (isReading) {
      toast.error(
        "Cannot delete a reading session while active reading is in progress. Please stop reading first!",
      );
      return;
    }

    const readingId = item._id || item.id;

    if (!readingId) {
      toast.error("Session ID is missing!");
      return;
    }

    try {
      await deleteReadingSession({ bookId: book._id, readingId });
      toast.success("Reading session deleted");
      onSessionDeleted?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete reading session",
      );
    }
  };

  if (completedProgress.length === 0) {
    return (
      <p className={styles.emptyText}>
        No completed reading sessions yet. Click "To start" and then "To stop"
        to record your progress.
      </p>
    );
  }

  const sortedProgress = [...completedProgress].reverse();

  return (
    <div className={styles.timelineWrapper}>
      <ul className={styles.list}>
        {sortedProgress.map((item, index) => {
          const isLatest = index === 0;

          const pagesRead = item.finishPage
            ? item.finishPage - item.startPage + 1
            : 0;

          const percentage = book?.totalPages
            ? ((item.finishPage / book.totalPages) * 100).toFixed(1)
            : "0.0";

          const durationMinutes =
            item.minutes ||
            calculateMinutes(item.startReading, item.finishReading);

          return (
            <li
              key={item._id || item.id || index}
              className={`${styles.item} ${
                isLatest ? styles.latestItem : styles.oldItem
              }`}
            >
              <svg className={styles.squareIcon} viewBox="0 0 16 16">
                <use
                  href={`/sprite.svg#${
                    isLatest ? "icon-lastVersion" : "icon-previosVersion"
                  }`}
                />
              </svg>

              <div className={styles.itemHeader}>
                <div className={styles.dateBlock}>
                  <span
                    className={`${styles.date} ${
                      isLatest ? styles.whiteText : styles.grayText
                    }`}
                  >
                    {new Date(
                      item.finishReading || item.startReading,
                    ).toLocaleDateString("uk-UA")}
                  </span>
                </div>

                <span className={styles.pagesCount}>{pagesRead} pages</span>
              </div>

              <div className={styles.itemBody}>
                <div className={styles.metrics}>
                  <span
                    className={`${styles.percentage} ${
                      isLatest ? styles.whiteText : styles.grayText
                    }`}
                  >
                    {percentage}%
                  </span>
                  <span className={styles.time}>{durationMinutes} minutes</span>
                </div>

                <div className={styles.rightSection}>
                  <div className={styles.speedColumn}>
                    <svg className={styles.speedGraphIcon}>
                      <use href="/sprite.svg#icon-speed" />
                    </svg>

                    <div className={styles.speedText}>
                      <span className={styles.speedValue}>
                        {item.speed || 0} pages
                      </span>
                      <span className={styles.speedLabel}>per hour</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(item)}
                    aria-label="Delete session"
                  >
                    <svg className={styles.trashIcon} width="14" height="14">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Diary;
