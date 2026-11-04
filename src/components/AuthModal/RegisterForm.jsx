import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../services/authApi";
import { setCredentials } from "../../redux/auth/authSlice";
import styles from "./RegisterForm.module.css";

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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const values = watch();

  // Проверки валидности для стилей и иконок галочек (Correct state)
  const isNameValid =
    touchedFields.name && !errors.name && values.name?.trim().length > 0;
  const isEmailValid =
    touchedFields.email && !errors.email && values.email?.trim().length > 0;
  const isPasswordValid =
    touchedFields.password && !errors.password && values.password?.length >= 7;

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
      console.error("Registration error:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* 🟢 Name Field */}
      <div className={styles.inputGroup}>
        <label
          className={`${styles.label} ${
            errors.name ? styles.invalid : isNameValid ? styles.valid : ""
          }`}
        >
          <span className={styles.labelText}>Name:</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Your name"
            {...register("name")}
          />
          {isNameValid && (
            <svg
              className={styles.validIcon}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-check" />
            </svg>
          )}
        </label>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      {/* 🟢 Mail Field */}
      <div className={styles.inputGroup}>
        <label
          className={`${styles.label} ${
            errors.email ? styles.invalid : isEmailValid ? styles.valid : ""
          }`}
        >
          <span className={styles.labelText}>Mail:</span>
          <input
            className={styles.input}
            type="email"
            placeholder="Your@email.com"
            {...register("email")}
          />
          {isEmailValid && (
            <svg
              className={styles.validIcon}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-check" />
            </svg>
          )}
        </label>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      {/* 🟢 Password Field */}
      <div className={styles.inputGroup}>
        <label
          className={`${styles.label} ${
            errors.password
              ? styles.invalid
              : isPasswordValid
                ? styles.valid
                : ""
          }`}
        >
          <span className={styles.labelText}>Password:</span>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Yourpasswordhere"
            {...register("password")}
          />

          {isPasswordValid ? (
            <svg
              className={styles.validIcon}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-check" />
            </svg>
          ) : (
            <button
              className={styles.eyeButton}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg className={styles.eyeIcon} aria-hidden="true">
                <use
                  href={`/sprite.svg#icon-${showPassword ? "eye-off" : "eye"}`}
                />
              </svg>
            </button>
          )}
        </label>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
        {!errors.password && isPasswordValid && (
          <p className={styles.successMessage}>Password is secure</p>
        )}
      </div>

      {/* 🟢 Actions */}
      <div className={styles.actions}>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registration..." : "Registration"}
        </button>

        <Link className={styles.link} to="/login">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
