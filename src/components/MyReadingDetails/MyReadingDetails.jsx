// src/components/MyReadingDetails/MyReadingDetails.jsx

import styles from "./MyReadingDetails.module.css";

// Вспомогательная функция для форматирования заголовка
const toTitleCase = (str) =>
  str
    ? str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    : "";

const MyReadingDetails = ({ book, isReading, onStopReading }) => {
  // Функция для расчета оставшегося времени чтения
  const calculateTimeLeft = () => {
    const progressList = book?.progress || [];

    // Берем только завершенные сессии с известной скоростью
    const completedSessions = progressList.filter(
      (item) => item.finishPage && item.speed,
    );

    if (completedSessions.length === 0) return null;

    // Последняя прочитанная страница
    const lastSession = [...completedSessions].pop();
    const totalReadPages = lastSession?.finishPage || 0;
    const unreadPages = Math.max(0, (book?.totalPages || 0) - totalReadPages);

    if (unreadPages === 0) return "Book completed!";

    // Средняя скорость чтения (страниц в час)
    const totalSpeed = completedSessions.reduce(
      (acc, item) => acc + item.speed,
      0,
    );
    const avgSpeed = totalSpeed / completedSessions.length;

    if (!avgSpeed) return null;

    // Время в минутах
    const totalMinutesLeft = Math.round((unreadPages / avgSpeed) * 60);
    const hours = Math.floor(totalMinutesLeft / 60);
    const minutes = totalMinutesLeft % 60;

    if (hours === 0) {
      return `${minutes} minutes left`;
    }

    return `${hours} hours and ${minutes} minutes left`;
  };

  const timeLeftText = calculateTimeLeft();

  return (
    <div className={styles.container}>
      {/* Шапка блока с названием и оставшимся временем */}
      <div className={styles.header}>
        <h2 className={styles.title}>My reading</h2>
        {timeLeftText && (
          <span className={styles.timeLeftText}>{timeLeftText}</span>
        )}
      </div>

      <div className={styles.bookCard}>
        <div className={styles.imageWrapper}>
          <img
            src={book?.imageUrl}
            alt={book?.title}
            className={styles.cover}
          />
        </div>

        {/* Применяем функцию форматирования */}
        <h3 className={styles.bookTitle}>{toTitleCase(book?.title)}</h3>
        <p className={styles.author}>{book?.author}</p>
      </div>

      <div className={styles.actionBlock}>
        <button
          type="button"
          className={styles.stopButton}
          aria-label={isReading ? "Stop reading" : "Start reading"}
          onClick={onStopReading}
        >
          <svg className={styles.redCircleIcon} width="50" height="50">
            <use
              href={`/sprite.svg#${isReading ? "icon-stop" : "icon-start"}`}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MyReadingDetails;
