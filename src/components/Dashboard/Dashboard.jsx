import styles from "./Dashboard.module.css";

const Dashboard = ({ children, showWorkout = true }) => {
  return (
    <section className={styles.dashboard}>
      {children}

      {showWorkout && (
        <div className={styles.workout}>
          <div className={styles.text}>
            <h2 className={styles.title}>Start your workout</h2>

            <div className={styles.step}>
              <div className={styles.stepIconWrapper}>
                <svg
                  className={styles.stepIcon}
                  width="44"
                  height="44"
                  aria-hidden="true"
                >
                  <use href="/public/sprite.svg#icon-ellipse" />
                </svg>
                <span className={styles.stepNumber}>1</span>
              </div>

              <p className={styles.subTitle}>
                Create a personal library:{" "}
                <span className={styles.marker}>
                  add the books you intend to read to{"\u00A0"}it.
                </span>
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIconWrapper}>
                <svg
                  className={styles.stepIcon}
                  width="44"
                  height="44"
                  aria-hidden="true"
                >
                  <use href="/public/sprite.svg#icon-ellipse" />
                </svg>
                <span className={styles.stepNumber}>2</span>
              </div>

              <p className={styles.subTitle}>
                Create your first workout:{" "}
                <span className={styles.marker}>
                  define a goal, choose a period, start training.
                </span>
              </p>
            </div>

            <a href="/library" className={styles.libraryLink}>
              My library
              <svg
                className={styles.logInIcon}
                width="24"
                height="24"
                aria-hidden="true"
              >
                <use href="/public/sprite.svg#icon-log-in" />
              </svg>
            </a>
          </div>
        </div>
      )}
      <div className={styles.desktopText}>
        <span className={styles.bookEmoji} role="img" aria-label="Books">
          📚
        </span>

        <p className={styles.citate}>
          "Books are windows to the world, and reading is a jorney into the
          unknown."
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
