import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authApi";
import { setCredentials } from "../../redux/auth/authSlice";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const schema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .matches(emailPattern, "Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(7, "Password must contain at least 7 characters")
    .required("Password is required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      dispatch(
        setCredentials({
          token: response.token,
          refreshToken: response.refreshToken,
          user: {
            name: response.name,
            email: response.email,
          },
        }),
      );

      navigate("/recommended");
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label>
        Email
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </label>

      <label>
        Password
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registration..." : "Registration"}
      </button>
    </form>
  );
};

export default RegisterForm;
