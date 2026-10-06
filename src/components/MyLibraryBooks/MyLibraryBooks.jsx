import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import BookCard from "../BookCard/BookCard";
import BookModal from "../BookModal/BookModal";
import styles from "./MyLibraryBooks.module.css";

const MyLibraryBooks = ({
  books,
  statusFilter,
  onFilterChange,
  onDeleteBook,
  isLoading,
  error,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const showEmptyState = !isLoading && (error || books.length === 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My library</h2>
        <CustomSelect value={statusFilter} onChange={onFilterChange} />
      </div>

      {isLoading && <p className={styles.message}>Loading...</p>}

      {showEmptyState && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <span className={styles.booksEmoji} role="img" aria-label="books">
              📚
            </span>
          </div>
          <p className={styles.emptyText}>
            To start training, add{" "}
            <span className={styles.emptyMuted}>some of your books</span> or
            from the recommended ones
          </p>
        </div>
      )}

      {!isLoading && !error && books.length > 0 && (
        <ul className={styles.grid}>
          {books.map((book) => (
            <li key={book._id} className={styles.cardItem}>
              <BookCard
                book={book}
                onClick={() => setSelectedBook(book)}
                onDelete={onDeleteBook}
              />
            </li>
          ))}
        </ul>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOwnBook={true}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default MyLibraryBooks;
