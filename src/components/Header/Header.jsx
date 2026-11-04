import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../services/authApi";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink
          className={styles.logo}
          to="/recommended"
          aria-label="Read Journey"
        >
          <svg
            className={styles.logoIcon}
            width="42"
            height="17"
            aria-hidden="true"
          >
            <use href="/img/logo.svg" />
          </svg>
          <span className={styles.logoText}>READ JOURNEY</span>
        </NavLink>

        <nav className={styles.navigation}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/recommended"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="/library"
          >
            My library
          </NavLink>
        </nav>

        <div className={styles.user}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <svg className={styles.avatarIcon} aria-hidden="true">
                <use href="/sprite.svg#icon-avatar" />
              </svg>

              <span className={styles.avatarLetter}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>

            <span className={styles.userName}>{user?.name || "User"}</span>
          </div>

          <button
            className={styles.menu}
            type="button"
            onClick={handleMenuToggle}
            aria-label="Open menu"
          >
            <svg className={styles.menuIcon} aria-hidden="true">
              <use href="/sprite.svg#icon-menu" />
            </svg>
          </button>

          <button
            className={styles.logoutButton}
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={handleMenuClose}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              type="button"
              onClick={handleMenuClose}
              aria-label="Close menu"
            >
              <svg className={styles.closeIcon} aria-hidden="true">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>

            <nav className={styles.drawerNavigation}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.drawerLink} ${styles.drawerActive}`
                    : styles.drawerLink
                }
                to="/recommended"
                onClick={handleMenuClose}
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.drawerLink} ${styles.drawerActive}`
                    : styles.drawerLink
                }
                to="/library"
                onClick={handleMenuClose}
              >
                My library
              </NavLink>
            </nav>

            <button
              className={styles.drawerLogoutButton}
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
