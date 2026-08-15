import { useEffect, useState } from "react";
import { getRecommendedBooks } from "../../services/bookApi";
import styles from "./RecommendedBooks.module.css";

const RecommendedBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getRecommendedBooks({
          page,
          perPage: 2,
        });

        setBooks(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
        setError("Failed to load recommended books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
            disabled={page === totalPages}
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
            <button className={styles.bookButton} type="button">
              <img
                className={styles.image}
                src={book.imageUrl}
                alt={book.title}
                loading="lazy"
              />
            </button>

            <h2 className={styles.bookTitle}>{book.title}</h2>

            <p className={styles.author}>{book.author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecommendedBooks;
