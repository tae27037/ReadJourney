// src/pages/LibraryPage/LibraryPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getOwnBooks,
  getRecommendedBooks,
  addOwnBook,
  addBookToLibrary,
  deleteOwnBook,
} from "../../services/bookApi";

import Dashboard from "../../components/Dashboard/Dashboard";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import BookCard from "../../components/BookCard/BookCard";
import BookModal from "../../components/BookModal/BookModal";
import BookAddedModal from "../../components/BookAddedModal/BookAddedModal";

import styles from "./LibraryPage.module.css";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Управление карточной модалкой (BookModal)
  const [selectedBook, setSelectedBook] = useState(null);
  const [isOwnBookModal, setIsOwnBookModal] = useState(false);

  // Управление модалкой «Good job»
  const [isBookAddedModalOpen, setIsBookAddedModalOpen] = useState(false);

  // 1. Эффект для загрузки личных книг при монтировании
  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getOwnBooks();
        if (isMounted) setBooks(data);
      } catch (err) {
        console.error("Failed to fetch library books:", err);
        if (isMounted) setError("Failed to load your library");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Эффект для подгрузки рекомендованных книг
  useEffect(() => {
    let isMounted = true;

    const fetchRecommended = async () => {
      try {
        const data = await getRecommendedBooks({ page: 1, perPage: 3 });
        if (isMounted) {
          setRecommended(data.results ? data.results.slice(0, 3) : []);
        }
      } catch (err) {
        console.error("Failed to fetch recommended books:", err);
      }
    };

    fetchRecommended();

    return () => {
      isMounted = false;
    };
  }, []);

  // Ручной перезапрос книг для хэндлеров (добавление/удаление)
  const refreshBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getOwnBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch library books:", err);
      setError("Failed to load your library");
    } finally {
      setIsLoading(false);
    }
  };

  // Добавление книги через форму
  const handleAddBook = async (formData) => {
    // Проверяем, есть ли книга уже в библиотеке
    const isAlreadyInLibrary = books.some(
      (b) =>
        b.title?.trim().toLowerCase() ===
          formData.title?.trim().toLowerCase() &&
        b.author?.trim().toLowerCase() ===
          formData.author?.trim().toLowerCase(),
    );

    // Если книга уже есть — не делаем запрос на сервер, но всё равно открываем BookAddedModal!
    if (isAlreadyInLibrary) {
      setIsBookAddedModalOpen(true);
      return;
    }

    try {
      await addOwnBook(formData);
      await refreshBooks();
      setIsBookAddedModalOpen(true);
    } catch (err) {
      // Если бэкенд всё равно вернул 409 (уже есть), просто показываем модалку успеха
      if (err.response?.status === 409) {
        setIsBookAddedModalOpen(true);
      } else {
        alert(
          "Error adding book: " + (err.response?.data?.message || err.message),
        );
      }
    }
  };

  // Добавление рекомендованной книги по ID через модалку
  const handleAddRecommendedToLibrary = async (bookId) => {
    const isAlreadyInLibrary = books.some(
      (b) =>
        b._id === bookId ||
        (selectedBook &&
          b.title?.trim().toLowerCase() ===
            selectedBook.title?.trim().toLowerCase() &&
          b.author?.trim().toLowerCase() ===
            selectedBook.author?.trim().toLowerCase()),
    );

    // Если уже добавлена — закрываем карточку детализации и всё равно открываем BookAddedModal!
    if (isAlreadyInLibrary) {
      setSelectedBook(null);
      setIsBookAddedModalOpen(true);
      return;
    }

    try {
      await addBookToLibrary(bookId);
      setSelectedBook(null);
      await refreshBooks();
      setIsBookAddedModalOpen(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setSelectedBook(null);
        setIsBookAddedModalOpen(true);
      } else {
        console.error("Failed to add recommended book:", err);
        alert("Failed to add book to library");
      }
    }
  };

  // Удаление книги из библиотеки
  const handleDeleteBook = async (bookId) => {
    try {
      await deleteOwnBook(bookId);
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Failed to delete book");
    }
  };

  // Клик по рекомендованной книге
  const handleRecommendedClick = (book) => {
    setSelectedBook(book);
    setIsOwnBookModal(false);
  };

  // Клик по своей книге из библиотеки
  const handleOwnBookClick = (book) => {
    setSelectedBook(book);
    setIsOwnBookModal(true);
  };

  const filteredBooks = books.filter((book) => {
    if (statusFilter === "all") return true;
    return book.status === statusFilter;
  });

  return (
    <div className={styles.page}>
      {/* Левая панель - Dashboard */}
      <Dashboard showWorkout={false}>
        <AddBookForm onAddBook={handleAddBook} />

        <div className={styles.recommendedBlock}>
          <h2 className={styles.title}>Recommended books</h2>

          <ul className={styles.recommendedList}>
            {recommended.map((book) => (
              <li key={book._id} className={styles.recommendedItem}>
                <BookCard
                  book={book}
                  onClick={() => handleRecommendedClick(book)}
                />
              </li>
            ))}
          </ul>

          <Link className={styles.homeLink} to="/recommended">
            Home{" "}
            <span aria-hidden="true">
              <svg
                className={styles.logInIcon}
                width="24"
                height="24"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-log-in" />
              </svg>
            </span>
          </Link>
        </div>
      </Dashboard>

      {/* Правая панель - MyLibraryBooks */}
      <div className={styles.libraryContainer}>
        <MyLibraryBooks
          books={filteredBooks}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
          onDeleteBook={handleDeleteBook}
          onBookClick={handleOwnBookClick}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {/* Модальное окно деталей книги */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOwnBook={isOwnBookModal}
          userBooks={books}
          onClose={() => setSelectedBook(null)}
          onAddToLibrary={handleAddRecommendedToLibrary}
        />
      )}

      {/* Модальное окно «Good job» 👍 */}
      <BookAddedModal
        isOpen={isBookAddedModalOpen}
        onClose={() => setIsBookAddedModalOpen(false)}
      />
    </div>
  );
};

export default LibraryPage;
