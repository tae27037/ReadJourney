import { useForm } from "react-hook-form";
import styles from "./Filters.module.css";

const Filters = ({
  onSubmit,
  showPages = false,
  showAddButton = false,
  showApplyButton = true,
  onAddBook,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      author: "",
      pages: "",
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.f}>Filters:</p>
      <label className={styles.label}>
        <span className={styles.labelText}>Book title:</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter text"
          {...register("title")}
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>The author:</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter text"
          {...register("author")}
        />
      </label>

      {showPages && (
        <label className={styles.label}>
          <span className={styles.labelText}>Number of pages:</span>
          <input
            className={styles.input}
            type="number"
            placeholder="Enter number"
            {...register("pages")}
          />
        </label>
      )}

      <div className={styles.buttons}>
        {showApplyButton && (
          <button className={styles.button} type="submit">
            To apply
          </button>
        )}

        {showAddButton && (
          <button
            className={styles.addButton}
            type="button"
            onClick={onAddBook}
          >
            Add book
          </button>
        )}
      </div>
    </form>
  );
};

export default Filters;
