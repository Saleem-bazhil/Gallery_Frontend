import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api.jsx";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Redirect already logged-in users
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await api.post("/authentication/login/", values, {
        withCredentials: true,
      });
      setMessage(res.data.message || "Logged in successfully!");

      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      alert(`Welcome, ${res.data.username}`);
      resetForm();
      navigate("/home");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed";
      setMessage(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 lg:p-0">
      <div className="bg-card border border-border p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-Agbalumo tracking-widest font-semibold mb-8 text-center gradient-text">
          Login
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="input-box mb-2"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm ms-1 mt-2"
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input-box mb-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm ms-1 mt-2"
              />
            </div>
            <div className="flex md:gap-6 gap-4">
              <button
                type="submit"
                className="w-full mb-1 flex items-center justify-center px-6 py-2 rounded-xl text-lg font-medium text-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity gap-2"
              >
                Login
              </button>
              <Link
                to="/register"
                className="w-full mb-1 flex items-center justify-center px-6 py-2 rounded-xl text-lg font-medium text-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity gap-2"
              >
                Signup
              </Link>
            </div>
          </Form>
        </Formik>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
