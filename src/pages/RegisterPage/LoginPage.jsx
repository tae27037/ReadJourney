import { Link } from "react-router-dom";
import LoginForm from "../../components/AuthModal/LoginForm";
import styles from "./RegisterPage.module.css";

const LoginPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.firstCard}>
        <Link to="/" className={styles.logo}>
          <svg
            className={styles.logoIcon}
            width="42"
            height="17"
            aria-hidden="true"
          >
            <use href="/img/logo.svg" />
          </svg>
          <span className={styles.logoText}>READ JOURNEY</span>{" "}
        </Link>

        <h1 className={styles.title}>
          Expand your mind, reading{" "}
          <span className={styles.titleMuted}>a book</span>
        </h1>

        <LoginForm />
      </div>

      <div className={styles.secondCard}>
        <div className={styles.phoneMockup}>
          <img
            className={styles.phoneImage}
            src="/img/iPhone-desktop.svg"
            alt="Read Journey app preview"
          />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
