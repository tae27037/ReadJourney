// src/pages/RecommendedPage/RecommendedPage.jsx

import { useEffect, useState } from "react";
import { getOwnBooks } from "../../services/bookApi";
import Dashboard from "../../components/Dashboard/Dashboard";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";
import Filters from "../../components/Filters/Filters";
import BookAddedModal from "../../components/BookAddedModal/BookAddedModal";

import styles from "./RecommendedPage.module.css";

const RecommendedPage = () => {
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [page, setPage] = useState(1);
  const [userBooks, setUserBooks] = useState([]); // <--- Стейт личных книг
  const [isBookAddedModalOpen, setIsBookAddedModalOpen] = useState(false);

  // Загружаем книги пользователя для проверки дубликатов
  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const data = await getOwnBooks();
        setUserBooks(data);
      } catch (error) {
        console.error("Failed to fetch user books:", error);
      }
    };
    fetchUserBooks();
  }, []);

  const handleFilterSubmit = (data) => {
    setFilters(data);
    setPage(1);
  };

  const handleBookAdded = async () => {
    // Обновляем список книг пользователя после успешного добавления
    try {
      const data = await getOwnBooks();
      setUserBooks(data);
    } catch (error) {
      console.error(error);
    }

    setIsBookAddedModalOpen(true); // Открываем модалку "Good job" 👍
  };

  return (
    <section className={styles.page}>
      <Dashboard>
        <Filters
          onSubmit={handleFilterSubmit}
          showPages={false}
          showApplyButton={true}
        />
      </Dashboard>

      <RecommendedBooks
        filters={filters}
        page={page}
        setPage={setPage}
        userBooks={userBooks} // <--- ПЕРЕДАЕМ КНИГИ В RECOMMENDED BOOKS
        onBookAdded={handleBookAdded}
      />

      <BookAddedModal
        isOpen={isBookAddedModalOpen}
        onClose={() => setIsBookAddedModalOpen(false)}
      />
    </section>
  );
};

export default RecommendedPage;
