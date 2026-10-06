import styles from "./ReadingProgress.module.css";

const ReadingProgress = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Progress</h3>
      <p className={styles.text}>
        <span style={{ whiteSpace: "nowrap" }}>
          Here you will see when and how much you read.
        </span>{" "}
        To record, click on the red button above.
      </p>

      <div className={styles.starCircle}>
        <span className={styles.starIcon} role="img" aria-label="star">
          🌟
        </span>
      </div>
    </div>
  );
};

export default ReadingProgress;
