import { useEffect, useState } from "react";
import { getRecommendedBooks, addBookToLibrary } from "../../services/bookApi";
import BookModal from "../BookModal/BookModal";
import styles from "./RecommendedBooks.module.css";

const getBooksPerPage = () => {
  const width = window.innerWidth;

  if (width >= 1440) {
    return 10;
  }

  if (width >= 768) {
    return 8;
  }

  return 2;
};

const toTitleCase = (str) =>
  str
    ? str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    : "";

const RecommendedBooks = ({
  filters,
  page,
  setPage,
  userBooks = [],
  onBookAdded,
}) => {
  const [books, setBooks] = useState([]);
  const [perPage, setPerPage] = useState(getBooksPerPage);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleModalClose = () => {
    setSelectedBook(null);
  };

  const handleAddToLibrary = async (bookId) => {
    try {
      await addBookToLibrary(bookId);
      setSelectedBook(null);

      if (typeof onBookAdded === "function") {
        onBookAdded();
      }
    } catch (error) {
      console.error("Failed to add book to library:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getBooksPerPage();

      setPerPage((currentPerPage) => {
        if (currentPerPage !== newPerPage) {
          setPage(1);
          return newPerPage;
        }

        return currentPerPage;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setPage]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const currentPerPage = getBooksPerPage();

        const data = await getRecommendedBooks({
          page,
          perPage: currentPerPage,
          title: filters?.title,
          author: filters?.author,
        });

        setBooks(data.results || []);

        const calculatedTotalPages =
          data.totalPages ||
          Math.ceil((data.total || data.results?.length || 0) / currentPerPage);

        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
        setError("Failed to load recommended books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [page, perPage, filters]);
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>Recommended</h1>

        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            type="button"
            onClick={handlePrevPage}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <svg className={styles.arrow}>
              <use href="/sprite.svg#icon-arrow" />
            </svg>
          </button>

          <span className={styles.page}>
            {page} / {totalPages}
          </span>

          <button
            className={styles.paginationButton}
            type="button"
            onClick={handleNextPage}
            disabled={page === totalPages || totalPages === 0}
            aria-label="Next page"
          >
            <svg className={`${styles.arrow} ${styles.arrowRight}`}>
              <use href="/sprite.svg#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {books.map((book) => (
          <li className={styles.item} key={book._id}>
            <button
              className={styles.bookButton}
              type="button"
              onClick={() => handleBookClick(book)}
            >
              <img
                className={styles.image}
                src={book.imageUrl}
                alt={book.title}
                loading="lazy"
              />
            </button>

            <h2 className={styles.bookTitle}>{toTitleCase(book.title)}</h2>

            <p className={styles.author}>{book.author}</p>
          </li>
        ))}
      </ul>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleModalClose}
          userBooks={userBooks}
          onAddToLibrary={handleAddToLibrary}
        />
      )}
    </section>
  );
};

export default RecommendedBooks;
