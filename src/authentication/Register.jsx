import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setMessage(""); 
    try {
      // Register user
      await api.post("/authentication/register/", values);
      setMessage("User registered successfully!");
      alert("User Registered Successfully");

      // Redirect to login page
      resetForm();
      navigate("/"); 
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
      alert(err.response?.data?.error || "Username and Password may already be registered");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 lg:p-0">
      <div className="bg-card border border-border p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-Agbalumo tracking-widest font-semibold mb-8 text-center gradient-text">
          Sign Up
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

            <button
              type="submit"
              className="w-full mb-1 flex items-center justify-center px-6 py-2 rounded-xl text-lg font-medium text-background bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity gap-2 transition"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
