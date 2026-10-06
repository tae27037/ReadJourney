import { useState } from "react";
import styles from "./AddBookForm.module.css";

const AddBookForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    totalPages: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Делаем обработчик асинхронным
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация полей
    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.totalPages
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (Number(formData.totalPages) <= 0) {
      alert("Page count must be greater than 0");
      return;
    }

    try {
      // 2. Ждем, пока книга реально добавится на сервер через API
      await onAddBook({
        title: formData.title,
        author: formData.author,
        totalPages: Number(formData.totalPages),
      });

      // 3. Очищаем форму ТОЛЬКО после успешного добавления
      setFormData({ title: "", author: "", totalPages: "" });
    } catch (error) {
      console.error("Error inside form submit:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.label}>Filters:</p>

      <div className={styles.inputGroup}>
        <label className={styles.inputWrapper}>
          <span className={styles.inputTitle}>Book title:</span>
          <input
            type="text"
            name="title"
            placeholder="Enter text"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.inputWrapper}>
          <span className={styles.inputTitle}>The author:</span>
          <input
            type="text"
            name="author"
            placeholder="Enter text"
            value={formData.author}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.inputWrapper}>
          <span className={styles.inputTitle}>Number of pages:</span>
          <input
            type="number"
            name="totalPages"
            placeholder="0"
            value={formData.totalPages}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Add book
      </button>
    </form>
  );
};

export default AddBookForm;
