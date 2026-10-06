// src/pages/ReadingPage/ReadingPage.jsx

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модалки

  // Проверка, завершено ли чтение книги полностью
  const checkIfBookIsCompleted = (bookData) => {
    if (!bookData) return false;

    const progressList = bookData?.progress || [];
    const totalPages = bookData?.totalPages || 0;

    // Находим последнюю сессию с finishPage
    const lastFinishedSession = [...progressList]
      .reverse()
      .find((item) => item.finishPage);

    const lastPage = lastFinishedSession?.finishPage || 0;

    // Книга считается прочитанной, если статус "done" или последняя страница равна/превышает totalPages
    return (
      bookData.status === "done" || (totalPages > 0 && lastPage >= totalPages)
    );
  };

  // Функция синхронизации статуса чтения с бэкендом
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

  // Обновление состояния книги после действий (To start / To stop / Delete session)
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

      // Проверяем: если книга только что была дочитана, открываем модалку!
      if (checkIfBookIsCompleted(currentBookData)) {
        setIsModalOpen(true);
      }
    }
  };

  // Клик по красной кнопке в блоке MyReadingDetails
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

  // Проверяем, есть ли хотя бы одна запись чтения
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

        {/* 1. Если записей НЕТ — показывем Progress со звездочкой */}
        {!hasProgress && <ReadingProgress />}

        {/* 2. Если записи ЕСТЬ — показываем в Dashboard блок Details (Diary & Statistics) */}
        {hasProgress && (
          <Details
            book={book}
            isReading={isReading}
            onRefreshBook={handleUpdateBook}
          />
        )}
      </Dashboard>

      <div className={styles.detailsContainer}>
        {/* Карточка книги с красной кнопкой */}
        <MyReadingDetails
          book={book}
          isReading={isReading}
          onStopReading={handleRedButtonClick}
        />
      </div>

      {/* Модальное окно завершения чтения */}
      <BookCompletedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ReadingPage;
