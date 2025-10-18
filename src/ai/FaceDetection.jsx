import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import api from "../api.jsx";

const RealTimeFaceRecognition = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detectFaces = async () => {
    if (!webcamRef.current) return;

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) return;

    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const res = await api.post("/ai/recognize_face/", { image: imageSrc });

      if (res.data.faces_info) {
        res.data.faces_info.forEach(face => {
          ctx.strokeStyle = "green";
          ctx.lineWidth = 2;
          ctx.strokeRect(face.x, face.y, face.w, face.h);
          ctx.fillStyle = "green";
          ctx.font = "18px Arial";
          ctx.fillText(face.username, face.x, face.y - 5);
        });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(detectFaces, 300); // faster detection
    return () => clearInterval(interval);
  }, []);

  return (
<section className="min-h-screen flex items-center justify-center">
  <div className="relative w-[350px] lg:w-[640px] mx-auto">
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={640}
      height={480}
      videoConstraints={{ facingMode: "user" }}
      className="rounded-xl overflow-hidden "
    />
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none"
    />
  </div>
</section>

  );
};

export default RealTimeFaceRecognition;
