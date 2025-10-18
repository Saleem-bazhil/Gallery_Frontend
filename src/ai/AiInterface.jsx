import React from "react";
import { Link } from "react-router-dom";
const AiInterface = () => {
  return (
    <section className="min-h-screen  ">
      <div className="container mx-auto  min-h-screen flex flex-col items-center justify-center md:p-31 p-12 border border-border">
        <h4 className="text-sm md:text-xl md:max-w-2xl text-center text-muted-foreground font-Agbalumo tracking-widest">Detect and recognize faces instantly using your camera or uploaded images. Our AI works seamlessly in real time for accurate identification.</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 flex ">
          <Link to={"/file-uploader"} className="indigo-btn tagesschrift-regular">
            Upload Dataset
          </Link>
          <Link to={"/detect-face"} className="indigo-btn tagesschrift-regular">
            Detect Face
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AiInterface;
