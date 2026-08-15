import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/auth/authSlice";
import { logoutUser } from "../../services/authApi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

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
    <header>
      <NavLink to="/recommended">Read Journey</NavLink>
      <nav>
        <NavLink to="/recommended">Recommended</NavLink>
        <NavLink to="/library">My Library</NavLink>
      </nav>

      <div>
        <span>{user?.name}</span>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
