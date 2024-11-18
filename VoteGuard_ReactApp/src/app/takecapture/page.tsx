"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";

const TakePicture = () => {
  const router = useRouter();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    saveImage(imageSrc); // Save the image
  };

  // Function to save the image as a file
  const saveImage = (dataURL) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "captured_image.jpg"; // Specify the name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    router.push("/electionpage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-8 lg:p-16">
      <h1 className="text-3xl font-bold mb-6">Take a Picture</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full max-w-md rounded-lg shadow-lg mb-6"
      />
      <button
        onClick={capture}
        className="bg-blue-800 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition-all duration-200 mb-6"
      >
        Capture Photo
      </button>
      
      {capturedImage && (
        <div className="flex flex-col items-center w-full max-w-3xl">
          <h2 className="text-xl font-bold mb-4">Captured Image:</h2>
          <img src={capturedImage} alt="Captured" className="w-full max-w-md rounded-lg shadow-lg mb-6" />
          <button
            onClick={handleSubmit}
            className="text-xl bg-blue-800 text-white py-2 px-4 rounded font-semibold hover:bg-blue-500 transition-all duration-300 mb-6"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default TakePicture;
