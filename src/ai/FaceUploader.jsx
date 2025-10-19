import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import api from "../api.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
});

const FaceUploader = () => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  // Upload single Base64 image to backend
  const uploadImageToServer = async (username, base64Image) => {
    try {
      const response = await api.post("/ai/faces/upload_face/", {
        username,
        image: base64Image,
      });
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error.response || error.message);
      return null;
    }
  };

  // Recursive function to capture & upload multiple frames
  const captureAutomatically = async (username, total = 50, count = 0) => {
    if (count >= total) {
      setIsCapturing(false);
      setMessage(` Captured and uploaded ${total} faces for ${username}`);
      setProgress(100);
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const result = await uploadImageToServer(username, imageSrc);
      if (result) {
        setProgress(Math.round(((count + 1) / total) * 100));
      } else {
        console.warn(`Skipped frame ${count + 1} due to upload failure.`);
      }
    } else {
      console.warn(`Skipped frame ${count + 1} because no image captured.`);
    }

    setTimeout(() => captureAutomatically(username, total, count + 1), 500);
  };

  return (
    <section className="bg-background mt-8 min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center justify-center p-8 rounded-xl gap-4 bg-card ">
      <h1 className="text-2xl font-bold gradient-text mb-4">AI Face Uploader</h1>

      <Formik
        initialValues={{ username: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setMessage("");
          setProgress(0);
          setIsCapturing(true);
          captureAutomatically(values.username);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="flex flex-col items-center gap-4 w-80">
            {/* Username Input */}
            <div className="flex flex-col w-full">
              <Field
                type="text"
                name="username"
                placeholder="Enter username"
                className="input-box px-4 py-2 mb-2 rounded w-full"
                disabled={isCapturing}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm ms-1 mt-2"
              />
            </div>

            {/* Webcam Display */}
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              height={300}
              className="rounded-lg shadow mb-2"
            />

            {/* Capture Button */}
            <button
              type="submit"
              disabled={!isValid || isCapturing || isSubmitting}
              className={`px-4 py-2 rounded indigo-btn w-full ${
                isCapturing
                  ? "bg-btn cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isCapturing ? "Capturing..." : "Start Capture"}
            </button>

            {/* Progress Bar */}
            {isCapturing && (
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Status Message */}
            {message && (
              <p
                className={`mt-3 font-semibold ${
                  message.includes? "text-primary" : "text-blue-600"
                }`}
              >
                {message}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
    </section>
  );
};

export default FaceUploader;
