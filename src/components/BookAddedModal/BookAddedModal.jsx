// src/components/BookAddedModal/BookAddedModal.jsx

import { useEffect } from "react";
import styles from "./BookAddedModal.module.css";

const BookAddedModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
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

        {/* Смайлик палець вгору */}
        <div className={styles.thumbWrapper}>
          <span className={styles.emoji} role="img" aria-label="Thumbs up">
            👍
          </span>
        </div>

        <h3 className={styles.title}>Good job</h3>

        <p className={styles.description}>
          Your book is now in{" "}
          <span className={styles.highlight}>the library!</span> The joy knows
          no bounds and now you can start your training
        </p>
      </div>
    </div>
  );
};

export default BookAddedModal;
