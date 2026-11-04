import { useState } from "react";
import toast from "react-hot-toast";
import { startReading, stopReading } from "../../services/bookApi";
import css from "./StartReadingForm.module.css";

const StartReadingForm = ({
  book,
  isReading,
  setIsReading,
  onBookFinished,
  onUpdateBook,
}) => {
  const [page, setPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pageNum = Number(page);

    if (!pageNum || pageNum <= 0) {
      toast.error("Please enter a valid page number");
      return;
    }

    if (pageNum > book.totalPages) {
      toast.error(`Cannot exceed total pages (${book.totalPages})`);
      return;
    }

    setIsLoading(true);

    try {
      if (!isReading) {
        const updatedBook = await startReading({ id: book._id, page: pageNum });
        toast.success("Reading started!");
        setIsReading(true);
        onUpdateBook?.(updatedBook);
      } else {
        const updatedBook = await stopReading({ id: book._id, page: pageNum });
        toast.success("Reading stopped!");
        setIsReading(false);
        onUpdateBook?.(updatedBook);

        if (pageNum === book.totalPages) {
          onBookFinished?.();
        }
      }

      setPage("");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Status conflict with server. Syncing...");
        setIsReading(!isReading);
        onUpdateBook?.();
      } else {
        toast.error(
          error.response?.data?.message || "Failed to process request",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={css.form || "form"} onSubmit={handleSubmit}>
      <p className={css.title || "title"}>
        {isReading ? "Stop page:" : "Start page:"}
      </p>

      <div className={css.inputWrapper || "inputWrapper"}>
        <span className={css.label || "label"}>Page number:</span>
        <input
          id="page"
          type="number"
          className={css.input || "input"}
          value={page}
          onChange={(e) => setPage(e.target.value)}
          placeholder="0"
          min="1"
          max={book?.totalPages}
          required
        />
      </div>

      <button
        type="submit"
        className={css.button || "button"}
        disabled={isLoading}
      >
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  );
};

export default StartReadingForm;
