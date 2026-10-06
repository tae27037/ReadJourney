import { useEffect } from "react";
import styles from "./SuccessModal.module.css"; // или используй стили из BookModal

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" aria-hidden="true">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <div className={styles.iconWrapper}>👍</div>
        <h3 className={styles.title}>Good job</h3>
        <p className={styles.text}>
          Your book is now in <span className={styles.muted}>the library!</span>{" "}
          The first step toward your goal is made.
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
