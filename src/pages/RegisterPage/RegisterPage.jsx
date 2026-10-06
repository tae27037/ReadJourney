import { Link } from "react-router-dom"; // 1. Импортируем Link
import RegisterForm from "../../components/AuthModal/RegisterForm";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.firstCard}>
        {/* 2. Логотип с иконкой и текстом READ JOURNEY */}
        <Link to="/" className={styles.logo}>
          <svg
            className={styles.logoIcon}
            width="42"
            height="17"
            aria-hidden="true"
          >
            <use href="/public/img/logo.svg" />
          </svg>
          <span className={styles.logoText}>READ JOURNEY</span>
        </Link>

        {/* 3. Заголовок и форма на уровне firstCard */}
        <h1 className={styles.title}>
          Expand your mind, reading{" "}
          <span className={styles.titleMuted}>a book</span>
        </h1>

        <RegisterForm />
      </div>

      <div className={styles.secondCard}>
        <div className={styles.phoneMockup}>
          <img
            className={styles.phoneImage}
            src="/img/iPhone.svg" /* Убрали /public */
            alt="Read Journey app preview"
          />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
