import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Dashboard from "../../components/Dashboard/Dashboard";
import StartReadingForm from "../../components/StartReadingForm/StartReadingForm";
import ReadingProgress from "../../components/ReadingProgress/ReadingProgress";
import Details from "../../components/Details/Details";
import MyReadingDetails from "../../components/MyReadingDetails/MyReadingDetails";
import BookCompletedModal from "../../components/BookCompletedModal/BookCompletedModal";
import { getBookById } from "../../services/bookApi";
import styles from "./ReadingPage.module.css";

const ReadingPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkIfBookIsCompleted = (bookData) => {
    if (!bookData) return false;

    const progressList = bookData?.progress || [];
    const totalPages = bookData?.totalPages || 0;

    const lastFinishedSession = [...progressList]
      .reverse()
      .find((item) => item.finishPage);

    const lastPage = lastFinishedSession?.finishPage || 0;

    return (
      bookData.status === "done" || (totalPages > 0 && lastPage >= totalPages)
    );
  };

  const checkIsReadingStatus = (bookData) => {
    if (bookData?.progress && bookData.progress.length > 0) {
      const lastSession = bookData.progress[bookData.progress.length - 1];
      const isActive =
        lastSession.status === "active" ||
        (!lastSession.finishPage && lastSession.status !== "inactive");
      setIsReading(isActive);
    } else {
      setIsReading(bookData?.status === "in-progress");
    }
  };

  useEffect(() => {
    if (!bookId) return;

    let isMounted = true;

    const loadBookData = async () => {
      try {
        const data = await getBookById(bookId);
        if (isMounted) {
          setBook(data);
          checkIsReadingStatus(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book details");
      }
    };

    loadBookData();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  const handleUpdateBook = async (updatedData) => {
    let currentBookData = updatedData;

    if (!currentBookData || !currentBookData._id) {
      if (bookId) {
        try {
          currentBookData = await getBookById(bookId);
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (currentBookData) {
      setBook(currentBookData);
      checkIsReadingStatus(currentBookData);

      if (checkIfBookIsCompleted(currentBookData)) {
        setIsModalOpen(true);
      }
    }
  };

  const handleRedButtonClick = () => {
    const pageInput = document.getElementById("page");
    if (!pageInput || !pageInput.value) {
      toast.error("Please enter a page number in the form on the left first!");
      pageInput?.focus();
      return;
    }

    const form = pageInput.closest("form");
    if (form) {
      form.requestSubmit();
    }
  };

  if (!book) return null;

  const hasProgress = book?.progress && book.progress.length > 0;

  return (
    <div className={styles.page}>
      <Dashboard showWorkout={false}>
        <StartReadingForm
          book={book}
          isReading={isReading}
          setIsReading={setIsReading}
          onUpdateBook={handleUpdateBook}
        />

        {!hasProgress && <ReadingProgress />}

        {hasProgress && (
          <Details
            book={book}
            isReading={isReading}
            onRefreshBook={handleUpdateBook}
          />
        )}
      </Dashboard>

      <div className={styles.detailsContainer}>
        <MyReadingDetails
          book={book}
          isReading={isReading}
          onStopReading={handleRedButtonClick}
        />
      </div>

      <BookCompletedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ReadingPage;
