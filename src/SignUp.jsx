import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./store";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ get registered users from redux
  const registeredUsers = useSelector((state) => state.users.registeredUsers);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const email = watch("email"); // 👈 track entered email

  // ✅ check if this email already exists
  const isExistingUser = registeredUsers.some((u) => u.email === email);

  const onSubmit = (data) => {
    if (isExistingUser) {
      toast.error("⚠️ Account already exists. Please login!");
      return;
    }

    dispatch(registerUser({ name: data.name, email: data.email, password: data.password }));
    toast.success("Signup successful! 🎉");
    reset();

    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Account</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Your full name"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
          placeholder="you@example.com"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        {isExistingUser && <p className="error">⚠️ This email is already registered.</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          placeholder="Choose a strong password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          placeholder="Re-enter your password"
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

        {/* ✅ Disable Sign Up if user already exists */}
        <button
          type="submit"
          className="signup-button"
          disabled={isExistingUser}
        >
          Sign Up
        </button>

        <div className="login-redirect">
          <p>Already have an account?</p>
          <button
            type="button"
            className="login-button"
            onClick={() => navigate("/login")}
          >
            {isExistingUser ? "Login Now" : "Login"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default SignUp;
