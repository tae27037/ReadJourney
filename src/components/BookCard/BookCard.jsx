// import styles from "./BookCard.module.css";

// const toTitleCase = (str) =>
//   str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

// const BookCard = ({ book, onClick }) => {
//   return (
//     <li className={styles.item}>
//       <button className={styles.bookButton} type="button" onClick={onClick}>
//         <img
//           className={styles.image}
//           src={book.imageUrl}
//           alt={book.title}
//           loading="lazy"
//         />
//       </button>

//       <h3 className={styles.bookTitle}>{toTitleCase(book.title)}</h3>
//       <p className={styles.author}>{book.author}</p>
//     </li>
//   );
// };

// export default BookCard;

import styles from "./BookCard.module.css";

const formatTitle = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BookCard = ({ book, onClick, onDelete }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={book.imageUrl} alt={book.title} className={styles.cover} />
      <div className={styles.infoWrapper}>
        <div className={styles.textGroup}>
          <h3 className={styles.title}>{formatTitle(book.title)}</h3>
          <p className={styles.author}>{book.author}</p>
        </div>

        {onDelete && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
            }}
            aria-label="Delete book"
          >
            <svg className={styles.trashIcon} width="28" height="28">
              <use href="/sprite.svg#icon-delete" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
