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
  const [userBooks, setUserBooks] = useState([]);
  const [isBookAddedModalOpen, setIsBookAddedModalOpen] = useState(false);

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
    try {
      const data = await getOwnBooks();
      setUserBooks(data);
    } catch (error) {
      console.error(error);
    }

    setIsBookAddedModalOpen(true);
  };

  return (
    <section className={styles.page}>
      <Dashboard showWorkout={true} showQuote={true}>
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
        userBooks={userBooks}
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
