// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import PrivateRoute from "./routes/PrivateRoute";
// import MainLayout from "./layouts/MainLayout/MainLayout";

// import RegisterPage from "./pages/RegisterPage/RegisterPage";
// import LoginPage from "./pages/RegisterPage/LoginPage";
// import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
// import LibraryPage from "./pages/LibraryPage/LibraryPage";
// import ReadingPage from "./pages/ReadingPage/ReadingPage";
// import WelcomePage from "./pages/WelcomePage/WelcomePage";

// import { refreshUser } from "./redux/auth/authSlice";

// const App = () => {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector((state) => state.auth.isRefreshing);

//   useEffect(() => {
//     dispatch(refreshUser());
//   }, [dispatch]);

//   if (isRefreshing) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <Routes>
//       <Route path="/" element={<WelcomePage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/login" element={<LoginPage />} />

//       <Route
//         element={
//           <PrivateRoute>
//             <MainLayout />
//           </PrivateRoute>
//         }
//       >
//         <Route path="/recommended" element={<RecommendedPage />} />
//         <Route path="/library" element={<LibraryPage />} />
//         <Route path="/reading/:bookId" element={<ReadingPage />} />
//       </Route>
//     </Routes>
//   );
// };

// export default App;

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/RegisterPage/LoginPage";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ReadingPage from "./pages/ReadingPage/ReadingPage";

import { refreshUser } from "./redux/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/recommended" replace />
          ) : (
            <Navigate to="/register" replace />
          )
        }
      />

      <Route path="/welcome" element={<Navigate to="/register" replace />} />

      <Route
        path="/register"
        element={
          isLoggedIn ? <Navigate to="/recommended" replace /> : <RegisterPage />
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/recommended" replace /> : <LoginPage />
        }
      />

      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading/:bookId" element={<ReadingPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
