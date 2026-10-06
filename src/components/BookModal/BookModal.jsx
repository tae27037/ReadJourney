// src/components/BookModal/BookModal.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookModal.module.css";

const toTitleCase = (str) =>
  str
    ? str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    : "";

const BookModal = ({ book, onClose, onAddToLibrary, isOwnBook = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleStartReading = () => {
    onClose();
    navigate(`/reading/${book._id}`);
  };

  const handleAddClick = async () => {
    // Закрываем модалку деталей и вызываем обработчик добавления
    onClose();
    if (typeof onAddToLibrary === "function") {
      await onAddToLibrary(book._id);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className={styles.closeIcon} width="16" height="16">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <img className={styles.image} src={book.imageUrl} alt={book.title} />
        <h3 className={styles.title}>{toTitleCase(book.title)}</h3>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.pages}>{book.totalPages} pages</p>

        {isOwnBook ? (
          <button
            className={styles.addButton}
            type="button"
            onClick={handleStartReading}
          >
            Start reading
          </button>
        ) : (
          <button
            className={styles.addButton}
            type="button"
            onClick={handleAddClick}
          >
            Add to library
          </button>
        )}
      </div>
    </div>
  );
};

export default BookModal;
