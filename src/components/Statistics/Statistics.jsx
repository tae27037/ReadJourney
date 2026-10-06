// src/components/Statistics/Statistics.jsx

import styles from "./Statistics.module.css";

const Statistics = ({ book }) => {
  const progressList = book?.progress || [];

  const lastFinishedSession = [...progressList]
    .reverse()
    .find((item) => item.finishPage);

  const totalReadPages = lastFinishedSession?.finishPage || 0;
  const totalPages = book?.totalPages || 1;

  const percentage = Math.min(
    100,
    Number(((totalReadPages / totalPages) * 100).toFixed(2)),
  );

  // Подкорректированный радиус под тонкую обводку
  const radius = 53;
  const circumference = 2 * Math.PI * radius; // ≈ 314.16
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <div className={styles.pieChartContainer}>
          <svg className={styles.statisticsIcon} width="116" height="116">
            <use href="/sprite.svg#icon-statistics" />
          </svg>

          <svg
            className={styles.progressOverlay}
            // width="116"
            // height="116"
            // viewBox="0 0 116 116"
          >
            <circle
              className={styles.progressCircle}
              cx="58"
              cy="58"
              r={radius}
              strokeLinecap="round" /* или "butt" если края вылезают */
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          <div className={styles.innerCircle}>
            <span className={styles.percentageText}>100%</span>
          </div>
        </div>
      </div>

      <div className={styles.infoBlock}>
        <span className={styles.greenSquare} />
        <div className={styles.textGroup}>
          <p className={styles.pagesText}>{percentage}%</p>
          <p className={styles.subPagesText}>{totalReadPages} pages read</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
