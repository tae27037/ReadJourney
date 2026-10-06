import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

const options = [
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "all", label: "All books" },
];

const CustomSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[3];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOption.label}</span>
        <svg
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
          width="16"
          height="16"
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-chevron" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.optionItem} ${
                value === option.value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
