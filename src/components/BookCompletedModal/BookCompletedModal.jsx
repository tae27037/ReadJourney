import { useEffect } from "react";
import styles from "./BookCompletedModal.module.css";

const BookCompletedModal = ({ isOpen, onClose }) => {
  // Закрытие по клавише ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Блокируем скролл фона
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className={styles.closeIcon} width="20" height="20">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        {/* Иконка стопки книг */}
        <div className={styles.thumbWrapper}>
          <span className={styles.bookEmoji} role="img" aria-label="Books">
            📚
          </span>
        </div>

        <h3 className={styles.title}>The book is read</h3>

        <p className={styles.description}>
          It was an <span className={styles.highlight}>exciting journey</span>,
          where each page revealed new horizons, and the characters became
          inseparable friends.
        </p>
      </div>
    </div>
  );
};

export default BookCompletedModal;
