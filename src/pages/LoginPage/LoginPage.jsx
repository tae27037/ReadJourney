import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <main>
      <h1>Log in</h1>
      <LoginForm />

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default LoginPage;
