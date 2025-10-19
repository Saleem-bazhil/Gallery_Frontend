import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WinterSnow from "./animation/WinterSnow";
import ProtectedRoute from "./ProtectRoute";

import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Hero from "./components/Hero";
import IamgeGallery from "./components/IamgeGallery";
import ImgUpload from "./image_upload/ImgUpload";
import FaceUploader from "./ai/FaceUploader";
import FaceDetection from "./ai/FaceDetection";
import AiInterface from "./ai/AiInterface";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <WinterSnow />
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Hero />} />
          <Route path="/image-gallery" element={<IamgeGallery />} />
          <Route path="/image-upload" element={<ImgUpload />} />
          <Route path="/ai-interface" element={<AiInterface />} />
          <Route path="/file-uploader" element={<FaceUploader />} />
          <Route path="/detect-face" element={<FaceDetection />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/"} />}
        />
      </Routes>

      <Footer />
      </>
  );
}

export default App;
